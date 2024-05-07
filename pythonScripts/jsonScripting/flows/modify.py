import os
import json

def modify_json_files(source_directory, target_directory):
    for subdir, dirs, files in os.walk(source_directory):
        for filename in files:
            if filename.endswith(".json"):
                source_filepath = os.path.join(subdir, filename)
                target_subdir = subdir.replace(source_directory, target_directory, 1)  # Replace the source directory path with the target directory path
                if not os.path.exists(target_subdir):
                    os.makedirs(target_subdir)  # Create the target subdirectory if it doesn't exist
                target_filepath = os.path.join(target_subdir, filename)
                
                new_json = modify_json_file(source_filepath)  # Modify the JSON file
                # Save the modified JSON data into the target file path
                with open(target_filepath, 'w') as file:
                    file.write(new_json)
                print(f"Processed and saved: {target_filepath}")


def modify_json_file(filepath):
    # Open the JSON file
    with open(filepath, 'r') as file:
        data = json.load(file)

    # Creating our new structure
    new_version = {}
    
    # Modify Data here:
    for term in data['termData']:
        unique_class = False # Flag to signify whether a class is maybe an elective with options (this is just to easily identify which classes we should manually check)

        if term['tIndex'] == -1: # Just replaces the first index with 0 instead of -1
            new_version[str(0)] = {"courses": []}
        else:
            new_version[str(term["tIndex"])] = {"courses": []}
        for course in term["courses"]:
            if course["id"] is not None:
                course_id = course["id"]
                # Determining the subject
                subject = ""
                for c in course_id:
                    if c.isalpha():
                        subject += c
                    else: 
                        continue
                custom_desc = None
            else:
                course_id = None
                subject = course["customId"]
                if subject != "GE":
                    unique_class = True

                custom_desc = course["customDesc"]
        
            
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
            "uniqueClass": unique_class
            }
            # "units": course_units
            if custom_desc:
                new_course["customDesc"] = custom_desc

            # Inserting the new course into our structure
            new_version[str(term["tIndex"])]["courses"].append(new_course)
            
    # Printing the courses in our new format
    pretty_json = json.dumps(new_version, indent=4)
    return pretty_json
        # print(pretty_json)

    # Save the modified data back to the JSON file
    # with open(filepath, 'w') as file:
    #     json.dump(data, file, indent=4)

    #pretty_json = json.dumps(data, indent=4)
    #print(pretty_json)
    # Use this ^ to get a good look at what the original data looks like.

# Specify the root directory from where to start processing
root_dir = "schedules_4yrs"
#root_directory = "schedules"
modify_json_files(root_dir, "formattedSchedules_4yrs")
