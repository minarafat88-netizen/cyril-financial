export type LoanPurpose = 'Purchase' | 'Refinance' | 'Jumbo' | 'BankStatement' | 'DSCR' | 'VA' | 'FHA';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'LOAN_OFFICER' | 'PROCESSOR' | 'CLIENT';
  nmlsId?: string;
  phone?: string;
  createdAt: string;
}

export interface MortgageLeadPayload {
  loanPurpose: LoanPurpose;
  propertyType: string;
  purchasePrice: number;
  downPayment: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyZip: string;
  estimatedCreditScore?: string;
  annualIncome?: number;
}

export interface LoanRateItem {
  id: string;
  programName: string;
  rate: number;
  apr: number;
  lockDays: number;
  updatedAt: string;
}