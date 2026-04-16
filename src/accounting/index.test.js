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
    AccountOperations.promptFunction = mockPrompt;
    // Suppress console output during tests for cleaner output
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
    AccountOperations.promptFunction = null;
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
      mockPrompt.mockReturnValueOnce('50');
      AccountOperations.creditAccount();
      
      expect(DataStore.read()).toBe(1050.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1050.00');
    });
    
    test('TC_004: should handle large credit amounts', () => {
      mockPrompt.mockReturnValueOnce('999999.99');
      AccountOperations.creditAccount();
      
      expect(DataStore.read()).toBeCloseTo(1000999.99, 2);
    });
    
    test('TC_005: should credit with decimal precision', () => {
      mockPrompt.mockReturnValueOnce('25.75');
      AccountOperations.creditAccount();
      
      expect(DataStore.read()).toBeCloseTo(1025.75, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1025.75');
    });
    
    test('should handle invalid credit amount', () => {
      mockPrompt.mockReturnValueOnce('invalid');
      AccountOperations.creditAccount();
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Account Operations - Debit (TC_006, TC_007, TC_008, TC_009, TC_010)', () => {
    
    test('TC_006: should decrease balance when debiting valid amount', () => {
      mockPrompt.mockReturnValueOnce('75');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBe(925.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $925.00');
    });
    
    test('TC_007: should allow debit of exact balance', () => {
      DataStore.write(975.00);
      mockPrompt.mockReturnValueOnce('975');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBe(0.00);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $0.00');
    });
    
    test('TC_008 (CRITICAL): should prevent debit with insufficient funds', () => {
      mockPrompt.mockReturnValueOnce('2000');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_009: should reject debit exceeding balance by $0.01', () => {
      DataStore.write(100.00);
      mockPrompt.mockReturnValueOnce('100.01');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBe(100.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('TC_010: should maintain decimal precision in debit operations', () => {
      DataStore.write(500.50);
      mockPrompt.mockReturnValueOnce('123.45');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBeCloseTo(377.05, 2);
      expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $377.05');
    });
    
    test('should handle invalid debit amount', () => {
      mockPrompt.mockReturnValueOnce('invalid');
      AccountOperations.debitAccount();
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
    
    test('should handle negative debit amount', () => {
      mockPrompt.mockReturnValueOnce('-100');
      AccountOperations.debitAccount();
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid amount entered.');
      expect(DataStore.read()).toBe(1000.00); // Balance unchanged
    });
  });
  
  describe('Business Logic Scenarios (TC_011)', () => {
    
    test('TC_011: sequential operations - credit and debit maintain data persistence', () => {
      DataStore.write(1000.00);
      
      mockPrompt.mockReturnValueOnce('200');
      AccountOperations.creditAccount();
      expect(DataStore.read()).toBe(1200.00);
      
      mockPrompt.mockReturnValueOnce('50');
      AccountOperations.debitAccount();
      expect(DataStore.read()).toBe(1150.00);
    });
    
    test('should handle multiple credits', () => {
      DataStore.write(1000.00);
      mockPrompt.mockReturnValueOnce('100');
      AccountOperations.creditAccount();
      expect(DataStore.read()).toBe(1100.00);
      
      mockPrompt.mockReturnValueOnce('50');
      AccountOperations.creditAccount();
      expect(DataStore.read()).toBe(1150.00);
    });
  });
  
  describe('Critical Business Rules Validation', () => {
    
    test('Rule 1: Overdraft Protection must be enforced', () => {
      DataStore.write(500.00);
      mockPrompt.mockReturnValueOnce('600');
      AccountOperations.debitAccount();
      
      expect(DataStore.read()).toBe(500.00);
      expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
    });
    
    test('Rule 2: Decimal precision must be maintained', () => {
      mockPrompt.mockReturnValueOnce('123.45');
      AccountOperations.creditAccount();
      const balance = DataStore.read();
      
      expect(balance).toBeCloseTo(1123.45, 2);
      expect(balance.toString()).toMatch(/\.\d{2}$/);
    });
    
    test('Rule 3: Data consistency across operations', () => {
      DataStore.write(1000.00);
      
      mockPrompt.mockReturnValueOnce('50');
      AccountOperations.creditAccount();
      const balanceAfterCredit = DataStore.read();
      
      mockPrompt.mockReturnValueOnce('75');
      AccountOperations.debitAccount();
      const finalBalance = DataStore.read();
      
      expect(finalBalance).toBeCloseTo(balanceAfterCredit - 75, 2);
    });
  });
});
