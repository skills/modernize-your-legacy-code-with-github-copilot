const prompt = require('prompt-sync')({history: false, sigint: true});

console.log('Menu:');
console.log('1. View Balance');
console.log('2. Exit');
const choice = prompt('Enter choice: ');
console.log(`You selected: "${choice}"`);
console.log(`Type of choice: ${typeof choice}`);
console.log(`Choice === "1": ${choice === '1'}`);
console.log(`Choice === 1: ${choice === 1}`);
