import json
import urllib.parse

# Load your JSON data
with open('community_colleges_formatted.json', 'r') as f:
    institutions = json.load(f)

# Base URL and core query parameters
base_url = "https://assist.org/transfer/results?" 
base_params = {
    "year": 74,
    "institution": 11,
    "agreement": None,
    "agreementType": "from",
    "view": "agreement",
    "viewBy": "dept",
    "viewSendingAgreements": "false",
}

def generate_url(institution_id):
    params = base_params.copy()
    params['agreement'] = institution_id

    # Build the viewByKey value with encoding
    viewByKey = urllib.parse.quote_plus(f"{params['year']}/{institution_id}/to/11/AllDepartments")

    query_string = urllib.parse.urlencode(params)
    return base_url + query_string + "&viewByKey=" + viewByKey

# Example usage:
for institution in institutions:
    url = generate_url(institution['id'])
    institution['url'] = url  # Add the 'url' property

# Save the modified JSON data
with open('community_colleges_with_urls.json', 'w') as f:
    json.dump(institutions, f, indent=2)  # Indent for readability
