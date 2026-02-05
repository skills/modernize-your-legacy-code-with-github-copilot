---
agent: 'agent'
model: gpt-4.1
description: 'Compile and run the Cobol accounting system'
---

I want you to compile and run the COBOL application.

Follow these steps:

1. Compile the COBOL application from the project root:

   ```bash
   cobc -x src/cobol/main.cob src/cobol/operations.cob src/cobol/data.cob -o accountsystem
   ```

1. Run the compiled application with:

   ```bash
   ./accountsystem
   ```
