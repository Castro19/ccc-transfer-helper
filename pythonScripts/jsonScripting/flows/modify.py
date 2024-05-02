import os
import json

def modify_json_files(directory):
    # Walk through all subdirectories of the given directory
    for subdir, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(subdir, filename)
            print(filepath)
            if filepath.endswith(".json"):
                modify_json_file(filepath)

def modify_json_file(filepath):
    # Open the JSON file
    with open(filepath, 'r') as file:
        data = json.load(file)

    # Creating our new structure
    new_version = {}
    
    # Modify Data here:
    for term in data['termData']:
        if term['tIndex'] == -1: # Just replaces the first index with 0 instead of -1
            new_version[str(0)] = {"courses": []}
        else:
            new_version[str(term["tIndex"])] = {"courses": []}
        for course in term["courses"]:
            if course["id"] is not None:
                course_id = course["id"]
            else:
                course_id = course["customId"]
            # Trying to get units here: If we aren't given any, then we default to 4. <---- fix somehow?               
            course_units = course.get("customUnits", "4.00")
            # Determining the subject
            subject = ""
            for c in course_id:
                if c.isalpha():
                    subject += c
                else:
                    continue
            # This is checking if the course_id and subject have the same name with no whitespace. If they do, then that means it's something akin to GE, where we don't have a subject, so we put null instead.
            if course_id.replace(" ", "") == subject:
                course_id = None
            # This is checking if we have one of these "or" scenarios where we need to put the classes into an array and return that as course_id.
            custom_display_name = course.get("customDisplayName", "")
            if "or" in custom_display_name.lower():  # Case insensitive check
                #print(f"Custom Display Name with 'or': {custom_display_name}")
                box_o_strings = custom_display_name.split("or") # There is only ever one "or" in the sentence. By splitting by "or", we get two parts, the last class, and everything else which is now in the format of "class, class, class,".
                last = box_o_strings[1]
                rest = box_o_strings[0]
                classes = [] # Our container for classes
                # Processing everything but the last class
                course_list = rest.split(',')
                if len(course_list) == 1: # Meaning that we have an "or" with only two items
                    classes.append(rest.replace(" ", ""))
                    classes.append(last.replace(" ", ""))
                else:
                    for item in course_list:
                        if item[0].isalpha():
                            classes.append(item.replace(" ", ""))
                    classes.append(last.replace(" ", ""))
                course_id = classes


            # Creating the new course in our format
            new_course = {
            "subject": subject,
            "course": course_id,
            "units": course_units
            }
            # Inserting the new course into our structure
            new_version[str(term["tIndex"])]["courses"].append(new_course)
    
    # Printing the courses in our new format
    pretty_json = json.dumps(new_version, indent=4)
    print(pretty_json)

    # Save the modified data back to the JSON file
    # with open(filepath, 'w') as file:
    #     json.dump(data, file, indent=4)

    #pretty_json = json.dumps(data, indent=4)
    #print(pretty_json)
    # Use this ^ to get a good look at what the original data looks like.

# Specify the root directory from where to start processing
root_directory = "schedules/Computer Science"
#root_directory = "schedules"
modify_json_files(root_directory)
