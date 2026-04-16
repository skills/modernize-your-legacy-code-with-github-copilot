/**
 * Accounting System - Modernized from COBOL to Node.js
 * 
 * This application provides account management functionality:
 * - View current account balance
 * - Credit (add) funds to account
 * - Debit (subtract) funds from account
 */

// Data storage module (equivalent to DataProgram in COBOL)
const DataStore = {
  balance: 1000.00,
  
  read() {
    return this.balance;
  },
  
  write(newBalance) {
    this.balance = newBalance;
  }
};

// Operations module (equivalent to Operations in COBOL)
class AccountOperations {
  static promptFunction = null; // Injected for testing
  
  static getPrompt() {
    if (this.promptFunction) {
      return this.promptFunction;
    }
    // Default: use global prompt if available
    return typeof global.prompt !== 'undefined' ? global.prompt : null;
  }
  
  static viewBalance() {
    const balance = DataStore.read();
    console.log(`Current balance: $${balance.toFixed(2)}`);
  }
  
  static creditAccount() {
    const promptFn = this.getPrompt();
    const amountStr = promptFn('Enter credit amount: ');
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount entered.');
      return;
    }
    
    let balance = DataStore.read();
    balance += amount;
    DataStore.write(balance);
    console.log(`Amount credited. New balance: $${balance.toFixed(2)}`);
  }
  
  static debitAccount() {
    const promptFn = this.getPrompt();
    const amountStr = promptFn('Enter debit amount: ');
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount) || amount < 0) {
      console.log('Invalid amount entered.');
      return;
    }
    
    let balance = DataStore.read();
    
    if (balance >= amount) {
      balance -= amount;
      DataStore.write(balance);
      console.log(`Amount debited. New balance: $${balance.toFixed(2)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
  }
}

// Main program (equivalent to MainProgram in COBOL)
function main(promptInstance) {
  if (promptInstance) {
    AccountOperations.promptFunction = promptInstance;
  }
  
  let continueProgram = true;
  const promptFn = AccountOperations.getPrompt();
  
  while (continueProgram) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
    
    const choice = promptFn('Enter your choice (1-4): ');
    
    switch (choice) {
      case '1':
        AccountOperations.viewBalance();
        break;
      case '2':
        AccountOperations.creditAccount();
        break;
      case '3':
        AccountOperations.debitAccount();
        break;
      case '4':
        continueProgram = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
  
  console.log('Exiting the program. Goodbye!');
}

// Export for testing purposes
module.exports = { DataStore, AccountOperations, main };

// Run the application only if this is the main module being executed
if (require.main === module) {
  const prompt = require('prompt-sync')({history: false, sigint: true});
  main(prompt);
}
