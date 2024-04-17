import json 
from django.conf import settings

def getListOfUnivs(ccc_id):
    # pattern = f"_{ccc_id}"
    base_directory = settings.CCC_INFO_DIR
    univ_path = base_directory / ccc_id  / 'univs.json'
    print("UNIV PATH: ", univ_path)
    
    if univ_path.exists() and univ_path.is_file():
        with open(univ_path, 'r') as file:
            data = json.load(file)
            return data
    return None

def getListOfMajors(ccc_id, univ_id):
    base_directory = settings.CCC_INFO_DIR
    major_path = base_directory / ccc_id / (univ_id + ".json")
    if major_path.exists and major_path.is_file():
        with open(major_path, 'r') as file:
            data = json.load(file)
            return data
    return None
                