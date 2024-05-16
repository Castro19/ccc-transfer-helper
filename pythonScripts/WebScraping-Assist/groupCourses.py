"""
This module is intended to be used with webScraper to group course agreements
between institutions.

It includes definitions for handling groups of courses, determining their
equivalence or relationships, and processing these relationships based on
conjunctions such as 'AND' or 'OR'. The main classes and functions are
used to organize and serialize course data into structured formats suitable
for JSON serialization.

Classes:
    Group - Represents a group of courses and their relational logic for
    course equivalency.

Functions:
    map_course_groupings - Processes course agreement mappings and returns
    structured groupings based on conjunctions.
"""


class Group:
    """
    Represents a group of courses as well as their relationship in the context
    of course equivalents with respect to another institution.
    """
    def __init__(self, grouping: list, conjunction: str = None) -> None:
        self.grouping = list(grouping[:])
        self.conjunction = conjunction

    # For a readable print
    def __repr__(self) -> str:
        repr_grouping = ', '.join(self.repr_item(item)
                                  for item in self.grouping)
        return f"{self.conjunction} [{repr_grouping}]"

    # Helper function for __repr__
    @staticmethod
    def repr_item(item) -> str:
        # Recurse if item is a Group type
        if isinstance(item, Group):
            return repr(item)
        else:
            return str(item["courseNumber"])

    def add(self, course: dict) -> None:
        """
        Add a given course to a grouping if it is not already present.

        Parameters
        ---
        course: dict
            The course dictionary to be added.
        """
        if not self.has_course(course):
            self.grouping.append(course)

    def remove(self, course) -> None:
        """
        Remove a course from the group.

        Parameters
        ---
        course: dict
            The course dictionary to be removed.
        """
        self.grouping.remove(course)

    def has_course(self, course, deep_search: bool = False) -> bool:
        """
        Check if a course is already in the grouping.

        Helper function to add()

        Parameters
        ---
        course: dict
            The course dictionary to check.
        deep_search: bool
            Perform a deep search to check if the course is anywhere within
            the group, searching recursively if the Group grouping is a Group.
            Defaults to False.

        Returns
        ---
        bool
            True if the course is in the grouping, False otherwise.
        """
        if deep_search:
            return any(
                item["courseNumber"] == course["courseNumber"]
                if isinstance(item, dict)
                else item.has_course(course)
                for item in self.grouping
            )
        else:
            return course in self.grouping

    # Convert to a dictionary to align with desired json structure
    def make_dict(self) -> dict:
        """
        Convert the Group and its courses to a dictionary format.

        Returns
        ---
        dict
            A dictionary representing the Group with its courses and
            conjunction.
        """
        d = {
            "conjunction": self.conjunction,
            "courses": [x if isinstance(x, dict) else x.make_dict()
                        for x in self.grouping]
        }
        return d


def group_course_mappings(course_agreement: dict, verbose: bool=False) -> dict:
    """
    Parameters
    ---
    course_agreement: dict
        Course dictionary resulting from scraping -- expected to be:

        {
            "receiving": {
                "courses": [],
                "conjunctions": []
            },
            'sending': {
                "courses": [],
                "conjunctions": []
            }
        }
    verbose: bool
        Defaulted to False. Prints result of function in a readable format if
        True, e.g.:

        receiving: AND [CHEM124, CHEM125]
        sending: AND [CHEM2A, CHEM2AL, CHEM2B, CHEM2BL]

    Returns
    ---
    dict
        A dictionary of the agreement with the appropriate mapping
        and course groupings.
    """
    mapping = {}
    for key, val in course_agreement.items():
        anded_courses = []
        temp_courses = Group(val["courses"])
        group = temp_courses

        # Start by ANDing courses. Remove any courses added to an AND group
        # from temp_courses
        if "AND" in val["conjunctions"]:
            for i, conj in enumerate(val["conjunctions"]):
                if conj == "AND":
                    # The previous conjugation was also an AND,
                    # add next course to previous AND grouping
                    if i != 0 and conj == val["conjunctions"][i - 1]:
                        anded_courses[-1].add(val["courses"][i + 1])
                        temp_courses.remove(val["courses"][i + 1])
                    # Otherwise create new AND Group when courses are
                    # separated by an AND
                    else:
                        anded_courses.append(Group((val["courses"][i],
                                                    val["courses"][i + 1]),
                                                   conj))
                        temp_courses.remove(val["courses"][i])
                        temp_courses.remove(val["courses"][i + 1])
        # Conjunctions are present but there are no ANDs,
        # make group an OR grouping
        elif val["conjunctions"]:
            group.conjunction = "OR"

        if anded_courses:
            # if temp_courses is empty, and there is at least
            # one OR in conjuctions, presume ANDs should be ORed
            if not temp_courses.grouping and "OR" in val["conjunctions"]:
                group = Group(anded_courses, "OR")
            # There are leftover courses in temp_courses,
            # OR them with the ANDed courses
            elif temp_courses.grouping and "OR" in val["conjunctions"]:
                group = Group([temp_courses] + anded_courses, "OR")
            # No Ors -- only a single group of ANDed courses remain
            else:
                group = anded_courses[0]

        if verbose:
            print(f"{key}: {group}")

        mapping[key] = group.make_dict()
    return mapping


