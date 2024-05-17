
import os
import re
import json
from copy import deepcopy


def is_lower_div(course: str) -> bool:
    """
    Determine if a given course is a lower division based on its course number.

    Parameters
    ---
    course: str
        The course identifier string, which includes the course number.

    Returns
    ---
    bool
        True if the course number is less than 300, indicating it is a lower
        division course; otherwise, False.
    """
    match = re.search(r'\d+', course)
    if match:
        course_number = int(match.group())
        return course_number < 300


def load_json(filepath):
    """
    Load a JSON file from a specified filepath.

    Parameters
    ---
    filepath: str
        The path to the file to be loaded.

    Returns
    ---
    dict or list
        The JSON object loaded from the file.
    """
    with open(filepath, 'r') as file:
        return json.load(file)


def save_json(data, filepath):
    """
    Save a dictionary as a JSON file to a specified filepath.

    Parameters
    ---
    data: dict or list
        The data to be saved as JSON.
    filepath : str
        The file path where the JSON file will be saved.

    Returns
    ---
    None
    """
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)


def join_path(path_segments: list) -> str:
    """
    Construct a full file path by concatenating path segments
    and deliniating them by a '/'.

    Parameters
    ---
    path_segments: list
        A list of strings to be joined.

    Returns
    ---
    str
        The concatenated file path.
    """
    return '/'.join(path_segments)


def construct_path(file_name: str, dir_levels_up: int = 0) -> str:
    """
    Join the current directory path with a desired file name,
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


def match_course(course: str, agreements: dict) -> dict:
    # print(agreement["receiving"])
    for agreement in agreements["agreements"]:
        if [course] == [x["courseNumber"]for x in
                        agreement["receiving"]["courses"]]:
            return agreement["sending"]


def find(courses: list, agreements: dict) -> dict:
    """
    Finds the equivalent course(s) between institutions.

    Parameters
    ---
    courses: list
        A list of courses as dictionaries to be matched,
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
    # print(courses)
    course_names = [x["course"] for x in courses]
    # Get course subject and uniqueClass fields
    # to be added to the dictionary later
    # dd = [{key: val for key, val in x.items() if key != "course"} for x in courses]

    dd = {}
    subjects = list({x["subject"] for x in courses})
    subjects = subjects[0] if len(subjects) == 1 else subjects
    dd["subject"] = subjects
    dd["uniqueClass"] = any([x["uniqueClass"] for x in courses])
    # if "customDesc" in courses.keys():
    #     dd["customDesc"] = courses["customDesc"]
    for agreement in agreements["agreements"]:
        # Ignore OR relationships on the receiving side
        if agreement["receiving"]["conjunction"] in [None, "AND"]:
            # Find a match on receiving regardless of course ordering
            if set(course_names) == set([x["courseNumber"]for x in
                                         agreement["receiving"]["courses"]]):
                # course_equivalencies = deepcopy(agreement["sending"])
                # Add in the subject and uniqueClass fields
                # agreement["sending"]["subject"] = course_subjects
                # agreement["sending"]["uniqueClass"] = course_uniques
                # course_equivalencies = 
                # print(agreement["sending"])
                return {**agreement["sending"], **dd}
