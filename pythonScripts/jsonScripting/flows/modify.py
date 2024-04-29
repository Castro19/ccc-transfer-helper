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
    
    # Modify Data here:
    print(data)
    
    # Save the modified data back to the JSON file
    # with open(filepath, 'w') as file:
    #     json.dump(data, file, indent=4)

# Specify the root directory from where to start processing
root_directory = "schedules"
modify_json_files(root_directory)
