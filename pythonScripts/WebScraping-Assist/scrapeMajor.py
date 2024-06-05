"""
Scrapes course agreements between Cal Poly Slo and community colleges.

The following file is expected to be in the parent directory to obtain
the articulation agreement urls:
community_colleges_with_urls.json

Browser
---
Firefox or Chrome.
By default, Firefox will be used. Set global CHROME variable to True
to use Chrome instead

Required Libraries
---
selenium
BeautifulSoup4
requests

Output
---
Separate .json files are created for each agreement and saved to:
server/json_data/calpolyAgreements/
"""

from selenium import webdriver
from selenium.webdriver.firefox.options import Options as firefox_options
from selenium.webdriver.firefox.service import Service as firefox_service
from selenium.webdriver.chrome.service import Service as chrome_service
from selenium.webdriver.chrome.options import Options as chrome_options
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from os import path, makedirs
import json
import re

from groupCourses import group_course_mappings
from util import construct_path, join_path

# Set to true to use Chrome instead of Firefox
CHROME = True
# Sets selenium browser to headless mode (no gui)
HEADLESS_MODE = True
# Name of the file which contains url data for every CCC
URLS_FILE_NAME = "community_colleges_with_urls.json"

MAJOR_URLS_DIR = construct_path("server/json_data/ccc_info", 2)

# Name of desired directory where agreements will be saved
OUTPUT_DIR = construct_path("server/json_data/ccc_majors/calpoly", 2)


def initialize_driver(is_chrome: bool = False, is_headless_mode: bool = True):
    """
    Initializes and returns a new WebDriver instance.
    The driver can be configured to run in headless mode
    for Chrome or Firefox.

    Parameters:
    ---
    is_chrome: bool
        Sets browser instance to chrome if True.
        Defaulted to False.

    Returns:
    ---
    WebDriver
        An instance of a Selenium WebDriver.
    """
    if is_chrome:
        options = chrome_options()
        if is_headless_mode:
            options.add_argument('--headless')
            options.add_argument('--disable-gpu') 
        driver = webdriver.Chrome(service=chrome_service(
            ChromeDriverManager().install()), options=options)
    else:
        options = firefox_options()
        if is_headless_mode:
            options.add_argument('--headless')
        driver = webdriver.Firefox(service=firefox_service(
            GeckoDriverManager().install()), options=options)
    return driver


def extract_courses(course_area: BeautifulSoup) -> list:
    """
    Extracts course information from a specified section of HTML.

    Parameters
    ---
    course_area: BeautifulSoup
        A course row -- the section of HTML to parse,
        expected to contain divs with class 'courseLine'.

    Returns
    ---
    list
        A list of dictionaries, each containing 'courseNumber', 'courseTitle',
        and 'courseUnits' for each course.
    """
    courses = course_area.find_all('div', class_='courseLine')
    extracted_courses = []
    for course in courses:
        course_number = course.find(
            'div', class_='prefixCourseNumber').text.strip().replace(" ", "")
        course_title = course.find('div', class_='courseTitle').text.strip()
        course_units = course.find('div', class_='courseUnits').text.strip()
        # remove the "units" at end of unit counts if it is present
        units_i = course_units.find("units")
        course_units = course_units[:units_i] if units_i != -1 else course_units

        extracted_courses.append({
            'courseNumber': course_number,
            'courseTitle': course_title,
            'courseUnits': course_units
        })
    return extracted_courses


