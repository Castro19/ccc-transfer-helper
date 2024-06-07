# Documentation

## UML Diagrams using Firebase Auth and MongoDB Database

### Sign Up UML Diagram

![UML Diagram for Sign up](https://live.staticflickr.com/65535/53724578789_fcef28606b.jpg)

### Login UML Diagram

![UML Diagram for Login](https://live.staticflickr.com/65535/53724448378_2f1f586c3d.jpg)

## Testing

- End-to-End testing in this application was built using Cypress. All views are implemented to ensure each page works correctly.
- **Side note**: There was a bug implementing the typing functionality on the login/signup page, however, I did my best to test what I could on that page.
- [Testing video demo](https://youtu.be/LVj9v8PJPOw)

### How to test using Cypress

1. Open the cypress app:

   ```bash
   npx cypress open
   ```

2. Click E2E testing
3. Select any browser, I used Firefox
4. View this list of specs and begin running the tests

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

- The ESLint configuartion for the **server-side** code is defined in the file [`server/eslint.config.js`](https://github.com/Castro19/ccc-transfer-helper/blob/TE4/server/eslint.config.js)

## How to Contribute

- Contributing to this project involves a series of steps to ensure that changes are implemented smoothly and consistently.
- Follow these guidelines to contribute effectively:

1. **Fetch and Pull the Latest Changes**

   - Before starting, make sure you have the latest changes from the main branch.
   - Run the following commands:
     ```bash
     git fetch origin
     git pull origin main
     ```

2. **Create a New Branch Off Main**

   - Create a new branch to work on your feature or bug fix. Use a descriptive name for your branch.
   - Example:
     ```bash
     git checkout -b feature/your-feature-name
     ```

3. **Make the changes**:

   - On this branch, make your changes to the code.
   - Make the changes small and add comments explain what the code does when necessary.
   - These changes will be reviewed by a teammate in the pull request on step 9.

4. **Ensure Code Quality with ESLint and Prettier**:

   - Run ESLint and Prettier to check and format your code according to the project's coding standards.
   - Make sure there are no `errors` from ESLint.

   - **Example for the client-side code**:

     ```bash
     npm run lint:client
     npm run format:client
     ```

   - **Example for the server-side code**:

     ```bash
     npm run lint:server
     npm run format:server
     ```

   - **Or to run both in one go**:

     ```bash
      npm run lint:all
      npm run format:all
     ```

5. **Commit Your Changes**

   - Commit your changes with a clear and concise commit message.
   - Example:
     ```bash
     git add .
     git commit -m "Add feature to enhance user authentication"
     ```

6. **Push Your Changes to Your Branch**

   - Push your committed changes to the remote repository.
   - Example:
     ```bash
     git push origin feature/your-feature-name
     ```

7. **Sync Changes from the Main Branch**

   - Ensure your branch is up to date with the latest changes from the main branch by merging the main branch into your branch.
   - Example:
     ```bash
     git checkout main
     git pull origin main
     git checkout feature/your-feature-name
     git merge main
     ```

8. **Create the Pull Request and Assign Reviewers**

   - Create a pull request (PR) from your branch to the main branch.
   - Provide a detailed description of your changes and assign reviewers.
   - Example:

     ```markdown
     ## Description

     Detailed explanation of what the new feature or fix does.

     ## Changes

     - List of changes made
     ```

9. **Wait for Your Pull Request to Be Reviewed**

   - Wait for your PR to be reviewed by the assigned reviewers.
   - If changes are requested, make the necessary adjustments and commit them to your branch. Repeat steps 3,4, and 5 as needed.

10. **Squash and Merge into Main**

    - Once your PR is approved, use the `squash and merge` option to merge it into the main branch.
    - Provide a detailed description of the new feature in the merge commit.
    - Example:

      ```markdown
      ## New Feature: Enhanced User Authentication

      - Detailed description of the new feature.
      ```

11. **Update GitHub Projects**

    - Use GitHub Projects to check off the task associated with your feature and log the hours it took to complete.
    - Example:
      ```markdown
      - [x] Enhanced user authentication (3 hours)
      ```

12. **Document Your Changes**
    - Update the `documentation/README.md` file with any relevant changes or new features.
    - Ensure your documentation is clear and provides sufficient detail for other team members to understand the changes.

### Contribution Important Note

- Please try and keep the `main` branch `commit history` clean.
  - Each pull request merged should make sure that it passes the `CI/CD` tests and should pass any future tests implemented before approving and merging.
  - Also do `squash and merge` to make the commits from one branch a single commit when being merged into main.

By following these steps, you can contribute effectively to the project and maintain a smooth workflow within the team.
