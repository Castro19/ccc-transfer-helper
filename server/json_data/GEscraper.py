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
import pprint
import json
import re
import os


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
    dir_path_list = path.dirname(path.abspath(__file__)).split('/')
    desired_dir = '/'.join(dir_path_list[:len(dir_path_list) - dir_levels_up])
    return path.join(desired_dir, file_name)

# Set to true to use Chrome instead of Firefox
CHROME = True
# Sets selenium browser to headless mode (no gui)
HEADLESS_MODE = False
# Name of the file which contains url data for every CCC
URLS_FILE_NAME = "community_colleges_with_urls.json"
# Name of desired directory where agreements will be saved
AGREEMENT_DIR = construct_path("server/json_data/ge", 2)


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
def extract_courses(area_table):
    """
    Extracts course information from a specified table of HTML.

    Parameters
    ---
    area_table: BeautifulSoup
        The table containing course information.

    Returns
    ---
    list of lists
        A list of lists, each containing dictionaries with 'courseNumber' and 'courseTitle'.
    """
    extracted_courses = []
    
    # Locate all tables directly within the area_table
    tables = area_table.find_all('table', class_='table table-light table-borderless')
    for course_table in tables:
        area_courses = []
        courses = course_table.find('tbody').find_all('tr')
        for course in courses:
            tds = course.find_all('td')
            if len(tds) < 3:
                continue  # Skip rows that do not have enough columns
            course_number = tds[0].text.strip().replace(" ", "")
            course_title = tds[1].text.strip()
            course_units = tds[2].text.strip()

            if course_number:
                area_courses.append({
                    'courseNumber': course_number,
                    'courseTitle': course_title,
                    'courseUnits': course_units
                })
        if area_courses:
            extracted_courses.append(area_courses)
    
    return extracted_courses

def scrape_courses(url, area_keys):
    driver = initialize_driver(is_chrome=True, is_headless_mode=True)
    driver.get(url)

    # Initialize a dictionary to store courses for each area
    courses_dict = {key: [] for key in area_keys}

    try:
        # Print the page source before waiting to help debug
        #print("Initial page source length:", len(driver.page_source))

        # Wait for the specific element to be present before extracting the page source
        WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, '/html/body/app-root/div/app-transfer/div[@role="main"]/app-results/section[@id="view-results"]/app-report-preview/div[@class="resultsBox"]/awc-transferable-courses'))
        )

        #print("Element found, extracting page source...")

        shadow_root = driver.execute_script('return document.querySelector("awc-transferable-courses").shadowRoot')
        content = shadow_root.find_element(By.CSS_SELECTOR, 'div.transferResultsBox div.reportContainer div.resultsBoxContent')

        soup = BeautifulSoup(content.get_attribute('outerHTML'), 'html.parser')
        #print("Extracted content HTML:")
        #print(soup.prettify())  # Print the prettified HTML of the extracted content

        # Extract and process the tables
        extracted_courses = extract_courses(soup)
        #print("Extracted Courses:", extracted_courses)

        # Group the courses by area
        for area_courses, area in zip(extracted_courses, area_keys):
            courses_dict[area] = area_courses

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        driver.quit()

    return courses_dict

areas = [
    'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'D', 'D0', 'D1', 'D2', 'D3', 'D4',
    'D5', 'D6', 'D7', 'D8', 'D9', 'E', 'F'
]

