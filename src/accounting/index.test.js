/**
 * Unit tests for the Accounting System
 * Tests validate that the Node.js application preserves the original COBOL logic
 * These tests mirror the scenarios in docs/TESTPLAN.md
 */

const { DataStore, AccountOperations } = require('./index.js');

describe('Accounting System Tests', () => {
  
  let consoleSpy;
  let mockPrompt;
  
  beforeEach(() => {
    // Reset balance before each test
    DataStore.balance = 1000.00;
    // Create mock prompt function
    mockPrompt = jest.fn();
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
    
    test('TC_003: should increase balance when crediting valid amount', async () => {
      const mockPromptFn = (question, callback) => callback('50');
      await AccountOperations.creditAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(1050.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1050.00');
    });
    
    test('TC_004: should handle large credit amounts', async () => {
      const mockPromptFn = (question, callback) => callback('999999.99');
      await AccountOperations.creditAccount(mockPromptFn);
      
      expect(DataStore.read()).toBeCloseTo(1000999.99, 2);
    });
    
    test('TC_005: should credit with decimal precision', async () => {
      const mockPromptFn = (question, callback) => callback('25.75');
      await AccountOperations.creditAccount(mockPromptFn);
      
      expect(DataStore.read()).toBeCloseTo(1025.75, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1025.75');
    });
    
    test('should handle invalid credit amount', async () => {
      const mockPromptFn = (question, callback) => callback('invalid');
      await AccountOperations.creditAccount(mockPromptFn);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Account Operations - Debit (TC_006, TC_007, TC_008, TC_009, TC_010)', () => {
    
    test('TC_006: should decrease balance when debiting valid amount', async () => {
      const mockPromptFn = (question, callback) => callback('75');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(925.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $925.00');
    });
    
    test('TC_007: should allow debit of exact balance', async () => {
      DataStore.write(975.00);
      const mockPromptFn = (question, callback) => callback('975');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(0.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $0.00');
    });
    
    test('TC_008 (CRITICAL): should prevent debit with insufficient funds', async () => {
      const mockPromptFn = (question, callback) => callback('2000');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_009: should reject debit exceeding balance by $0.01', async () => {
      DataStore.write(100.00);
      const mockPromptFn = (question, callback) => callback('100.01');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(100.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_010: should maintain decimal precision in debit operations', async () => {
      DataStore.write(500.50);
      const mockPromptFn = (question, callback) => callback('123.45');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBeCloseTo(377.05, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $377.05');
    });
    
    test('should handle invalid debit amount', async () => {
      const mockPromptFn = (question, callback) => callback('invalid');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
    
    test('should handle negative debit amount', async () => {
      const mockPromptFn = (question, callback) => callback('-100');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Business Logic Scenarios (TC_011)', () => {
    
    test('TC_011: sequential operations - credit and debit maintain data persistence', async () => {
      DataStore.write(1000.00);
      
      const mockPromptFn1 = (question, callback) => callback('200');
      await AccountOperations.creditAccount(mockPromptFn1);
      expect(DataStore.read()).toBe(1200.00);
      
      const mockPromptFn2 = (question, callback) => callback('50');
      await AccountOperations.debitAccount(mockPromptFn2);
      expect(DataStore.read()).toBe(1150.00);
    });
    
    test('should handle multiple credits', async () => {
      DataStore.write(1000.00);
      
      const mockPromptFn1 = (question, callback) => callback('100');
      await AccountOperations.creditAccount(mockPromptFn1);
      expect(DataStore.read()).toBe(1100.00);
      
      const mockPromptFn2 = (question, callback) => callback('50');
      await AccountOperations.creditAccount(mockPromptFn2);
      expect(DataStore.read()).toBe(1150.00);
    });
  });
  
  describe('Critical Business Rules Validation', () => {
    
    test('Rule 1: Overdraft Protection must be enforced', async () => {
      DataStore.write(500.00);
      const mockPromptFn = (question, callback) => callback('600');
      await AccountOperations.debitAccount(mockPromptFn);
      
      expect(DataStore.read()).toBe(500.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('Rule 2: Decimal precision must be maintained', async () => {
      const mockPromptFn = (question, callback) => callback('123.45');
      await AccountOperations.creditAccount(mockPromptFn);
      const balance = DataStore.read();
      
      expect(balance).toBeCloseTo(1123.45, 2);
      expect(balance.toString()).toMatch(/\.\d{2}$/);
    });
    
    test('Rule 3: Data consistency across operations', async () => {
      DataStore.write(1000.00);
      
      const mockPromptFn1 = (question, callback) => callback('50');
      await AccountOperations.creditAccount(mockPromptFn1);
      const balanceAfterCredit = DataStore.read();
      
      const mockPromptFn2 = (question, callback) => callback('75');
      await AccountOperations.debitAccount(mockPromptFn2);
      const finalBalance = DataStore.read();
      
      expect(finalBalance).toBeCloseTo(balanceAfterCredit - 75, 2);
    });
  });
});
