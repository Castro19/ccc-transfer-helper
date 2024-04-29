
course = {'Receiving': {'Courses': [{'Course Number': 'CHEM 110', 'Course Title': 'World of Chemistry', 'Units': '4.00'}], 'Conjunctions': []}, 'Sending': {'Courses': [{'Course Number': 'CHEM 2A', 'Course Title': 'General Chemistry I', 'Units': '3.00'}, {'Course Number': 'CHEM 2AL', 'Course Title': 'General Chemistry I Laboratory', 'Units': '2.00'}, {'Course Number': 'CHEM 14', 'Course Title': 'Fundamental Chemistry for Allied Health', 'Units': '3.00'}, {'Course Number': 'CHEM 14L', 'Course Title': 'Fundamental Chemistry for Allied Health Laboratory', 'Units': '1.00'}], 'Conjunctions': ['And', 'Or', 'And']}}


sending = course["Sending"]

print(sending)

courses = sending["Courses"]
print(courses)
conj = sending["Conjunctions"]
# print(conj)

# for i, c in enumerate(courses):
#     print(c["Course Number"].replace(" ", ""))
#     print(conj[i])

a = [course["Course Number"].replace(" ", "") for course in courses]

print(a)

# print(conj)
for i, ele in enumerate(conj):
    a.insert(len(conj) - i, ele)

print(" ".join(a))
    
# print(a)


# for val in course.values():
#     print(val)
