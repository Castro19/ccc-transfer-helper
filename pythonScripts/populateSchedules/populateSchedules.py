
import json
import os
from copy import deepcopy

from combinator import combinate

MAJOR_FILE_NAME = "computer_science_bs.json"
AGREEMENT_PATH = "json_files/calpolyAgreements/"


def join_path(file_name: str, dir_levels_up: int = 0) -> str:
    """
    Join current directory path with a desired file name,
    returning full path as a string.

    Full path will be found regardless of os being used.

    Parameters
    ---
    file_name: str
        The desired file name, including subdirectories if desired.
    dir_levels_up: int
        The desired number of directory levels to go up
        from the current directory level.
        Defaulted to 0.

    Returns
    ---
    str
        The full directory path including the given file name.
    """
    dir_path_list = os.path.dirname(os.path.abspath(__file__)).split('/')
    desired_dir = '/'.join(dir_path_list[:len(dir_path_list) - dir_levels_up])
    return os.path.join(desired_dir, file_name)


def find(courses: list, agreements: dict) -> dict:
    """
    Finds the equivalent course(s) between institutions.

    Parameters
    ---
    courses: list
        A list of courses as strings to be matched,
        potentially as an entire group.
        The course list corresponds to the receiving institution,
        e.g. Cal Poly.

    agreements: dict
        An articulation agreement as a dictionary.
        Expected to be in the exact format as outputted from WebScrape-Assit.

    Returns
    ---
    dict
        The equivalent courses from the sending institution, e.g., a CCC,
        or None if there is no match found.
    """
    for agreement in agreements["agreements"]:
        # Ignore OR relationships on the receiving side
        if agreement["receiving"]["conjunction"] in [None, "AND"]:
            # Find a match on receiving regardless of course ordering
            if set(courses) == set([x["courseNumber"]for x in
                                    agreement["receiving"]["courses"]]):
                return agreement["sending"]


with open(join_path(MAJOR_FILE_NAME), 'r') as file:
    schedule_template = json.load(file)

# Iterate through the list of all community college agreement files
for agreement_file in os.listdir(join_path(AGREEMENT_PATH, 1)):

    # Open each agreement
    with open(join_path(f"{AGREEMENT_PATH}{agreement_file}", 1), 'r') as file:
        agreement = json.load(file)

    ccc_schedule = deepcopy(schedule_template)
    # Swap matched courses into the ccc_schedule
    for i, term in enumerate(schedule_template["termData"]):
        courses = [x["id"] for x in term["courses"] if x["id"] is not None]
        custom_courses = [x for x in term["courses"] if x["id"] is None]
        if courses:
            swapped_courses = combinate(courses, len(courses), [],
                                        lambda x: find(x, agreement))
            swapped_courses = swapped_courses + custom_courses
            ccc_schedule["termData"][i]["courses"] = swapped_courses

        # Save the schedule for each community college for the given major
        file_path = join_path(f"json_files/calpolySchedules/COMPUTER_SCIENCE/{file.name.split('/')[-1]}", 1)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w') as file:
            json.dump(ccc_schedule, file, indent=4)

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
