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
from util import construct_path

# Set to true to use Chrome instead of Firefox
CHROME = True
# Sets selenium browser to headless mode (no gui)
HEADLESS_MODE = True
# Name of the file which contains url data for every CCC
URLS_FILE_NAME = "community_colleges_with_urls.json"
# Name of desired directory where agreements will be saved
OUTPUT_DIR = construct_path("server/json_data/ccc_courses/", 2)


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


def scrape_courses(url):
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
    print(f"Fetching {url_dict['name']} courses from\n{url}")
    driver.get(url)

    # Wait for the presence of an element specified by XPath
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((
        By.XPATH,
        '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div')
        ))

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Get courses
    course_rows = soup.find_all('div', class_='rowContent')
    all_courses = []
    for row in course_rows:
        sending_courses = row.find_all('div', class_='rowSending')

        for sending in sending_courses:
            course_list = extract_courses(sending)

        for course in course_list:
            if course not in all_courses:
                all_courses.append(course)
    if not len(all_courses) == len(set([x["courseNumber"] for x in all_courses])):
        raise Exception("basdfslkjd")
    return all_courses


try:
    # Initialize the WebDriver
    driver = initialize_driver(CHROME, HEADLESS_MODE)

    # Get URLs from community_colleges_with_urls.json
    with open(construct_path(URLS_FILE_NAME), 'r') as file:
        urls = json.load(file)

    for url_dict in urls:
        try:
            course_dict = {}
            course_dict["name"] = url_dict["name"]
            course_dict["code"] = url_dict["code"]
            course_dict["id"] = url_dict["id"]
            course_dict["courses"] = scrape_courses(url_dict["url"])
            # Save jsons to server/json_files/calpolyAgreements
            file_path = construct_path(f"{OUTPUT_DIR}"
                                       f"{url_dict['code']}_{url_dict['id']}.json")
            # Create dir if it does not yet exist
            makedirs(path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w') as file:
                json.dump(course_dict, file, indent=4)
            print(f"Courses saved successfully to:\n{file_path}\n")

        # Handle some exceptions within loop to allow the script to
        # continue to scrape the other urls
        except TimeoutException:
            print("Timed out waiting for page to load or element",
                  f"to appear with url:\n{url_dict['url']}\n")
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
