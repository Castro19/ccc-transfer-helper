import json
import os
from util import construct_path

def count_units(data):

    def calculate_max_units(course_data):
        courses = course_data.get('courses', [])
        # print(courses)
        con = course_data.get('conjunction')
        if courses is None:
            return 0.0
        if con == "OR":
            return max(
                (float(course.get('courseUnits', 0)) for course in courses if course is not None),
                default=0.0
            )
        else:
            return sum(
                (float(course.get('courseUnits', 0)) for course in courses if course is not None)
            )

    term_units = {}

    for term, term_data in data.items():
        total_units = 0.0

        for course_data in term_data.get('courses', []):
            # print(course_data)

            if course_data is None:
                continue

            sub = course_data.get("subject")
            note = course_data.get('note')

            sub = str(sub) if sub else ""
            note = str(note) if note else ""

            # print(note)
            # print(sub)

            # if "GE" in sub or "Choose One" in sub or "Free Elective" in sub:
            if "GE" in sub or "Choose One" in sub:
                total_units += 4.0

            if 'elective' in sub.lower():
                total_units += 4.0

            if 'no articulation' in note.lower():
                total_units += 4.0

            # if 'support elective' in sub.lower():
            #     total_units += 4.0
            
            # if 'process elective' in sub.lower():
            #     total_units += 4.0 

            elif 'course' in course_data:
                max_units = 0.0
                nested_courses = course_data.get('course', [])

                if nested_courses is None:
                    nested_courses = []

                for nested_course in nested_courses:

                    if nested_course is None:
                        nested_course = {}

                    max_units = max(max_units, calculate_max_units(nested_course))
                
                total_units += max_units

            else:
                total_units += calculate_max_units(course_data)
            
            term_units[term] = total_units

    return term_units


def main():
    directory = '.'
    filename = construct_path('TEST_MECHANICAL_ENGINEERING.json')

    file_path = os.path.join(directory, filename)
    print(filename)

    try:
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                data = json.load(file)
                units_by_term = count_units(data)
                for term, units in units_by_term.items():
                    print(f"Term {term} = {units:.2f}")
        else:
            print(f"The file {file_path} does not exist.")
    except FileNotFoundError:
        print("The file was not found")
    except json.JSONDecodeError:
        print("The file is not a valid JSON")
    except KeyError as e:
        print(f"Key {e} not found in JSON data")
    except TypeError as e:
        print(f"Type error: {e}")
    except ValueError as e:
        print(f"Value error: {e}")

if __name__ == "__main__":
    main()
