# ASSIST.org WebScraping classes from 2023-2024 Agreements

## Introduction

- In this Github repo, I am using selenium and a firefox web driver to web scrape agreements display on Assist.org

# Installation

This section covers the steps needed to install and set up the necessary environment to run the project.

### Prerequisites

- Python 3.x
- pip
- Firefox Browser
- geckodriver

### Setting Up a Virtual Environment

To avoid conflicts with other Python projects you may be working on, it’s a good idea to use a virtual environment. Here’s how to set it up:

#### On Windows

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate
```

#### On MacOS and Linux

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate
```

## Installing Dependencies

1. Download the required libraries to your virtual environment

```
pip install -r requirements.txt
```

2. Download the webdriver for firefox

   - MacOS:

     ```
     brew install geckodriver

     ```

   - Windows:
     ```
     choco install selenium-gecko-driver
     ```

## Run the Application

```
python scraper.py
```
