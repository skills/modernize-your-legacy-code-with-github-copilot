## Step 2: Understanding the School's Legacy COBOL Accounting System

In this step, you'll explore the school's legacy COBOL accounting system to understand its structure and functionality. This will help you prepare for the modernization process.

### ⌨️ Activity: Exploring the School's Legacy Accounting System

Before we can modernize the school's accounting system, we need to understand how it works.

First, take a few minutes to explore the COBOL files in the repository, you will find them in the `src/cobol` directory.

> [!NOTE]
> COBOL is a legacy language that was widely used in the 1960s and 1970s for business applications. It has a very different syntax and structure compared to modern programming languages.
>
> You may not be familiar with COBOL, but don't worry! GitHub Copilot can help you understand the code and its purpose.

Let's use GitHub Copilot to help us understand the COBOL code!

1. Open up Copilot Chat window in the sidebar and select **Agent** Mode. You will use it for the rest of the exercise.
1. Click **Add Context...** in the Copilot Chat sidebar, select **Files & Folders** then select the `src/` directory. This will put the COBOL files in the prompt context so Copilot will be sure what files you are referring to in the following prompt.

1. Let's Ask Copilot in Agent mode to:
   - Explain the purpose of each file in the context of the school's accounting system
   - Create a `docs/README.md` file and document it's findings, especially the key functions and business requirements

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Create a README.md file in a new /docs directory
   >
   > Document the purpose of each COBOL file, key functions,
   > and any specific business rules related to student accounts.
   > ```

   > [!TIP]
   > Creating good prompts is a combination of proper context, clarity and specificity. Learn more about [Prompt Engineering](https://docs.github.com/en/copilot/concepts/prompt-engineering-for-copilot-chat).

<details>
<summary>Having trouble? 🤷</summary><br/>

- COBOL is a column-sensitive language. The code is organized in divisions (IDENTIFICATION, DATA, PROCEDURE) and sections.
- The `main.cob` file handles the user interface and menu options (view student balance, process payment, record purchase, exit)
- The `operations.cob` file contains the logic for different student account operations
- The `data.cob` file manages the storage of student account balances

</details>

### ⌨️ Activity: Create a data flow diagram

Now that you have a better understanding of the school's accounting system, let's visualize how data flows through it. We can use that later as context for Copilot to help us modernize the code.

> [!NOTE]
> Notice how we are breaking down the task into smaller steps.
>
> You will find that Copilot is more effective when you provide it with specific smaller tasks rather than trying to do everything at once, e.g `Hey Copilot, refactor this COBOL codebase to Node.js`.
>
> This is especially true when working on large codebase modernizations and context window limitations come into play.

Let's visualize the data flow with a diagram!

1. Ask Copilot to Create a Mermaid data flow diagram (DFD) that illustrates how data moves through the school's accounting system.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Create a sequence diagram of the app
   > showing the data flow of the app.
   >
   > Please create this in mermaid format so that I can render this at
   > the end of the docs/README.md markdown file.
   > ```

1. Make sure you can preview the diagram in the `docs/README.md` file.

1. In the left sidebar, select the `Source Control` tab and make sure you are making changes on `modernize-legacy-code`branch.

   > [!TIP]
   > Opening a file from the source control area will show the differences to the original rather than simply opening it.

1. Find the `docs/README.md` file and press the `+` sign to collect your changes together in the staging area.

1. Above the list of staged changes, find the **Message** text box, but **don't enter anything** for now.

   - Typically, you would write a short description of the changes here, but now we have Copilot to help out!

1. To the right of the **Message** text box, find and click the **Generate Commit Message with Copilot** button (sparkles icon).

1. Press the **Commit** button and **Sync Changes** button to push your changes to the `modernize-legacy-code`branch on GitHub.

1. Wait a moment for Mona to check your work, provide feedback, and share the next lesson.

<details>
<summary>Having trouble? 🤷</summary><br/>

If you don't get feedback, here are some things to check:

- Make sure your pushed the `docs/README.md` file changes to the branch `modernize-legacy-code`.

</details>
