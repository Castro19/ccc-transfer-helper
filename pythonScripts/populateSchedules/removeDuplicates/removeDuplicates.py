import json
from copy import deepcopy

def removeDuplicates(dct : dict):

    exists = set()
    or_exists = set()

    for term in dct.values():

        cpy = deepcopy(term["courses"])
        for course_object in term["courses"]:
            #print(course_object)
            if "courses" in  course_object.keys():
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

dct = {
    "0": {
        "courses": []
    },
    "1": {
        "courses": [
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "CISP360",
                        "courseTitle": "Introduction to Structured Programming",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "MATH400",
                        "courseTitle": "Calculus I",
                        "courseUnits": "5.00"
                    }
                ],
                "subject": "MATH",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "COMM301",
                        "courseTitle": "Introduction to Public Speaking",
                        "courseUnits": "3.00"
                    }
                ],
                "subject": "COMS",
                "uniqueClass": False
            },
            {
                "subject": "GE",
                "course": None,
                "uniqueClass": False,
                "customDesc": "One course from each of the following GE areas must be completed: A1, A2, A3, C1, Lower-Division C Elective, Upper-Division C, D1, Area D Elective, Lower-Division E, and Lower-Division F. Upper-Division C should be taken only after Junior standing is reached (90 units). Refer to online catalog for GE course selection, Unites States Cultural Pluralism (USCP) and Graduation Writing Requirement (GWR). USCP requirement can be satisfied by some (but not all) courses within GE categories: C1, Upper-Division C, D1, D2, Upper-Division D, or E."
            }
        ]
    },
    "2": {
        "courses": [
            {
                "conjunction": "OR",
                "courses": [
                    {
                        "courseNumber": "CISP360",
                        "courseTitle": "Introduction to Structured Programming",
                        "courseUnits": "4.00"
                    },
                    {
                        "courseNumber": "CISP400",
                        "courseTitle": "Object Oriented Programming with C++",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "MATH401",
                        "courseTitle": "Calculus II",
                        "courseUnits": "5.00"
                    }
                ],
                "subject": "MATH",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "ENGWR300",
                        "courseTitle": "College Composition",
                        "courseUnits": "3.00"
                    }
                ],
                "subject": "ENGL",
                "uniqueClass": False
            },
            {
                "subject": "GE",
                "course": None,
                "uniqueClass": False,
                "customDesc": "One course from each of the following GE areas must be completed: A1, A2, A3, C1, Lower-Division C Elective, Upper-Division C, D1, Area D Elective, Lower-Division E, and Lower-Division F. Upper-Division C should be taken only after Junior standing is reached (90 units). Refer to online catalog for GE course selection, Unites States Cultural Pluralism (USCP) and Graduation Writing Requirement (GWR). USCP requirement can be satisfied by some (but not all) courses within GE categories: C1, Upper-Division C, D1, D2, Upper-Division D, or E."
            }
        ]
    },
    "3": {
        "courses": [
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "CISP430",
                        "courseTitle": "Data Structures",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "MATH401",
                        "courseTitle": "Calculus II",
                        "courseUnits": "5.00"
                    }
                ],
                "subject": "MATH",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "COMM311",
                        "courseTitle": "Argumentation and Debate",
                        "courseUnits": "3.00"
                    }
                ],
                "subject": "COMS",
                "uniqueClass": True
            },
            {
                "subject": "Life Science Support Elective",
                "course": None,
                "uniqueClass": True,
                "customDesc": "Any Life Science Support Elective course can go here.\r\n\r\nCannot double count units.\r\n\r\nSelect 4 units from the following \"Life Science\" Support Electives: BIO111, BIO161, BIO213 & BMED213; BOT121; MCRO221.\r\n\r\nNo double-counting is allowed between Additional Science Support Elective and Life Science SUpport Elective or Physical Science Support Elective."
            }
        ]
    },
    "5": {
        "courses": [
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "CISP400",
                        "courseTitle": "Object Oriented Programming with C++",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "PHYS410",
                        "courseTitle": "Mechanics of Solids and Fluids",
                        "courseUnits": "5.00"
                    }
                ],
                "subject": "PHYS",
                "uniqueClass": True
            },
            {
                "subject": "Linear Math",
                "course": [
                    "MATH206",
                    "MATH244"
                ],
                "uniqueClass": True,
                "customDesc": "Choose one of the following: MATH206, or MATH244."
            },
            {
                "subject": "Additional Science Support Elective",
                "course": None,
                "uniqueClass": True,
                "customDesc": "Any Life Science Support Elective course can go here.\r\n\r\nCannot double count units.\r\n\r\nSelect 4 units from the following \"Additional Science\" Support Electives; BIO111, BIO161; BOT121; CHEM124; MCRO221; PHYS141.\r\n\r\nNo double-counting is allowed between Additional Science Support Elective and Life Science SUpport Elective or Physical Science Support Elective."
            }
        ]
    },
    "6": {
        "courses": [
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "CISP440",
                        "courseTitle": "Discrete Structures for Computer Science",
                        "courseUnits": "3.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "CISP310",
                        "courseTitle": "Assembly Language Programming for Microcomputers",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "CSC",
                "uniqueClass": False
            },
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "PHYS431",
                        "courseTitle": "Heat, Waves, Light and Modern Physics",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "PHYS",
                "uniqueClass": False
            }
        ]
    },
    "7": {
        "courses": [
            {
                "conjunction": None,
                "courses": [
                    {
                        "courseNumber": "PHYS421",
                        "courseTitle": "Electricity and Magnetism",
                        "courseUnits": "4.00"
                    }
                ],
                "subject": "PHYS",
                "uniqueClass": False
            },
            {
                "subject": "Philosophical Classics",
                "course": [
                    "PHIL230",
                    "PHIL231"
                ],
                "uniqueClass": True,
                "customDesc": "Choose one of the following: PHIL230, or PHIL231."
            }
        ]
    }
}

print(json.dumps(removeDuplicates(dct),indent=4))