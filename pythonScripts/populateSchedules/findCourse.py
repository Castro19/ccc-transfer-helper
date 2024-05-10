


import json
import os

# from combinator findOneCombination

FILE_NAME = "compute_science_bs.json"


def join_path(file_name: str) -> str:
    """
    Join current directory path with a desired file name, returning full path as a string.
    Full path will be found regardless of os being used.
    """
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), file_name)


with open(join_path(FILE_NAME), 'r') as file:
    schedule = json.load(file)

print(schedule)

a = [
        {
            "id": "CSC101",
            "color": "#FEFD9A"
        },
        {
            "id": "MATH142",
            "color": "#FCD09E"
        },
        {
            "id": "ENGL134",
            "color": "#DCFDD2"
        }
]


for agreement_file in os.listdir(join_path("calpolyMappings")):
    with open(join_path(f"calpolyMappings/{agreement_file}"), 'r') as file:
        agreement = json.load(file)
    # print(agreement)

def find(courses: list) -> dict:
    """
    coures: list of courses as strings to be matched
    """
    for thing in agreement["agreements"]:
        if thing["receiving"]["conjunction"] in [None, "AND"]:
            if set(courses) == set([x["courseNumber"] for x in thing["receiving"]["courses"]]):
                return thing["sending"]


if __name__ == "__main__":
    a = ["ENGL251", "ENGL252", "ENGL253"]
    print(find(a))