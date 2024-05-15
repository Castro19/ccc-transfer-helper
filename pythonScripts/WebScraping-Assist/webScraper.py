"""
Scrapes course agreements between Cal Poly Slo and community colleges.

Separate .json files are created for each agreement and saved to:
pythonScrips/json_files/calpolyAgreements/

The following file is expected to be in the parent directory to obtain
the articulation agreement urls:
community_colleges_with_urls.json
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
import json
import re
import os

from groupCourses import group_course_mappings

# Set to true to use Chrome instead of Firefox
CHROME = True
# Sets selenium browser to headless mode (no gui)
HEADLESS_MODE = True
# Name of the file which contains url data for every CCC
URLS_FILE_NAME = "community_colleges_with_urls.json"
# Name of desired directory where agreements will be saved
AGREEMENT_DIR = "json_files/calpolyAgreements/"


def construct_path(file_name: str, dir_levels_up: int = 0) -> str:
    """
    Join current directory path with a desired file name,
    returning full path as a string.

    Full path will be found regardless of os being used.

    Parameters
    ---
    file_name: str
        The desired file name, including subdirectories if desired.
    dir_levels_up: int
        The desired number of directory levels to go up
        from the current directory level.
        Defaulted to 0.

    Returns
    ---
    str
        The full directory path including the given file name.
    """
    dir_path_list = os.path.dirname(os.path.abspath(__file__)).split('/')
    desired_dir = '/'.join(dir_path_list[:len(dir_path_list) - dir_levels_up])
    return os.path.join(desired_dir, file_name)


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
    url = url_dict["url"]
    print(f"Fetching agreement with {url_dict['name']} from\n{url}\n")
    driver.get(url)

    # Wait for the presence of an element specified by XPath
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((
        By.XPATH,
        '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div')
        ))

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

    # Get agreements
    course_rows = soup.find_all('div', class_='rowContent')
    courses = []
    for row in course_rows:
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

        receiving_courses = row.find_all('div', class_='rowReceiving')
        sending_courses = row.find_all('div', class_='rowSending')

        for receiving in receiving_courses:
            course_list = extract_courses(receiving)
            courses_dict["receiving"]["courses"] = course_list
            conjunctions = receiving.find_all(
                'div', class_='conjunction')
            conjunctions = [conj.text.strip().upper() for conj in conjunctions]
            courses_dict["receiving"]["conjunctions"] = conjunctions

        for sending in sending_courses:
            course_list = extract_courses(sending)
            courses_dict["sending"]["courses"] = course_list
            conjunctions = sending.find_all(
                'div', class_='conjunction')
            conjunctions = [conj.text.strip().upper() for conj in conjunctions]
            courses_dict["sending"]["conjunctions"] = conjunctions

        courses.append(courses_dict)

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

    articulation_agreement["agreements"] = agreements

    return articulation_agreement


try:
    # Initialize the WebDriver
    driver = initialize_driver(CHROME, HEADLESS_MODE)

    # Get URLs from community_colleges_with_urls.json
    with open(construct_path(URLS_FILE_NAME), 'r') as file:
        urls = json.load(file)

    for url_dict in urls:
        try:
            articulation_agreement = scrape_agreement(url_dict["url"])
            # Save jsons to pythonScripts/json_files/calpolyAgreements
            file_path = construct_path(f"{AGREEMENT_DIR}"
                                       f"{url_dict['code']}_{url_dict['id']}.json",
                                       1)
            # Create dir if it does not yet exist
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w') as file:
                json.dump(articulation_agreement, file, indent=4)

        # Handle some exceptions within loop to allow the script to
        # continue to scrape the other urls
        except TimeoutException:
            print("Timed out waiting for page to load or element ",
                  f"to appear with url: {url_dict['url']}")
            continue
        except ConnectionRefusedError as e:
            print(f"Connection refused with url {url_dict['url']}: {e}")
            continue
        except Exception as e:
            print(f"An unspecified error occurred: {e}")
            continue

except WebDriverException as e:
    print(f"WebDriver encountered an issue: {e}")
finally:
    # Ensure the driver quits no matter what
    driver.quit()
