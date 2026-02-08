## Step 1: Help me modernize my application GitHub Copilot

Welcome to Mergington High School's IT team! You've joined at a critical time. The school has been using the same COBOL-based accounting system since the early 1990s to manage student fees, cafeteria accounts, and school supplies purchases. The original programmer retired years ago, and the current IT staff struggles to maintain the system whenever changes are needed. There is a desire to update the application to a more modern progamming languate and Node.js seems to fit this requirement.

<img width="60%" height="60%" alt="Cobol to Node.js" src="https://github.com/user-attachments/assets/fd51f198-16c3-4cb9-9fbc-bc1a2587a4c4" />

### 📖 Theory: Educational Legacy Systems Modernization

> [!NOTE]
> Legacy code modernization in educational settings means transforming outdated systems into modern technologies while preserving essential school business operations and data integrity.

Many educational institutions still rely on legacy COBOL systems for critical administrative functions. While these systems have reliably managed school finances for decades, they now present significant challenges:

- ❗ Skill Shortage – Fewer developers today know COBOL, making maintenance difficult and expensive.
- ❗ Integration Issues – Legacy systems struggle to interface with modern platforms, APIs, and cloud services.
- ❗ High Maintenance Costs – Old systems and inefficient processes drive up the cost of running and supporting legacy systems
- ❗ Lack of Agility – Legacy systems are rigid, making it hard to adapt to new business needs or market changes quickly.
- ❗ Security Risks – Outdated codebases may lack modern security features, leaving systems vulnerable.

#### Benefits of Modernizing Legacy Systems

- ✅ Improved Agility – Easier to adapt and scale with changing business and technology needs.
- ✅ Cost Efficiency – Modern systems are typically more efficient and require less manual intervention.
- ✅ Better Integration – Seamless connection with modern tools, APIs, and third-party services.
- ✅ Enhanced Security – Up-to-date security protocols and compliance with modern standards.
- ✅ Access to Talent – Easier to hire developers familiar with modern languages and tools.

However, companies are often afraid of the initial steps to modernizing their legacy systems.

GitHub Copilot can help breach that feat and transform this modernization process by:

1. Helping decipher the decades-old COBOL code that lacks documentation.
1. Assisting with test creation to ensure business logic remains intact.
1. Translating COBOL structures to modern Node.js equivalents.
1. Testing the new code to ensure it meets the original system's requirements.

### ⌨️ Activity: Setting Up Your Environment

To get started, we will set up a GitHub Codespace with the necessary tools and extensions to use GitHub Copilot effectively.

> [!TIP]
> You can learn more about current and upcoming features in the [GitHub Copilot Features](https://docs.github.com/en/copilot/about-github-copilot/github-copilot-features) documentation.

1. Right-click the below button to open the **Create Codespace** page in a new tab. Use the default configuration.

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

1. Confirm the **Repository** field is your copy of the exercise, not the original, then click the green **Create Codespace** button.
   - ✅ Your copy: `/{{full_repo_name}}`
   - ❌ Original: `/skills/modernize-your-legacy-code-with-github-copilot`

1. Wait a moment for Visual Studio Code to load in your browser.

1. In the left sidebar, click the extensions tab and verify that the `GitHub Copilot` and `Cobol` extensions are installed and enabled.

   <img width="350" alt="copilot extension for VS Code" src="https://github.com/user-attachments/assets/d840806d-4d9d-4059-a198-c8dd8079f8de" />

   <img width="345" alt="cobol extension for VS Code" src="https://github.com/user-attachments/assets/106a7164-c504-4f14-84d1-4439bd8a15e2" />


1. At the top of VS Code, locate and click the **Copilot icon** to open a Copilot Chat panel.

   <img width="150" alt="Copilot chat icon in VS Code" src="https://github.com/user-attachments/assets/128e3670-64a7-431a-945e-a57a7b23ba6b" />

1. If this is your first time using GitHub Copilot, you will need to accept the usage terms to continue.

<details>
<summary>Having trouble? 🤷</summary><br/>

- If you don't see the Copilot icon, make sure you have the GitHub Copilot extension installed and enabled.
- If you don't see the Copilot chat panel or have other issues with it, try reloading the codespace with `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac) and selecting **Developer: Reload Window**.

</details>

### :keyboard: Activity: Use Copilot to help remember a terminal command 🙋

Great work! Now that we have our working environment set up, let's ask copilot for help starting a branch so we can do some refactoring in the next steps!

1. In the bottom panel, select the **Terminal** tab.

1. Within the new terminal window use the keyboard shortcut `Ctrl + I` (windows) or `Cmd + I` (mac) to bring up **Copilot's Terminal Inline Chat**.

1. Let's ask Copilot to help us remember a command we have forgotten: creating a branch and publishing it.

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Hey copilot, how can I create and publish a new git branch
   > called modernize-legacy-code?
   > ```

   <details>
   <summary>Having trouble? 🤷</summary><br/>

   Remember, you are supposed to use **Copilot's Terminal Inline Chat** NOT the Copilot Chat panel.

   The Terminal Inline Chat is specifically designed to help with terminal commands.

   Copilot should respond with a command similar to the one below.

   ```shell
   git checkout -b modernize-legacy-code
   git push -u origin modernize-legacy-code
   ```

   </details>

1. Now that we are happy with the command, press the `Run` button to let Copilot run it for us. No need to copy and paste!

1. Now that your branch is pushed to GitHub, Mona should already be busy checking your work. Give her a moment and keep watch in the comments. You will see her respond with progress info and the next lesson.

<details>
<summary>Having trouble? 🤷</summary><br/>

If you don't get feedback, here are some things to check:

- Make sure you created the branch with the **exact name** `modernize-legacy-code`. No prefixes or suffixes.
- Make sure the branch was indeed pushed to your repository. That will trigger the next step.
- If Copilot doesn't understand your command, try rephrasing it or providing more context.

</details>
