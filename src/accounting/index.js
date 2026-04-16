/**
 * Accounting System - Modernized from COBOL to Node.js
 * 
 * This application provides account management functionality:
 * - View current account balance
 * - Credit (add) funds to account
 * - Debit (subtract) funds from account
 */

const readline = require('readline');

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
  static viewBalance() {
    const balance = DataStore.read();
    console.log(`Current balance: $${balance.toFixed(2)}`);
  }
  
  static creditAccount(amountStr) {
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
  
  static debitAccount(amountStr) {
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
function main(rl) {
  const displayMenu = () => {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  };
  
  const processChoice = (choice) => {
    switch (choice.trim()) {
      case '1':
        AccountOperations.viewBalance();
        displayMenu();
        rl.question('Enter your choice (1-4): ', processChoice);
        break;
      case '2':
        rl.question('Enter credit amount: ', (amount) => {
          AccountOperations.creditAccount(amount);
          displayMenu();
          rl.question('Enter your choice (1-4): ', processChoice);
        });
        break;
      case '3':
        rl.question('Enter debit amount: ', (amount) => {
          AccountOperations.debitAccount(amount);
          displayMenu();
          rl.question('Enter your choice (1-4): ', processChoice);
        });
        break;
      case '4':
        console.log('Exiting the program. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        displayMenu();
        rl.question('Enter your choice (1-4): ', processChoice);
    }
  };
  
  displayMenu();
  rl.question('Enter your choice (1-4): ', processChoice);
}

// Export for testing purposes
module.exports = { DataStore, AccountOperations, main };

// Run the application only if this is the main module being executed
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  main(rl);
}