def scrape_agreement(url):
    """
    Scrapes and processes articulation agreements from the specified URL,
    organizing the extracted course data and institutional information
    into a structured dictionary suitable for JSON serialization.

    Parameters:
    ---
    url: str
        The URL to scrape for articulation agreement details.

    Returns:
    ---
    dict
        A dictionary containing academic year, institution, and course mappings
        between receiving and sending institutions.
    """
    # url = url_dict["url"]
    print(f"Fetching agreement from\n{url}\n")
    driver.get(url)

    # Wait for the presence of an element specified by XPath
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((
        By.XPATH,
        # '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div'
        '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div'
        )))

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Get school names and academic year
    articulation_agreement = {}
    

    bold_tags = soup.find_all('b')
    re_year_pattern = r'\b(\d{4})-(\d{4})\b'
    for tag in bold_tags:
        if 'To:' in tag.text:
            school = tag.text.split('To: ')[-1].strip()
            articulation_agreement['receivingInstitution'] = school
        elif 'From:' in tag.text:
            school = tag.text.split('From: ')[-1].strip()
            articulation_agreement['sendingInstitution'] = school
        elif re.search(re_year_pattern, tag.text):
            academic_year = re.search(re_year_pattern, tag.text).group(0)
            articulation_agreement['academicYear'] = academic_year
            
    major = soup.find("h1").text
    articulation_agreement["major"] = major

    articulation_agreement["url"] = url

    # Get agreements
    course_rows = soup.find_all('div', class_='rowContent')
    extracted_receiving = []
    extracted_sending = []
    for row in course_rows:
        # courses_dict = {
        #     "receiving": {
        #         "courses": [],
        #         "conjunctions": []
        #     },
        #     'sending': {
        #         "courses": [],
        #         "conjunctions": []
        #     }
        # }

        receiving_courses = row.find_all('div', class_='rowReceiving')
        sending_courses = row.find_all('div', class_='rowSending')

        for receiving in receiving_courses:
            course_list = extract_courses(receiving)
            # print(i, course_list)
            # courses_dict["receiving"]["courses"] = course_list
            conjunctions = receiving.find_all(
                'div', class_='conjunction')
            conjunctions = [conj.text.strip().upper() for conj in conjunctions]
            # courses_dict["receiving"]["conjunctions"] = conjunctions
            extracted_receiving.append({"receving": {
                "courses": course_list,
                "conjunctions": conjunctions
            }})

        for sending in sending_courses:
            course_list = extract_courses(sending)
            # courses_dict["sending"]["courses"] = course_list
            conjunctions = sending.find_all(
                'div', class_='conjunction')
            conjunctions = [conj.text.strip().upper() for conj in conjunctions]
            # courses_dict["sending"]["conjunctions"] = conjunctions
            # receiving_list.append(courses_dict)
            extracted_sending.append({"sending": {
                "courses": course_list,
                "conjunctions": conjunctions
            }})
        # print(json.dumps(courses, indent=4))
        # course_count += len(courses)
    
    courses = []
    for i in range(len(extracted_receiving)):
        courses.append(extracted_receiving[i])
        courses[i]['sending'] = extracted_sending[i]['sending']

    # Convert the scraped information to the desired
    # format and group courses appropriately.
    agreements = []
    for course in courses:
        try:
            course_mappings = group_course_mappings(course)
        except Exception as e:
            print("An error occured when calling group_course_mappings "
                  f"on course: {course}")
            print(f"Error: {e}")
        else:
            agreements.append(course_mappings)
            # print(course_mappings)

    articulation_agreement["agreements"] = agreements
    # print(articulation_agreement)
    return articulation_agreement


try:
    # Initialize the WebDriver
    driver = initialize_driver(CHROME, HEADLESS_MODE)

    # Get URLs from community_colleges_with_urls.json
    with open(construct_path(URLS_FILE_NAME), 'r') as file:
        urls = json.load(file)

    # url = "https://assist.org/transfer/results?year=74&institution=11&agreement=110&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F110%2Fto%2F11%2FMajor%2F8a380dc2-8023-4142-8eb2-57a4a31a5e8d"
    # url = "https://assist.org/transfer/results?year=74&institution=110&agreement=117&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F110%2Fto%2F117%2FMajor%2Fcdf58ef3-0004-46c0-a045-db1dc0f53a28"
    # url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=110&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F110%2Fto%2F11%2FMajor%2Fddd8c2ad-adba-4491-ac4c-fb70b39712f3'
    # url = 'https://assist.org/transfer/results?year=74&nstitution=110&agreement=117&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F110%2Fto%2F117%2FMajor%2Fe8afba2d-c41b-46d6-97ee-2ab2b31868e4'
    # url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=90&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74/90/to/11/Major/8a380dc2-8023-4142-8eb2-57a4a31a5e8d'
    # articulation_agreement = scrape_agreement(url)


    # print(json.dumps(articulation_agreement, indent=4))
    # i = 0
    for url_dict in urls[35:]:
        try:
            url = url_dict["url"].replace("dept", "major")
            subst = "Key="
            key_index = url.rfind(subst) + len(subst)
            url = url[:key_index]
            
            # print(i, url_dict["code"], url_dict["name"])
            # i += 1

            with open(join_path([MAJOR_URLS_DIR, f"{url_dict['code']}_{url_dict['id']}", "CPSLO_11.json"]), 'r') as file:
                # print(file)
                major_key_json = json.load(file)
            
            for major_dict in major_key_json:
                major_url = url+major_dict["key"]

                articulation_agreement = scrape_agreement(major_url)

                
                major = major_dict["major"].replace(',', '').replace('.', '').replace(' ', '_')
                file_path = join_path([OUTPUT_DIR, url_dict['code'], major])+".json"

        
                makedirs(path.dirname(file_path), exist_ok=True)
                with open(file_path, 'w') as file:
                    json.dump(articulation_agreement, file, indent=4)

        # Handle some exceptions within loop to allow the script to
        # continue to scrape the other urls
        except TimeoutException:
            print("Timed out waiting for page to load or element ",
                  f"to appear with url: {major_url}")
            continue
        except ConnectionRefusedError as e:
            print(f"Connection refused with url {major_url}: {e}")
            continue
        except Exception as e:
            print(f"An unspecified error occurred: {e}")
            continue

except WebDriverException as e:
    print(f"WebDriver encountered an issue: {e}")
finally:
    # Ensure the driver quits no matter what
    driver.quit()
