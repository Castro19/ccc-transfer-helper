"""
Scrapes course agreements between Cal Poly Slo and community colleges.

Separate .json files are created for each agreement and saved to:
json_files/calpolySchedules/
"""

from selenium import webdriver
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.chrome.service import Service as chrome_service
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import re
import os

from groupCourses import map_course_groupings

# Set to true to use Chrome instead of Firefox
CHROME = False
URLS_FILE_NAME = "community_colleges_with_urls.json"

def join_path(file_name: str) -> str:
    """
    Join current directory path with a desired file name, returning full path as a string.
    Full path will be found regardless of os being used.
    """
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), file_name)

def initialize_driver():
    if CHROME:
        driver = webdriver.Chrome(service=chrome_service(ChromeDriverManager().install()))
    else:
        driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()))
    return driver

def extract_courses(course_area: BeautifulSoup) -> list:
    """
    Extracts course information from a specified section of HTML.

    Parameters
    ---
    course_area : BeautifulSoup
        A course row -- the section of HTML to parse, expected to contain divs with class 'courseLine'.

    Returns
    ---
    list
        A list of dictionaries, each containing 'courseNumber', 'courseTitle', and 'courseUnits' for each course.
    """
    courses = course_area.find_all('div', class_='courseLine')
    extracted_courses = []
    for course in courses:
        course_number = course.find('div', class_='prefixCourseNumber').text.strip().replace(" ", "")
        course_title = course.find('div', class_='courseTitle').text.strip()
        course_units = course.find('div', class_='courseUnits').text.strip()
        # remove the "units" at end of unit counts if it is present
        units_index = course_units.find("units")
        course_units = course_units[:units_index] if units_index != -1 else course_units

        extracted_courses.append({
            'courseNumber': course_number,
            'courseTitle': course_title,
            'courseUnits': course_units
        })
    return extracted_courses

try:
    # Initialize the WebDriver
    driver = initialize_driver()

    # Get URLs from community_colleges_with_urls.json
    with open(join_path(URLS_FILE_NAME), 'r') as file:
        urls = json.load(file)
    
    # Testing
    # print(len(urls))
    # urls = urls[:3]
    # url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=150&agreementType=from&view=agreement&viewBy=dept&viewSendingAgreements=false&viewByKey=74%2F150%2Fto%2F11%2FAllDepartments'
    # url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=10&agreementType=from&view=agreement&viewBy=dept&viewSendingAgreements=false&viewByKey=74%2F10%2Fto%2F11%2FAllDepartments'
    # No agreement -- should result in a timeout error
    # url = "https://assist.org/transfer/results?year=74&institution=11&agreement=34&agreementType=from&view=agreement&viewBy=dept&viewSendingAgreements=false&viewByKey=74%2F34%2Fto%2F11%2FAllDepartments"

    for url_dict in urls:
        try:
            driver.get(url_dict["url"])

            # Wait for the presence of an element specified by XPath
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div'))
            )
            
            soup = BeautifulSoup(driver.page_source, 'html.parser')

            # Get school names and academic year
            articulation_agreement = {}
            bold_tags = soup.find_all('b')
            re_year_pattern = r'\b(\d{4})-(\d{4})\b'
            for tag in bold_tags:
                if 'To:' in tag.text:
                    articulation_agreement['receivingInstitution'] = tag.text.split('To: ')[-1].strip()
                elif 'From:' in tag.text:
                    articulation_agreement['sendingInstitution'] = tag.text.split('From: ')[-1].strip()
                elif re.search(re_year_pattern, tag.text):
                    articulation_agreement['academicYear'] = re.search(re_year_pattern, tag.text).group(0)

            # Get agreements
            course_rows = soup.find_all('div', class_='rowContent')    
            courses = []
            for row in course_rows:
                
                receiving_courses = row.find_all('div', class_='rowReceiving')
                sending_courses = row.find_all('div', class_='rowSending')

                courses_dict = {
                    "receiving": {
                        "courses": [],
                        "conjunctions": []
                    },
                    'sending': {
                        "courses": [],
                        "conjunctions": []
                    }
                }

                for receiving in receiving_courses:
                    courses_dict["receiving"]["courses"] = extract_courses(receiving)
                    conjunctions = receiving.find_all('div', class_='conjunction')
                    courses_dict["receiving"]["conjunctions"] = [conj.text.strip().upper() for conj in conjunctions]

                for sending in sending_courses:
                    courses_dict["sending"]["courses"] = extract_courses(sending)
                    conjunctions = sending.find_all('div', class_='conjunction')
                    courses_dict["sending"]["conjunctions"] = [conj.text.strip().upper() for conj in conjunctions]

                courses.append(courses_dict)

            # Convert the scraped information to the desired format and group courses appropriately.
            agreements = []
            for course in courses:
                agreements.append(map_course_groupings(course))
            # print(agreements)
            articulation_agreement["agreements"] = agreements
            # print(json.dumps(articulation_agreement, indent=4)

            # Save jsons to /json_files/calpolySchedules. Create dir if it does not yet exist
            file_path = join_path(f"json_files/calpolySchedules/{url_dict['code']}_{url_dict['id']}.json")
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w') as file:
                json.dump(articulation_agreement, file, indent=4)


        # Handle some exceptions within loop to allow the script to continue to scrape the other urls
        except TimeoutException:
            print(f"Timed out waiting for page to load or element to appear with url: {url_dict['url']}")
            continue
        except ConnectionRefusedError as e:
            print(f"Connection refused with url: {url_dict['url']}")
            continue
        except Exception as e:
            print(f"Unspecified error -- possibly in map_course_groupings: {e}")
            # try to print course passed to map_course_groupings if it exists to narrow down the potential issue
            try:
                print(course)
            except Exception as e:
                print(e)
            continue

except WebDriverException as e:
    print(f"WebDriver encountered an issue: {e}")
finally:
    # Ensure the driver quits no matter what
    driver.quit()

