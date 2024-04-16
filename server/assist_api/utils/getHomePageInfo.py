import json 
from django.conf import settings

def getListOfUnivs(input_id):
    pattern = f"_{input_id}"
    base_directory = settings.CCC_INFO_DIR
    for folder in base_directory.iterdir():
        if folder.name.endswith(pattern) and folder.is_dir():
            univs_file_path = folder / 'univs.json'
            if univs_file_path.exists():
                with open(univs_file_path, 'r') as file:
                    data = json.load(file)
                    return data
    return None