"""
"""

import json
from copy import deepcopy
from util import join_path, construct_path, load_json, save_json


SCHEDULE_PATH = construct_path("server/json_data/ccc_schedules", 2)
# OUTPUT_PATH = construct_path()


def removeDuplicates(dct: dict) -> dict:

    exists = set()
    or_exists = set()

    for term in dct.values():

        cpy = deepcopy(term["courses"])
        for course_object in term["courses"]:
            # print(course_object)
            if "courses" in course_object.keys():
                existing = True
                inner_cpy = deepcopy(course_object["courses"])
                for course in course_object["courses"]:
                    if course_object["conjunction"] == "OR":
                        name = course["courseNumber"]
                        if name in exists:
                            break
                        elif not or_exists.add(name):
                            existing = False
                        if existing:
                            cpy.remove(course_object)

                    else:
                        if exists.add(course["courseNumber"]):
                            inner_cpy.remove(course)
                course_object["courses"] = inner_cpy
        term["courses"] = cpy

    return dct


def select_course(courses: dict) -> dict:
    print(courses)
    print()
    if "courseNumber" in courses.keys():
        return courses
    elif courses["conjunction"] is None:
        print("None")
        return courses["courses"]
    elif courses["conjunction"] == "AND":
        print("AND")
        return courses["courses"]
    elif courses["conjunction"] == "OR":
        print("OR")
        for course in courses["courses"]:
            return select_course(course)

def select_course(courses: dict) -> dict:
    print(courses)
    if "courseNumber" in courses:
        # Base case: return the course itself with units converted to float for comparison
        return {
            "courseNumber": courses["courseNumber"],
            "courseTitle": courses["courseTitle"],
            "courseUnits": float(courses["courseUnits"])
        }
    elif "conjunction" in courses:
        if courses["conjunction"] == "AND":
            # Combine courses by summing units
            combined_course = {}
            total_units = 0
            for course in courses["courses"]:
                selected_course = select_course(course)
                if not combined_course:
                    combined_course = selected_course
                else:
                    combined_course["courseTitle"] += " and " + selected_course["courseTitle"]
                    total_units += selected_course["courseUnits"]
            combined_course["courseUnits"] = total_units
            return combined_course
        elif courses["conjunction"] in ["OR", None]:
            # Select the course with the minimum units
            min_course = None
            for course in courses["courses"]:
                selected_course = select_course(course)
                if not min_course or selected_course["courseUnits"] < min_course["courseUnits"]:
                    min_course = selected_course
            return min_course


def count_units(data):
    term_units = {}

    for term, term_data in data.items():
        # print(data)
        # print(term_data)
        # print(term)
        total_units = 0.0

        for course_data in term_data.get('courses', []):
            # print(course_data)
            con = course_data.get('conjunction')
            # print(con)

            sub = course_data.get('subject')
            # if(course_data.get('subject') == 'GE' or course_data.get('subject') == 'Choose One' or course.info.get('subject') == 'Free Elective'):
            if sub == 'GE' or sub == 'Choose One' or sub == 'Free Elective':
                # total_units = float(total_units) + float(4)
                total_units += 4.0

            if con == "OR":
            # print(course_info.get('courses', []))
                max_units = max(
                (float(course.get('courseUnits', 0)) for course in course_data.get('courses', [])), default=0.0)

                total_units += max_units

            else:
            # print(course_info)
                for course in course_data.get('courses', []):
                    # print(course)
                    if course is not None:
                        # if 'courseUnits' in course:
                            # print(str(course['courseNumber']) + " " + str(course['courseUnits']) )
                            total_units = float(total_units) +  float(course.get('courseUnits'))
                            # print(course.get('courseUnits'))

            term_units[term] = total_units

    return term_units

if __name__ == "__main__":

    courses = {
        "conjunction": "OR",
        "courses": [
            {
                "conjunction": "OR",
                "courses": [
                    {
                        "courseNumber": "MATH107",
                        "courseTitle": "Linear Algebra",
                        "courseUnits": "5.00"
                    },
                    {
                        "courseNumber": "MATH107H",
                        "courseTitle": "Honors Linear Algebra",
                        "courseUnits": "5.00"
                    }
                ]
            },
            {
                "conjunction": "OR",
                "courses": [
                    {
                        "conjunction": "AND",
                        "courses": [
                            {
                                "courseNumber": "MATH108",
                                "courseTitle": "Ordinary Differential Equations",
                                "courseUnits": "5.00"
                            },
                            {
                                "courseNumber": "MATH107",
                                "courseTitle": "Linear Algebra",
                                "courseUnits": "5.00"
                            }
                        ]
                    },
                    {
                        "conjunction": "AND",
                        "courses": [
                            {
                                "courseNumber": "MATH108H",
                                "courseTitle": "Honors Ordinary Differential Equations",
                                "courseUnits": "5.00"
                            },
                            {
                                "courseNumber": "MATH107H",
                                "courseTitle": "Honors Linear Algebra",
                                "courseUnits": "5.00"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    print(select_course(courses))

    # print(courses)

    inputs = load_json(join_path([SCHEDULE_PATH, "GLENDALE/COMPUTER_SCIENCE.json"]))
    # print(inputs)

    print(count_units(inputs))

    # outputs = removeDuplicates(inputs)
    # save_json(outputs, construct_path("test.json"))

    # print(json.dumps(removeDuplicates(dct), indent=4))
