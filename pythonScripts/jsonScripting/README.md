# CCC-Transfer-Helper Repo for Scripting

## Introuction

- This file is apart of the main repository of [ccc-transfer-helper](https://github.com/Castro19/ccc-transfer-helper)

- This repo's purpose is to create Python scripts that will format our JSON data to allow for requests to be made easily.

## Features to Implement

### 1. Delete any agreement that is not necessary

- Go through every agreement and find any that might be repetitive or might not be used.

- Notice how some subfolders in the `schedules` folders have multiple files that can represent different concentrations.

- Delete any of these files and keep the generic version

### 2. Find any Invalid courses

- Find any courses that have an ID Number that is 300+

- Don't delete these courses yet, but make note of them and save the script that can find these courses and delete them if necessary.

### 3. Double check Scheudles with PolyFlow Builder

- Use [PolyFlowBuilder](https://polyflowbuilder.io/) to create flowcharts and double check / doucment any thing that might seem different.

## Installation & Setup

1. **Clone Repo**:

```
git clone https://github.com/Castro19/CCC-helper-scripting.git
```

2. **Move into correct folder**:

```
cd CCC-helper-scripting/flows
```

3. **Run the Python File**:

```
python modify.py
```