# Testing
if __name__ == "__main__":
    course_data = [
        {
            'receiving': {
                'courses':
                    [{'courseNumber': 'CHEM124', 'courseTitle': 'General Chemistry for Physical Science and Engineering I', 'courseUnits': '4.00'},
                     {'courseNumber': 'CHEM125', 'courseTitle': 'General Chemistry for Physical Science and Engineering II', 'courseUnits': '4.00'}],
                'conjunctions': ['AND']},
            'sending': {
                'courses': [{'courseNumber': 'CHEM2A', 'courseTitle': 'General Chemistry I', 'courseUnits': '3.00'},
                            {'courseNumber': 'CHEM2AL', 'courseTitle': 'General Chemistry I Laboratory', 'courseUnits': '2.00'},
                            {'courseNumber': 'CHEM2B', 'courseTitle': 'General Chemistry II', 'courseUnits': '3.00'},
                            {'courseNumber': 'CHEM2BL', 'courseTitle': 'General Chemistry II Laboratory', 'courseUnits': '2.00'}],
                'conjunctions': ['AND', 'AND', 'AND']
            }
        },
        {

            'receiving': {
                'courses': [{'courseNumber': 'CHEM 110', 'courseTitle': 'World of Chemistry', 'courseUnits': '4.00'}],
                'conjunctions': []
            },
            'sending': {
                'courses': [
                    {'courseNumber': 'CHEM 2A', 'courseTitle': 'General Chemistry I', 'courseUnits': '3.00'},
                    {'courseNumber': 'CHEM 2AL', 'courseTitle': 'General Chemistry I Laboratory', 'courseUnits': '2.00'},
                    {'courseNumber': 'CHEM 14', 'courseTitle': 'Fundamental Chemistry for Allied Health', 'courseUnits': '3.00'},
                    {'courseNumber': 'CHEM 14L', 'courseTitle': 'Fundamental Chemistry for Allied Health Laboratory', 'courseUnits': '1.00'}
                ],
                'conjunctions': ['AND', 'OR', 'AND']
            }
        },
        {
            'receiving': {
                'courses': [
                    {'courseNumber': 'BIO 150', 'courseTitle': 'Diversity and the History of Life', 'courseUnits': '4.00'},
                    {'courseNumber': 'BIO 161', 'courseTitle': 'Introduction to Cell and Molecular Biology', 'courseUnits': '4.00'}
                ],
                'conjunctions': ['AND']
            },
            'sending': {
                'courses': [
                    {'courseNumber': 'BIOL 2', 'courseTitle': 'Cell and Molecular Biology', 'courseUnits': '4.00'},
                    {'courseNumber': 'BIOL 6', 'courseTitle': 'Plant Biology and Ecology', 'courseUnits': '4.00'},
                    {'courseNumber': 'BIOL 4', 'courseTitle': 'Principles of Evolution and Zoology', 'courseUnits': '4.00'}
                ],
                'conjunctions': ['AND', 'AND']
            }
        },
        {
            'receiving': {
                'courses': [{'courseNumber': 'BIO111', 'courseTitle': 'General Biology', 'courseUnits': '4.00'}],
                'conjunctions': []
            },
            'sending': {
                'courses': [
                    {'courseNumber': 'BIOL3', 'courseTitle': 'Introduction to Life Science', 'courseUnits': '4.00'},
                    {'courseNumber': 'BIOL4', 'courseTitle': 'Introduction to Life Science', 'courseUnits': '4.00'},
                    {'courseNumber': 'BIOL10', 'courseTitle': 'Introduction to Life Science Lecture', 'courseUnits': '3.00'},
                    {'courseNumber': 'BIOL10L', 'courseTitle': 'Introduction to Life Science Lab', 'courseUnits': '1.00'}
                ],
                'conjunctions': ['OR', 'OR', 'AND']
            }
        },
        {
            'receiving': {
                'courses': [{'courseNumber': 'MU250', 'courseTitle': 'Applied Music', 'courseUnits': '1.00'}],
                'conjunctions': []
            },
            'sending': {
                'courses': [
                    {'courseNumber': 'MUSIC50', 'courseTitle': 'Private Lessons-Guitar', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC51', 'courseTitle': 'Private Lessons-Keyboard', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC52', 'courseTitle': 'Private Lessons-Woodwinds', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC53', 'courseTitle': 'Private Lessons-Brass', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC54', 'courseTitle': 'Private Lessons-Strings', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC55', 'courseTitle': 'Private Lessons-Percussion', 'courseUnits': '0.50'},
                    {'courseNumber': 'MUSIC56', 'courseTitle': 'Private Lessons-Voice', 'courseUnits': '0.50'}
                ],
                'conjunctions': ['OR', 'OR', 'OR', 'OR', 'OR', 'OR']
            }
        },
        {'receiving': {'courses': [
            {'courseNumber': 'WLC202', 'courseTitle': 'Intermediate World Language II', 'courseUnits': '4.00'}],
            'conjunctions': []},
         'sending': {'courses': [], 'conjunctions': []}}
    ]

    agreements = []
    for data in course_data:
        agreements.append(group_course_mappings(data, verbose=True))
