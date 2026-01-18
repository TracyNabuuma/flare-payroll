-- Blockchain Payroll Payment System Schema
--
-- Overview:
-- Complete schema for a blockchain-based payroll system using Proofrails on Flare Network
-- with ISO 20022 compliance, multi-currency support, and comprehensive audit trails.
--
-- New Tables:
-- 1. employees - Employee profiles and onboarding
-- 2. payroll_configurations - Salary and deduction settings
-- 3. bonuses_benefits - Bonuses, benefits, and allowances
-- 4. payroll_runs - Pay period runs
-- 5. payroll_items - Individual employee payroll calculations
-- 6. payment_transactions - Blockchain payment records
-- 7. iso20022_receipts - ISO 20022 compliant receipts from Proofrails
-- 8. audit_logs - Comprehensive audit trail
-- 9. treasury_accounts - Company treasury wallets
-- 10. fx_rates - Foreign exchange rates for cross-border payments
-- 11. user_roles - User role and permission management
--
-- Security:
-- - RLS enabled on all tables
-- - Role-based access control policies
-- - Employees can only view their own data
-- - HR managers can manage employees and payroll
-- - Auditors have read-only access
-- - Treasury manages accounts and transactions

-- 1. Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  department text NOT NULL,
  position text NOT NULL,
  blockchain_wallet text,
  country text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Payroll configurations table
CREATE TABLE IF NOT EXISTS payroll_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  base_salary decimal(15, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  payment_frequency text NOT NULL DEFAULT 'monthly',
  tax_rate decimal(5, 2) NOT NULL DEFAULT 0,
  social_security_rate decimal(5, 2) NOT NULL DEFAULT 0,
  health_insurance decimal(10, 2) NOT NULL DEFAULT 0,
  retirement_contribution decimal(5, 2) NOT NULL DEFAULT 0,
  effective_from date NOT NULL,
  effective_to date,
  created_at timestamptz DEFAULT now()
);

-- 3. Bonuses and benefits table
CREATE TABLE IF NOT EXISTS bonuses_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  type text NOT NULL,
  category text NOT NULL,
  amount decimal(15, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  payment_date date NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  description text,
  created_at timestamptz DEFAULT now()
);

-- 4. Payroll runs table
CREATE TABLE IF NOT EXISTS payroll_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id text UNIQUE NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  payment_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  total_gross decimal(15, 2) DEFAULT 0,
  total_deductions decimal(15, 2) DEFAULT 0,
  total_net decimal(15, 2) DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  created_by uuid,
  approved_by uuid,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- 5. Payroll items table
CREATE TABLE IF NOT EXISTS payroll_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id uuid REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  base_salary decimal(15, 2) NOT NULL DEFAULT 0,
  bonuses decimal(15, 2) NOT NULL DEFAULT 0,
  benefits decimal(15, 2) NOT NULL DEFAULT 0,
  gross_pay decimal(15, 2) NOT NULL DEFAULT 0,
  tax_deduction decimal(15, 2) NOT NULL DEFAULT 0,
  social_security decimal(15, 2) NOT NULL DEFAULT 0,
  health_insurance decimal(15, 2) NOT NULL DEFAULT 0,
  retirement decimal(15, 2) NOT NULL DEFAULT 0,
  other_deductions decimal(15, 2) NOT NULL DEFAULT 0,
  total_deductions decimal(15, 2) NOT NULL DEFAULT 0,
  net_pay decimal(15, 2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  created_at timestamptz DEFAULT now()
);

-- 6. Payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_hash text UNIQUE,
  payroll_item_id uuid REFERENCES payroll_items(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  from_address text NOT NULL,
  to_address text NOT NULL,
  amount decimal(15, 2) NOT NULL,
  currency text NOT NULL,
  original_amount decimal(15, 2),
  original_currency text,
  fx_rate decimal(10, 6),
  network text NOT NULL DEFAULT 'flare',
  status text NOT NULL DEFAULT 'pending',
  block_number bigint,
  gas_fee decimal(15, 8),
  confirmation_count integer DEFAULT 0,
  initiated_at timestamptz DEFAULT now(),
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 7. ISO 20022 receipts table
CREATE TABLE IF NOT EXISTS iso20022_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id text UNIQUE NOT NULL,
  transaction_id uuid REFERENCES payment_transactions(id) ON DELETE CASCADE,
  proofrails_id text NOT NULL,
  message_type text NOT NULL,
  receipt_data jsonb NOT NULL,
  debtor_name text NOT NULL,
  debtor_account text NOT NULL,
  creditor_name text NOT NULL,
  creditor_account text NOT NULL,
  amount decimal(15, 2) NOT NULL,
  currency text NOT NULL,
  value_date date NOT NULL,
  settlement_method text NOT NULL,
  verification_status text NOT NULL DEFAULT 'pending',
  verification_timestamp timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 8. Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  action text NOT NULL,
  actor_id uuid,
  actor_role text NOT NULL,
  changes jsonb,
  ip_address text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- 9. Treasury accounts table
CREATE TABLE IF NOT EXISTS treasury_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_name text NOT NULL,
  blockchain_address text UNIQUE NOT NULL,
  currency text NOT NULL,
  balance decimal(15, 2) NOT NULL DEFAULT 0,
  network text NOT NULL DEFAULT 'flare',
  account_type text NOT NULL,
  last_reconciled timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. FX rates table
CREATE TABLE IF NOT EXISTS fx_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  rate decimal(15, 6) NOT NULL,
  source text NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_to timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 11. User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text UNIQUE NOT NULL,
  role text NOT NULL,
  employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  permissions jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonuses_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE iso20022_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE treasury_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fx_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employees table
CREATE POLICY "Employees can view own profile"
  ON employees FOR SELECT
  TO authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "HR managers can view all employees"
  ON employees FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'auditor', 'treasury')
    )
  );

