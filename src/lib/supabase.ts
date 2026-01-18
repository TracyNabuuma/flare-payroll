import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Employee = {
  id: string;
  employee_id: string;
  email: string;
  first_name: string;
  last_name: string;
  department: string;
  position: string;
  blockchain_wallet: string | null;
  country: string;
  status: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type PayrollConfiguration = {
  id: string;
  employee_id: string;
  base_salary: number;
  currency: string;
  payment_frequency: string;
  tax_rate: number;
  social_security_rate: number;
  health_insurance: number;
  retirement_contribution: number;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
};

export type PayrollRun = {
  id: string;
  run_id: string;
  period_start: string;
  period_end: string;
  payment_date: string;
  status: string;
  total_gross: number;
  total_deductions: number;
  total_net: number;
  currency: string;
  created_by: string | null;
  approved_by: string | null;
  created_at: string;
  completed_at: string | null;
};

export type PayrollItem = {
  id: string;
  payroll_run_id: string;
  employee_id: string;
  base_salary: number;
  bonuses: number;
  benefits: number;
  gross_pay: number;
  tax_deduction: number;
  social_security: number;
  health_insurance: number;
  retirement: number;
  other_deductions: number;
  total_deductions: number;
  net_pay: number;
  currency: string;
  created_at: string;
};

export type PaymentTransaction = {
  id: string;
  transaction_hash: string | null;
  payroll_item_id: string;
  employee_id: string;
  from_address: string;
  to_address: string;
  amount: number;
  currency: string;
  original_amount: number | null;
  original_currency: string | null;
  fx_rate: number | null;
  network: string;
  status: string;
  block_number: number | null;
  gas_fee: number | null;
  confirmation_count: number;
  initiated_at: string;
  confirmed_at: string | null;
  created_at: string;
};

export type ISO20022Receipt = {
  id: string;
  receipt_id: string;
  transaction_id: string;
  proofrails_id: string;
  message_type: string;
  receipt_data: any;
  debtor_name: string;
  debtor_account: string;
  creditor_name: string;
  creditor_account: string;
  amount: number;
  currency: string;
  value_date: string;
  settlement_method: string;
  verification_status: string;
  verification_timestamp: string | null;
  created_at: string;
};

export type TreasuryAccount = {
  id: string;
  account_name: string;
  blockchain_address: string;
  currency: string;
  balance: number;
  network: string;
  account_type: string;
  last_reconciled: string | null;
  created_at: string;
  updated_at: string;
};

export type AuditLog = {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  actor_id: string | null;
  actor_role: string;
  changes: any;
  ip_address: string | null;
  metadata: any;
  created_at: string;
};
