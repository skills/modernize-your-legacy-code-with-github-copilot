/**
 * Unit tests for the Accounting System
 * Tests validate that the Node.js application preserves the original COBOL logic
 * These tests mirror the scenarios in docs/TESTPLAN.md
 */

const { DataStore, AccountOperations } = require('./index.js');

describe('Accounting System Tests', () => {
  
  let consoleSpy;
  
  beforeEach(() => {
    // Reset balance before each test
    DataStore.balance = 1000.00;
    // Suppress console output during tests for cleaner output
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  describe('DataStore - Core Storage', () => {
    
    test('should initialize with balance of 1000.00', () => {
      const balance = DataStore.read();
      expect(balance).toBe(1000.00);
    });
    
    test('should write and read balance correctly', () => {
      DataStore.write(2500.50);
      const balance = DataStore.read();
      expect(balance).toBe(2500.50);
    });
  });
  
  describe('Account Operations - View Balance (TC_001, TC_002)', () => {
    
    test('TC_001: viewBalance should display current balance', () => {
      AccountOperations.viewBalance();
      expect(consoleSpy).toHaveBeenCalledWith('Current balance: $1000.00');
    });
    
    test('TC_002: balance reflects previous transactions', () => {
      DataStore.write(975.00);
      AccountOperations.viewBalance();
      expect(consoleSpy).toHaveBeenCalledWith('Current balance: $975.00');
    });
  });
  
  describe('Account Operations - Credit (TC_003, TC_004, TC_005)', () => {
    
    test('TC_003: should increase balance when crediting valid amount', () => {
      AccountOperations.creditAccount('50');
      
      expect(DataStore.read()).toBe(1050.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1050.00');
    });
    
    test('TC_004: should handle large credit amounts', () => {
      AccountOperations.creditAccount('999999.99');
      
      expect(DataStore.read()).toBeCloseTo(1000999.99, 2);
    });
    
    test('TC_005: should credit with decimal precision', () => {
      AccountOperations.creditAccount('25.75');
      
      expect(DataStore.read()).toBeCloseTo(1025.75, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1025.75');
    });
    
    test('should handle invalid credit amount', () => {
      AccountOperations.creditAccount('invalid');
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Account Operations - Debit (TC_006, TC_007, TC_008, TC_009, TC_010)', () => {
    
    test('TC_006: should decrease balance when debiting valid amount', () => {
      AccountOperations.debitAccount('75');
      
      expect(DataStore.read()).toBe(925.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $925.00');
    });
    
    test('TC_007: should allow debit of exact balance', () => {
      DataStore.write(975.00);
      AccountOperations.debitAccount('975');
      
      expect(DataStore.read()).toBe(0.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $0.00');
    });
    
    test('TC_008 (CRITICAL): should prevent debit with insufficient funds', () => {
      AccountOperations.debitAccount('2000');
      
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_009: should reject debit exceeding balance by $0.01', () => {
      DataStore.write(100.00);
      AccountOperations.debitAccount('100.01');
      
      expect(DataStore.read()).toBe(100.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_010: should maintain decimal precision in debit operations', () => {
      DataStore.write(500.50);
      AccountOperations.debitAccount('123.45');
      
      expect(DataStore.read()).toBeCloseTo(377.05, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $377.05');
    });
    
    test('should handle invalid debit amount', () => {
      AccountOperations.debitAccount('invalid');
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
    
    test('should handle negative debit amount', () => {
      AccountOperations.debitAccount('-100');
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Business Logic Scenarios (TC_011)', () => {
    
    test('TC_011: sequential operations - credit and debit maintain data persistence', () => {
      DataStore.write(1000.00);
      
      AccountOperations.creditAccount('200');
      expect(DataStore.read()).toBe(1200.00);
      
      AccountOperations.debitAccount('50');
      expect(DataStore.read()).toBe(1150.00);
    });
    
    test('should handle multiple credits', () => {
      DataStore.write(1000.00);
      
      AccountOperations.creditAccount('100');
      expect(DataStore.read()).toBe(1100.00);
      
      AccountOperations.creditAccount('50');
      expect(DataStore.read()).toBe(1150.00);
    });
  });
  
  describe('Critical Business Rules Validation', () => {
    
    test('Rule 1: Overdraft Protection must be enforced', () => {
      DataStore.write(500.00);
      AccountOperations.debitAccount('600');
      
      expect(DataStore.read()).toBe(500.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('Rule 2: Decimal precision must be maintained', () => {
      AccountOperations.creditAccount('123.45');
      const balance = DataStore.read();
      
      expect(balance).toBeCloseTo(1123.45, 2);
      expect(balance.toString()).toMatch(/\.\d{2}$/);
    });
    
    test('Rule 3: Data consistency across operations', () => {
      DataStore.write(1000.00);
      
      AccountOperations.creditAccount('50');
      const balanceAfterCredit = DataStore.read();
      
      AccountOperations.debitAccount('75');
      const finalBalance = DataStore.read();
      
      expect(finalBalance).toBeCloseTo(balanceAfterCredit - 75, 2);
    });
  });
});