CREATE POLICY "HR managers can insert employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

CREATE POLICY "HR managers can update employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

-- RLS Policies for payroll_configurations table
CREATE POLICY "Employees can view own payroll config"
  ON payroll_configurations FOR SELECT
  TO authenticated
  USING (
    employee_id IN (
      SELECT id FROM employees
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "HR and Treasury can view all payroll configs"
  ON payroll_configurations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "HR managers can manage payroll configs"
  ON payroll_configurations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

-- RLS Policies for bonuses_benefits table
CREATE POLICY "Employees can view own bonuses"
  ON bonuses_benefits FOR SELECT
  TO authenticated
  USING (
    employee_id IN (
      SELECT id FROM employees
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "HR and Treasury can view all bonuses"
  ON bonuses_benefits FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "HR managers can manage bonuses"
  ON bonuses_benefits FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

-- RLS Policies for payroll_runs table
CREATE POLICY "Staff can view payroll runs"
  ON payroll_runs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "HR managers can manage payroll runs"
  ON payroll_runs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

-- RLS Policies for payroll_items table
CREATE POLICY "Employees can view own payroll items"
  ON payroll_items FOR SELECT
  TO authenticated
  USING (
    employee_id IN (
      SELECT id FROM employees
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Staff can view all payroll items"
  ON payroll_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "HR managers can manage payroll items"
  ON payroll_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin')
    )
  );

-- RLS Policies for payment_transactions table
CREATE POLICY "Employees can view own transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (
    employee_id IN (
      SELECT id FROM employees
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Staff can view all transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "Treasury can manage transactions"
  ON payment_transactions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('treasury', 'admin')
    )
  );

-- RLS Policies for iso20022_receipts table
CREATE POLICY "Employees can view own receipts"
  ON iso20022_receipts FOR SELECT
  TO authenticated
  USING (
    transaction_id IN (
      SELECT id FROM payment_transactions
      WHERE employee_id IN (
        SELECT id FROM employees
        WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      )
    )
  );

CREATE POLICY "Staff can view all receipts"
  ON iso20022_receipts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('hr_manager', 'admin', 'treasury', 'auditor')
    )
  );

CREATE POLICY "Treasury can manage receipts"
  ON iso20022_receipts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('treasury', 'admin')
    )
  );

-- RLS Policies for audit_logs table
CREATE POLICY "Auditors and admins can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('admin', 'auditor')
    )
  );

CREATE POLICY "All authenticated users can create audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for treasury_accounts table
CREATE POLICY "Treasury can view all accounts"
  ON treasury_accounts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('treasury', 'admin', 'auditor')
    )
  );

CREATE POLICY "Treasury can manage accounts"
  ON treasury_accounts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('treasury', 'admin')
    )
  );

-- RLS Policies for fx_rates table
CREATE POLICY "All authenticated users can view FX rates"
  ON fx_rates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Treasury can manage FX rates"
  ON fx_rates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role IN ('treasury', 'admin')
    )
  );

-- RLS Policies for user_roles table
CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admins can view all roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_email = current_setting('request.jwt.claims', true)::json->>'email'
      AND role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_payroll_configs_employee ON payroll_configurations(employee_id);
CREATE INDEX IF NOT EXISTS idx_bonuses_employee ON bonuses_benefits(employee_id);
CREATE INDEX IF NOT EXISTS idx_bonuses_status ON bonuses_benefits(status);
CREATE INDEX IF NOT EXISTS idx_payroll_runs_status ON payroll_runs(status);
CREATE INDEX IF NOT EXISTS idx_payroll_items_run ON payroll_items(payroll_run_id);
CREATE INDEX IF NOT EXISTS idx_payroll_items_employee ON payroll_items(employee_id);
CREATE INDEX IF NOT EXISTS idx_transactions_employee ON payment_transactions(employee_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_receipts_transaction ON iso20022_receipts(transaction_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_fx_rates_currencies ON fx_rates(from_currency, to_currency);
CREATE INDEX IF NOT EXISTS idx_user_roles_email ON user_roles(user_email);
