import json
import os
from datetime import datetime

def split_json_data(input_filename, output_directory):
    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Read the JSON data from the file
    with open(input_filename, 'r') as file:
        data = json.load(file)

    # Iterate through each object in the array
    for item in data:
        # Construct the folder name using the 'code' and 'id'
        folder_name = f"{item['code']}_{item['id']}"
        folder_path = os.path.join(output_directory, folder_name)

        # Ensure the folder exists
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Prepare the univs.json file content
        univs_content = []
        seen_ids = set()  # Set to track seen college ids

        for college in item["univ_info"]["colleges"]:
            if college["id"] not in seen_ids:
                college_info = {
                    "id": college["id"],
                    "code": college["code"],
                    "name": college["name"],
                    "year": college["year"]
                }
                univs_content.append(college_info)
                seen_ids.add(college["id"])

                 # Sort the majors by the 'major' field alphabetically
                sorted_majors = sorted(college["majors"], key=lambda x: x['major'])

                # Create individual JSON files for each college
                college_filename = f"{college['code']}_{college['id']}.json"
                college_file_path = os.path.join(folder_path, college_filename)
                with open(college_file_path, 'w') as college_file:
                    json.dump(sorted_majors, college_file, indent=4)

        univs_content_sorted = sorted(univs_content, key=lambda x: x['code'])

        # Write the univs.json file with sorted content
        univs_file_path = os.path.join(folder_path, 'univs.json')
        with open(univs_file_path, 'w') as univs_file:
            json.dump(univs_content_sorted , univs_file, indent=4)


# Example usage
input_filename = 'info.json'
output_directory = 'ccc_info/'
split_json_data(input_filename, output_directory)
