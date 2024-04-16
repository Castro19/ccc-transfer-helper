import time
import json
import requests

def formatUniversities(colleges):
    ccc = []
    for college in colleges:
        formatted_college = {
            "id": college["institutionParentId"],
            "name": college["institutionName"],
            "code": college["code"].replace(" ", ""),
            "year": college["receivingYearIds"][-1]
        }
        ccc.append(formatted_college)
    return ccc

# {"reports":[{"label":"Sociology/Science and Medicine B.A.","key":"74/150/to/7/Major/4a8e127e-5a2c-4099-be5f-005d5a3e9f0b","ownerInstitutionId":7}
            
def formatMajors(majors):
    formatted_majors = []
    for major in majors:
        m = {
            "major": major["label"],
            "key": major["key"]
        }
        formatted_majors.append(m)
    return formatted_majors

def findUniversities(community_college_id):
    try:
        # Introduce delay
        time.sleep(1)
        
        # Requesting the agreements data from the API
        response = requests.get(f'https://assist.org/api/institutions/{community_college_id}/agreements')
        response.raise_for_status()  # Check if response contains a 4xx or 5xx status code

        agreements = response.json()
        
        return agreements

    except requests.RequestException as e:
        print(f"Error fetching agreements: {e}")
        return []

'''
{'id': 144, 'name': 'University of California, Merced', 'code': 'UCM', 'year': 74}

            https://assist.org/transfer/results?year=74&institution=7&agreement=150&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F150%2Fto%2F7%2FMajor%2F5d972735-7328-468d-9d11-bd7a7ef19ef0

'''
            
def findMajors(colleges, ccc_id):
    # college_majors = []
    try:
        for i, college in enumerate(colleges):
            url = f'https://assist.org/api/agreements?receivingInstitutionId={college["id"]}&sendingInstitutionId={ccc_id}&academicYearId={college["year"]}&categoryCode=major'

            # Introduce delay
            time.sleep(0.3)
            
            # Requesting the agreements data from the API
            response = requests.get(url)
            response.raise_for_status()  # Check if response contains a 4xx or 5xx status code

            majors = response.json()

            formatted_majors = formatMajors(majors["reports"])

            college["majors"] = formatted_majors

            
        return colleges

    except requests.RequestException as e:
        print(f"Error fetching agreements: {e}")
        return []


def modify_ccc(cccs):
    list_of_univs = []
    for i, college in enumerate(cccs):
        # Introduce delay
        time.sleep(0.5)

        colleges = findUniversities(college["id"])
        
        formatted_collges = formatUniversities(colleges)

        colleges_with_majors = findMajors(formatted_collges, college["id"])
    
        univ_info = {
            "id": college["id"],
            "colleges": colleges_with_majors
        }

        college["univ_info"] = univ_info

    return cccs


def main():
    with open('community_colleges.json', 'r') as file:
        data = json.load(file)

    cccs = modify_ccc(data)

    # colleges = findUniversities(ccc_id)

    # formatted_collges = formatUniversities(colleges)
    
    # colleges_with_majors = findMajors(formatted_collges, ccc_id)
    
    # ccc_info = {
    #     "id": ccc_id,
    #     "colleges": colleges_with_majors
    # }

    json_data = json.dumps(cccs, indent=4)

    # Save to file
    with open('info.json', 'w') as outfile:
        outfile.write(json_data)
    
    # print(majorList)

if __name__ == "__main__":
    main()
