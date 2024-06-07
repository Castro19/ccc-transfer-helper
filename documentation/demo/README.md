# Demo Presentation

## Intro

- What this web application is
- The purpose of this web app
- Tech Stack

## Presentation

### Homepage

- Enter student info of year, ccc, univ, and major
- Two options from here:
  1. Get Assist PDF Agreement
  2. Go to the page where you will make your schedule

### Schedule Page

- Overview of features:
  - Inputting classes Typing / Drag&Drop
  - Effect of used classes styling color changing
  - Easily remove classes
  - Class Menu accordions
  - General-Ed accordion with logic of satisfying areas.
  - Saving Schedule without logging in.

### Login / Signup Page

- Users can login with E-mail/pass or use google login to signup with firebase

### Saved Schedules

- Authorized users can save schedules
- A list of their saved schedules can be accessed where they can edit or delete any schedule they choose

## Next Steps

### Generating Schedules Problem

- No CCC prereq structure makes this a difficult task to automatically generate CCC Schedules
- Explain current approach of [Calpoly Schedules](../showcaseJSON/calpoly_cs_schedule.json) being used alongside with JSON file of [CCC Course Equivalencies](../showcaseJSON/COLUMBIA_10_course_equivalencies.json) and the result of this approach to create a [matched schedule](../showcaseJSON/COMPUTER_SCIENCE_COLUMBIA_SCHEDULE.json)

### A new approach to the Generating Schedules Problem

- Re-explain the problem of not having the CCC pre req structure that led to the approach of trying to replace CalPoly courses with the CCC course equivalency.
- Now explain how our task of generating schedules would be 10x easier if we had the CCC prereq structure
- The new approach is to use the Calpoly schedules to try and find the prereq structure of every CCC.
- Assuming we were able to find the prereq strucutre of a given CCC, we would be able to generate a schedule for a student transferring to any univeristy for any major.
- It could work like this:

1. Grab all CCC courses from the [Assist agreement](https://assist.org/transfer/results?year=74&institution=11&agreement=150&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=74%2F150%2Fto%2F11%2FMajor%2Fffb4ba0b-c401-4aad-aaf4-9203256663d0)
2. Clean the result: Get rid of any duplicates, optional classes, or conjuctions
3. Sort the classes by their prereq depth, a depth, that shows how many prereqs a given class has.
4. Create the schedule with this knowledge by focusing a semester at a time.

## Conclusion

- This project has the potential to save CCC Students hours of time to be a platform where they can easily build their schedules and find out what classes they need to take next semester
- Porject uses MERN tech stack but can be Limitless new features that can be implemented with the ability of students contributing by creating JSON Files with python.
