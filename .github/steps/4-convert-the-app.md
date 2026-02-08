## Step 4: Convert the legacy COBOL code to Node.js

Perfect! Now that we've generated the data flow diagram and prepared our comprehensive test plan, we have all the context we need to leverage GitHub Copilot for the actual code transformation from COBOL to Node.js.

The data flow diagram helps us understand how data moves through the system, while the test plan ensures we maintain the same functionality during modernization. With this foundation, GitHub Copilot can intelligently convert our legacy code while preserving business logic.

### ⌨️ Activity: Leverage Copilot to Transform COBOL to Node.js

Let's use GitHub Copilot to do the heavy lifting of converting our COBOL application to modern Node.js. Copilot will use the existing codebase, data flow understanding to create a functionally equivalent Node.js application.

> [!NOTE]
> It is still important to be specific and clear in your prompt to ensure Copilot does exactly what you need!

1. Open your Copilot Chat window and make sure you are using **Agent Mode**.
1. Provide the following prompt to Copilot to start the conversion process:

    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > #codebase convert the three separate COBOL legacy files into a single
    > Node.js src/accounting/index.js accounting application.
    >
    > Leverage the data flow diagram of the existing COBOL application
    > available in the repository to preserve:
    > - the original business logic
    > - data integrity
    > - menu options of the original application.
    >
    > Change directory to src/accounting and install all prerequisites
    > to run the Node.js application
    >
    > Create a .vscode/launch.json file to run the Node.js application
    > ```

1. Ensure the Node.js application is created in the `src/accounting` directory and that you can run it from the `Run and Debug` sidebar in VS Code.
     <!--- TODO add screenshot -->

1. Make sure the application works the same as the original COBOL application.

### ⌨️ Activity: Create Unit Tests Based on Our Test Plan

Let's use the test plan we generated earlier as the blueprint for creating comprehensive unit tests. This ensures our modernized code behaves exactly like the original COBOL system.

Since we already have a detailed test plan in `docs/TESTPLAN.md`, GitHub Copilot can use that as context to create matching unit tests for our new Node.js implementation.

1. Open your Copilot Chat window and make sure you are using **Agent Mode**.
1. Attach the `docs/TESTPLAN.md` file to the chat so Copilot can use it as context.
1. Provide the following prompt to Copilot to generate unit tests:
    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > #codebase change directory to src/accounting and install all
    > prerequisites for the test framework.
    >
    > - Write unit tests for the Node.js application that mirror the scenarios in the test plan documented in docs/TESTPLAN.md.
    > - Place the tests in a dedicated test file.
    > - Make sure each test checks the expected behavior
    >   described in the COBOL test plan.
    > ```

1. Copilot Agent Mode should generate unit tests and make sure they run. With its self-healing capabilities, Copilot should automatically fix any issues that arise during the test generation process.
   > If there are any issues, you can continue chatting with Copilot to refine the tests until they are passing and you are satisfied with the results.

### ⌨️ Activity: Final checks and commit your changes

You're almost done! Now let's verify that our Node.js application works exactly like the original COBOL system.

Take a moment to run the application and test suite yourself to ensure everything is functioning as expected.

1. You can use Copilot chat to help with this process.

    > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
    >
    > ```prompt
    > Run the Node.js application and run the test suite and verify tests pass.
    > ```

1. Commit the changes to the `src/accounting` directory and push to the `modernize-legacy-code` branch.

   > [!TIP]
   > You can use the source control side panel like you did in the previous steps!

<details>
<summary>Having trouble? 🤷</summary><br/>

If you don't get feedback, here are some things to check:

- Make sure your pushed the `src/accounting/*` changes to the branch `modernize-legacy-code`.

</details>

### :keyboard: Activity: Create a pull request and merge

Not much left! Let's create a pull request and merge our changes to `main`.

1. In the web browser, navigate to your repository.
1. At the top click on the **Pull requests** tab. Notice the banner suggesting to create a pull request.
1. In the top right, press the green **Compare & pull request** button.
1. On the **Open a pull request** page, enter the following options:

   - For the **base** branch, select `main`.
   - For the **compare** branch, select the `modernize-legacy-code` branch.
   - For the **add a title** field, enter `Modernize my legacy COBOL application to Node.js`.
   - For the **add a description** field, click the Copilot button and select summary to have one generated. [GitHub Copilot pull request summary docs](https://docs.github.com/en/enterprise-cloud@latest/copilot/using-github-copilot/using-github-copilot-for-pull-requests/creating-a-pull-request-summary-with-github-copilot)
   - Alternately, you write your own such as:

     ```md
     Modernize my legacy COBOL application to Node.js with an explanation of the COBOL code and a test plan.
     This pull request converts the COBOL application to a Node.js application, preserving the original business logic and functionality.
     It also includes unit tests based on the test plan.
     ```

1. Press the green **Create pull request** button.
1. Scroll down to review the commit history and ensure your changes are present.
1. At the bottom, press the green **Merge pull request** button and then the green **Confirm merge** button.
