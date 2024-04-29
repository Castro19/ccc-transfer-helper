from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
import os
import time

FILE_NAME = "output.html"
FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), FILE_NAME)

def extract_courses(course_area):
    courses = course_area.find_all('div', class_='courseLine')
    extracted_courses = []
    for course in courses:
        course_number = course.find('div', class_='prefixCourseNumber').text.strip()
        course_title = course.find('div', class_='courseTitle').text.strip()
        course_units = course.find('div', class_='courseUnits').text.strip()
        # remove the "units" at end of unit counts if it is present
        units_index = course_units.find("units")
        course_units = course_units[:units_index] if units_index != -1 else course_units

        extracted_courses.append({
            'Course Number': course_number,
            'Course Title': course_title,
            'Units': course_units
        })
    return extracted_courses


try:
    # Initialize the WebDriver with geckodriver
    driver = webdriver.Firefox(service=Service(GeckoDriverManager().install()))

    # URL of the webpage
    url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=150&agreementType=from&view=agreement&viewBy=dept&viewSendingAgreements=false&viewByKey=74%2F150%2Fto%2F11%2FAllDepartments'
    url = 'https://assist.org/transfer/results?year=74&institution=11&agreement=10&agreementType=from&view=agreement&viewBy=dept&viewSendingAgreements=false&viewByKey=74%2F10%2Fto%2F11%2FAllDepartments'
    driver.get(url)

    # Wait for the presence of an element specified by XPath
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="view-results"]/app-report-preview/div/awc-agreement/div/div'))
    )
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    course_rows = soup.find_all('div', class_='rowContent')    
    courses = []
    for row in course_rows:
        
        receiving_courses = row.find_all('div', class_='rowReceiving')
        sending_courses = row.find_all('div', class_='rowSending')

        courses_dict = {
            "Receiving": {
                "Courses": [],
                "Conjunctions": []
            },
            'Sending': {
                "Courses": [],
                "Conjunctions": []
            }
        }

        for receiving in receiving_courses:
            courses_dict["Receiving"]["Courses"] = extract_courses(receiving)
            conjunctions = receiving.find_all('div', class_='conjunction')
            courses_dict["Receiving"]["Conjunctions"] = [conj.text.strip() for conj in conjunctions]

        for sending in sending_courses:
            courses_dict["Sending"]["Courses"] = extract_courses(sending)
            conjunctions = sending.find_all('div', class_='conjunction')
            courses_dict["Sending"]["Conjunctions"] = [conj.text.strip() for conj in conjunctions]

        courses.append(courses_dict)

    # print the parsed data
    for course in courses:
        print(course)

except TimeoutException:
    print("Timed out waiting for page to load or element to appear.")
except WebDriverException as e:
    print(f"WebDriver encountered an issue: {e}")
finally:
    # Ensure the driver quits no matter what
    driver.quit()



# with open(FILE_PATH, "w", encoding='utf-8') as file:
#     file.write(str(course_rows))