def create_ge_json(courses_dict):
    """
    Creates a JSON structure for the General Education requirements with the provided courses.

    Parameters
    ---
    courses_dict: dict
        A dictionary containing the courses for each area.

    Returns
    ---
    dict
        The JSON structure for the General Education requirements.
    """
    ge_structure = {
        "GE": [
            {
                "Area A": {
                    "title": "English Language Communication and Critical Thinking",
                    "requirements": [9, "units"],
                    "A1": {
                        "title": "Oral Communication",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("A1", [])
                    },
                    "A2": {
                        "title": "Written Communication",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("A2", [])
                    },
                    "A3": {
                        "title": "Critical Thinking",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("A3", [])
                    }
                },
                "Area B": {
                    "title": "Scientific Inquiry and Quantitative Reasoning",
                    "requirements": [9, "units"],
                    "B1": {
                        "title": "Physical Science",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("B1", [])
                    },
                    "B2": {
                        "title": "Life Science",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("B2", [])
                    },
                    "B3": {
                        "title": "Laboratory Activity",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("B3", [])
                    },
                    "B4": {
                        "title": "Mathematics/Quantitative Reasoning",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("B4", [])
                    }
                },
                "Area C": {
                    "title": "Arts and Humanities",
                    "requirements": [9, "units"],
                    "C1": {
                        "title": "Arts: (Arts, Cinema, Dance, Music, Theater)",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("C1", [])
                    },
                    "C2": {
                        "title": "Humanities: (Literature, Philosophy, Languages Other than English)",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("C2", [])
                    }
                },
                "Area D": {
                    "title": "Social Sciences",
                    "requirements": [6, "units"],
                    "D": {
                        "title": "Social Sciences",
                        "requirements": [],
                        "courses": courses_dict.get("D", [])
                    },
                    "D0": {
                        "title": "Sociology and Criminology",
                        "requirements": [],
                        "courses": courses_dict.get("D0", [])
                    },
                    "D1": {
                        "title": "Anthropology and Archeology",
                        "requirements": [],
                        "courses": courses_dict.get("D1", [])
                    },
                    "D2": {
                        "title": "Economics",
                        "requirements": [],
                        "courses": courses_dict.get("D2", [])
                    },
                    "D3": {
                        "title": "Ethnic Studies",
                        "requirements": [],
                        "courses": courses_dict.get("D3", [])
                    },
                    "D4": {
                        "title": "Gender Studies",
                        "requirements": [],
                        "courses": courses_dict.get("D4", [])
                    },
                    "D5": {
                        "title": "Geography",
                        "requirements": [],
                        "courses": courses_dict.get("D5", [])
                    },
                    "D6": {
                        "title": "History",
                        "requirements": [],
                        "courses": courses_dict.get("D6", [])
                    },
                    "D7": {
                        "title": "Interdisciplinary Social or Behavioral Science",
                        "requirements": [],
                        "courses": courses_dict.get("D7", [])
                    },
                    "D8": {
                        "title": "Political Science, Government and Legal Institutions",
                        "requirements": [],
                        "courses": courses_dict.get("D8", [])
                    },
                    "D9": {
                        "title": "Psychology",
                        "requirements": [],
                        "courses": courses_dict.get("D9", [])
                    }
                },
                "Area E": {
                    "title": "Lifelong Learning and Self-Development",
                    "requirements": [3, "units"],
                    "E": {
                        "title": "Lifelong Learning and Self-Development",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("E", [])
                    }
                },
                "Area F": {
                    "title": "Ethnic Studies",
                    "requirements": [3, "units"],
                    "F": {
                        "title": "Ethnic Studies",
                        "requirements": [1, "class"],
                        "courses": courses_dict.get("F", [])
                    }
                }
            }
        ]
    }
    return ge_structure

# Read the JSON file containing school information
with open(URLS_FILE_NAME, 'r') as f:
    schools = json.load(f)

# Ensure the output directory exists
if not os.path.exists(AGREEMENT_DIR):
    os.makedirs(AGREEMENT_DIR)

# Iterate over each school and process the GE courses
def scrape_and_save_ge_data(colleges, base_url, areas, agreement_dir):
    for college in colleges:
        college_id = college["id"]
        college_code = college["code"]
        url = base_url.format(id=college_id)
        course_dict = scrape_courses(url, areas)
        ge_json = create_ge_json(course_dict)

        output_path = construct_path(f"GE/{college_code}.json", 2)
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w") as outfile:
            json.dump(ge_json, outfile, indent=4)
            print(f"Saved {college_code} GE data to {output_path}")

# Load the list of colleges
with open("community_colleges_with_urls.json", "r") as f:
    colleges = json.load(f)

# Define the base URL template
base_url = "https://assist.org/transfer/results?year=74&institution={id}&type=CSUGE&view=transferability&viewBy=breadthArea&viewSendingAgreements=false&viewByKey=all"

# Ensure the output directory exists
if not os.path.exists(AGREEMENT_DIR):
    os.makedirs(AGREEMENT_DIR)

# Call the function to scrape and save the GE data
scrape_and_save_ge_data(colleges, base_url, areas, AGREEMENT_DIR)


