# Clovis Community College Transfer Helper

## Introduction

- This is the beginning of a project that will assist college transfers.
- This will be an all-in-one transfer helper that will use the ASSIST.org to find the transfer agreement.

## Features

- Instantly view the verified agreement between a California Community College and CalPoly (Completed)

- An easy to use user interface where users can drag/drop, instantly remove, or add classes to specific semesters (Completed)

- User authentication using Firebase (Completed)

- Client Side Routing using React Router (Completed)

- MongoDB Implementation to save user information on database (Almost Completed)

- Save and Recycle completed schedules to use as templates (In-Progress)

- Generate Schedules rapidly with the click of a button! (In-Progress)

- View General Ed Completion and view what areas your current Schedule has completed (In-progress)

![Sign up](https://live.staticflickr.com/65535/53724683925_b2091ea94c.jpg)

![Login](https://live.staticflickr.com/65535/53724592459_4811d34e21.jpg)

![HomePage](https://live.staticflickr.com/65535/53724243186_d6ebfa0feb.jpg)

![Schedule Page with Generate Schedule](https://live.staticflickr.com/65535/53724243191_b91293d5d7.jpg)

![SchedulePage with Sidebar](https://live.staticflickr.com/65535/53723348227_7be039c667.jpg)

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

## UML Diagrams using Firebase Auth and MongoDB Database

### Sign Up UML Diagram

![UML Diagram for Sign up](https://live.staticflickr.com/65535/53724578789_fcef28606b.jpg)

### Login UML Diagram

![UML Diagram for Login](https://live.staticflickr.com/65535/53724448378_2f1f586c3d.jpg)

## Contributing

We welcome contributions to our project! To ensure a consistent code style and quality, please follow these guidelines:

### Coding Standards

- Our current MEAN application has the following coding standards

#### **Prettier Configuration:** Prettier is used to format our code.

- The configuration is defined in the `.prettierrc` file at the root of the project:

```json
{
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "jsxSingleQuote": false
}
```

#### ESLint Configuration: Client

- The ESLint configuration for the **client-side** code is defined in the file [`client/.eslintrc.cjs`](https://github.com/Castro19/ccc-transfer-helper/blob/main/client/.eslintrc.cjs)

#### ESLint Configuration: Server

- The ESLint configuartion for the **server-side** code is defined in the file [`server/eslint.config.js`]()
