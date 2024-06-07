# Clovis Community College Transfer Helper

## Introduction

- Web application can be accessed [here](https://calm-river-08637ab1e.5.azurestaticapps.net/)
- [Demo Video](https://www.youtube.com/watch?v=QdfzL8y1shs&t=79s&ab_channel=CristianCastroOliva)
- [Documentation](./documentation/DOC-README.md)
- This is the beginning of a project that will assist college transfers.
- This will be an all-in-one transfer helper that will use the ASSIST.org to find the transfer agreement.

## Features

- Instantly view the verified agreement between a California Community College and CalPoly (Completed)

- An easy to use user interface where users can drag/drop, instantly remove, or add classes to specific semesters (Completed)

- User authentication using Firebase (Completed)

- Client Side Routing using React Router (Completed)

- MongoDB Implementation to save user information on database (Completed)

- Save and Recycle completed schedules to use as templates (Completed)

- View General Ed Completion and view what areas your current Schedule has completed (Completed)

- Deployment on Microsoft Azure with client side on a web static app and server on a web app service. 

- Generate Schedules rapidly with the click of a button! (In-Progress)

![Sign up](https://live.staticflickr.com/65535/53724683925_b2091ea94c.jpg)

![Login](https://live.staticflickr.com/65535/53724592459_4811d34e21.jpg)

![HomePage](https://live.staticflickr.com/65535/53724243186_d6ebfa0feb.jpg)

![Schedule Page with Generate Schedule](https://live.staticflickr.com/65535/53724243191_b91293d5d7.jpg)

![SchedulePage with Sidebar](https://live.staticflickr.com/65535/53723348227_7be039c667.jpg)


## Sign up / Login

- This application will still work without a user being logged in, however, they won't be able to save any schedules that were created.
- When a user is logged in they have the option to save, update, and delete schedules!
- Authorization is possible in our web application using firebase. 

### Instructions on how to create a new User

- A new user can be created by two methods:
1. **Google sign-in:** Using a google provider, we are able to have users log in using their google account. 
2. **E-mail and password sign-in:** In the sign-up page, enter the information provided and create an account

## Installation & Set Up

1. **Clone the Repo:**

   ```
   git clone https://github.com/Castro19/ccc-transfer-helper.git
   ```

2. **Install** the **Dev** Dependencies:

   ```
   npm install
   ```

3. **Install** the **Client** (React) & **Server** (Django) Dependencies

   ```
   npm run install:all
   ```

4. **Configure Firebase:**

- Go to your [firebase console](https://console.firebase.google.com/u/0/)

  - Click `add project`
  - Follow their guidelines

- Once you create your project, a config ffile should be ready for you.

  - In your newly created Firebase project, click on the left sidebar for the option of `Project Settings`.
  - Scroll down until you are at the `Your Apps section` where you will `Add app`
  - Select the web with </> symbols. Click
  - Here you should get the `SDK setup and configuration`
  - Copy your firebaseConfig options.

- Now that you have your firebase configuration file, go into the sample.env and update the changes here.

- Finally rename `sample.env` to be `.env`

5. **Configure MongoDB Compass:**

- Make sure MongoDB is setup on your local machine

- In the Server folder, find the file `sample.env`

- Update the environment variable `ATLAS_URI` and assign it to the URI for your MongoDB database

- Finally rename `sample.env` to be `.env`

6. **Start the Application**

   ```
   npm start
   ```
