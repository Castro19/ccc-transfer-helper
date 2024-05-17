"""
This script processes and generates community college transfer schedules based
on agreements with Cal Poly, swapping out courses in Cal Poly's formatted major
schedules.

This script expects the needed data to be in the following directories:
server/json_data/calpolyAgreements
server/json_data/formattedShedules

Run pythonScripts/WebScraping-Assist/webScraper.py first to scrape and save
calpoly agreements if it is not already present or if an update is necessary.

formattedSchedules is generated using pythonScripts/jsonScripting/flows/modify.py

Note:
    This script is intended to work with Cal Poly schedules, if it is ever
    altered to work with other schools, determining what is and what is not a
    lower division course must be changed.
"""


import os
import re
from copy import deepcopy

from combinator import combinate
from util import (construct_path, join_path, find, match_course,
                  save_json, load_json, is_lower_div)

AGREEMENTS_PATH = construct_path("server/json_data/calpolyAgreements/", 2)
INPUT_SCHEDULES_PATH = construct_path("server/json_data/formattedSchedules", 2)
OUTPUT_SCHEDULE_PATH = construct_path("server/json_data/ccc_schedules", 2)

# For getting the major schedule suffix
SUFFIX_PATTERN = re.compile(r'(\d+[A-Z]+)\.(.*)\.json')

# Iterate over every CCC agreement
for agreement_file in os.listdir(AGREEMENTS_PATH):

    # Open each agreement
    agreement = load_json(join_path([AGREEMENTS_PATH, agreement_file]))

    # Get what will be the full directory path for each CCC
    ccc_dir_name = agreement_file.split('_')[0]
    ccc_path = join_path([OUTPUT_SCHEDULE_PATH, ccc_dir_name])
    print(f"Populating schedules for {ccc_dir_name}")

    # Iterate over every major in the directory
    for dir_name in os.listdir(INPUT_SCHEDULES_PATH):
        # Get major from directory path and strip unwanted characters.
        # to be used within schedule file name
        major = dir_name.upper().replace('-', '')
        major = major.replace('  ', '_').replace(' ', '_').replace(',', '')

        # Get the list of all the schedules for a single major
        major_schedules_list = os.listdir(join_path([INPUT_SCHEDULES_PATH,
                                                    dir_name]))

        # Iterate over every file in the major directory
        for schedule_file_name in major_schedules_list:

            # Attempt to get the suffix for the major schedule
            match = SUFFIX_PATTERN.search(schedule_file_name)
            # Modify the calpoly schedule_file_name for the CCC schedule file
            if len(major_schedules_list) > 1 and match and match.group(2):
                # Add on the suffix if it was found
                ccc_schedule_file_name = f"{major}.{match.group(2)}"
            else:
                ccc_schedule_file_name = major

            # Open the calpoly major schedule to be swapped
            calpoly_major_schedule = load_json(join_path(
                [INPUT_SCHEDULES_PATH,
                 dir_name,
                 schedule_file_name]))

            ccc_schedule = deepcopy(calpoly_major_schedule)
            # Iterate over every term in the schedule
            for key, term in calpoly_major_schedule.items():
                # Do not attempt to swap courses which are not strings
                # Upper division courses will be ommitted all together
                courses = [x for x in term["courses"]
                           if isinstance(x["course"], str)
                           and is_lower_div(x["course"])]
                # These are cases where one of many courses may be chosen
                # e.g. "Linear Math" for CS majors can take one of two courses
                list_courses = [x for x in term["courses"]
                                if isinstance(x["course"], list)]
                # Get leftover courses which will be added back before swapping
                # These are GE and free elective courses
                other_courses = [x for x in term["courses"]
                                 if x["course"] is None]

                # Swap the courses
                swapped_courses = []
                if courses:
                    swapped_courses = combinate(courses, len(courses), [],
                                                lambda x: find(x, agreement))

                if list_courses:
                    # print(list_courses)
                    for course_dict in list_courses:
                        for i, course_str in enumerate(course_dict["course"]):
                            course_dict["course"][i] = match_course(course_str, agreement)

                # Swap the courses in the schedule along with the leftovers
                swapped_courses = swapped_courses + list_courses + other_courses
                ccc_schedule[key]["courses"] = swapped_courses

                # Save the schedule for each community college for the given major
                file_path = join_path([ccc_path, f"{ccc_schedule_file_name}.json"])
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                save_json(ccc_schedule, file_path)

        # If there is not a schedule with the major name, save a copy of the
        # last schedule created, but without the suffix
        if f"{major}.json" not in os.listdir(ccc_path):
            save_json(ccc_schedule, join_path([ccc_path, f"{major}.json"]))

# Testing
if __name__ == "__main__":
    a = [
        {
            "id": "ENGL251",
            "color": "#FEFD9A"
        },
        {
            "id": "ENGL252",
            "color": "#FCD09E"
        },
        {
            "id": "ENGL253",
            "color": "#DCFDD2"
        }
    ]
    a = [x['id'] for x in a]
