# FlarePayroll - Blockchain Payroll Payment System

## Overview

FlarePayroll is a comprehensive blockchain-based payroll payment system built on the Flare Network with Proofrails integration for ISO 20022-compliant payment receipts. The system handles employee onboarding, salary calculations, multi-currency payments, and provides complete audit trails for regulatory compliance.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [User Roles and Workflows](#user-roles-and-workflows)
4. [Database Schema](#database-schema)
5. [Core Features](#core-features)
6. [Example Outputs](#example-outputs)
7. [Security and Compliance](#security-and-compliance)
8. [Integration Guide](#integration-guide)

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                          │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   HR Portal  │  │   Employee   │  │   Auditor    │              │
│  │              │  │    Portal    │  │   Dashboard  │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Treasury   │  │   Payroll    │  │   Receipts   │              │
│  │   Dashboard  │  │  Processing  │  │    Viewer    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│                      React 18 + TypeScript + Tailwind CSS           │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                            │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  Business Logic & Services                    │   │
│  │                                                               │   │
│  │  • Employee Management      • Payroll Calculations           │   │
│  │  • Salary Engine            • Deduction Processing           │   │
│  │  • Bonus Management         • Payment Orchestration          │   │
│  │  • FX Rate Management       • Audit Logging                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│                        Supabase Client Library                       │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                 │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Supabase PostgreSQL                        │   │
│  │                                                               │   │
│  │  Tables:                                                      │   │
│  │  • employees                • payroll_configurations         │   │
│  │  • bonuses_benefits         • payroll_runs                   │   │
│  │  • payroll_items            • payment_transactions           │   │
│  │  • iso20022_receipts        • audit_logs                     │   │
│  │  • treasury_accounts        • fx_rates                       │   │
│  │  • user_roles                                                 │   │
│  │                                                               │   │
│  │  Row Level Security (RLS) enabled on all tables              │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                        BLOCKCHAIN LAYER                              │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Flare Network                             │   │
│  │                                                               │   │
│  │  • Smart Contract Payment Execution                          │   │
│  │  • Multi-Currency Support (FLR, USDC, EURC)                  │   │
│  │  • FTSO Price Feeds for FX Rates                             │   │
│  │  • Transaction Confirmation                                   │   │
│  │  • Gas Fee Management                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                    ↕                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                       Proofrails                              │   │
│  │                                                               │   │
│  │  • ISO 20022 Receipt Generation (pacs.008)                   │   │
│  │  • Cryptographic Verification                                │   │
│  │  • Compliance Validation                                     │   │
│  │  • Audit Trail Recording                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    ↕
┌─────────────────────────────────────────────────────────────────────┐
│                        REPORTING LAYER                               │
│                                                                       │
│  • Payslip Generation (PDF, CSV, JSON)                              │
│  • Compliance Reports                                                │
│  • Audit Trail Exports                                               │
│  • Treasury Reconciliation Reports                                   │
│  • Tax Documentation                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
src/
├── components/
│   ├── Navigation.tsx              # Main navigation component
│   ├── EmployeeManagement.tsx      # Employee CRUD operations
│   ├── PayrollProcessing.tsx       # Payroll run management
│   ├── EmployeePortal.tsx          # Employee self-service portal
│   ├── TreasuryDashboard.tsx       # Treasury & wallet management
│   ├── AuditorDashboard.tsx        # Compliance & audit trails
│   ├── PaymentReceipts.tsx         # ISO 20022 receipt listing
│   └── ISO20022Receipt.tsx         # Receipt detail viewer
├── lib/
│   └── supabase.ts                 # Supabase client & types
├── App.tsx                         # Main application component
└── main.tsx                        # Application entry point
```

---

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)

### Backend / Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Row Level Security**: PostgreSQL RLS policies
- **Real-time**: Supabase Realtime (optional)

### Blockchain Integration
- **Network**: Flare Network (Mainnet) / Coston2 (Testnet)
- **SDKs**:
  - `ethers.js` or `web3.js` for Flare Network interaction
  - Flare FTSO SDK for price feeds
- **Standards**:
  - ERC-20 for stablecoin payments (USDC, EURC)
  - Native FLR for gas fees and payments

### Compliance
- **Proofrails**: ISO 20022 message generation and verification
- **Standards**:
  - ISO 20022 pacs.008 (FIToFICustomerCreditTransfer)
  - ISO 20022 pain.001 (CustomerCreditTransferInitiation)

### Middleware / APIs
- **Supabase Edge Functions** (optional):
  - Blockchain transaction processing
  - FX rate updates from FTSO
  - ISO 20022 receipt generation via Proofrails API
  - Payment batch processing

---

## User Roles and Workflows

### 1. HR Manager

**Responsibilities**:
- Employee onboarding and profile management
- Payroll configuration (salary, deductions, bonuses)
- Payroll run creation and approval
- Benefits management

**Workflow: Create Monthly Payroll Run**

```
1. HR Manager logs in
2. Navigate to "Payroll Processing"
3. Click "New Payroll Run"
4. System auto-populates:
   - All active employees
   - Current salary configurations
   - Pending bonuses for the period
5. HR Manager reviews calculations:
   - Base salary
   - Bonuses and benefits
   - Tax deductions (based on country)
   - Social security contributions
   - Health insurance
   - Retirement contributions
6. System calculates:
   - Gross pay = Base + Bonuses + Benefits
   - Total deductions = Tax + SS + Insurance + Retirement
   - Net pay = Gross - Deductions
7. HR Manager saves as "Draft"
8. Review period (corrections if needed)
9. HR Manager approves payroll run
10. Status changes to "Approved" → forwarded to Treasury
11. Audit log entry created
```

**Workflow: Employee Onboarding**

```
1. HR Manager creates new employee profile
2. Enter employee details:
   - Personal info (name, email, employee ID)
   - Department and position
   - Country (for tax compliance)
3. Set up payroll configuration:
   - Base salary and currency
   - Payment frequency (monthly, bi-weekly, weekly)
   - Tax rate based on jurisdiction
   - Social security rate
   - Health insurance deduction
   - Retirement contribution percentage
4. Employee receives onboarding email
5. Employee sets up blockchain wallet
6. Employee adds wallet address to profile
7. HR Manager verifies and completes onboarding
8. Employee status changes to "Active"
```

---

### 2. Treasury Team

**Responsibilities**:
- Wallet management and reconciliation
- Payment execution on blockchain
- FX rate monitoring
- Gas fee optimization
- ISO 20022 receipt verification

**Workflow: Process Approved Payroll**

```
1. Treasury team receives approved payroll run
2. Navigate to "Payments" dashboard
3. Review payment batch:
   - Total amount required
   - Currency breakdown
   - FX conversions needed
4. Check treasury account balances:
   - FLR balance (for gas fees)
   - USDC balance
   - EURC balance
5. Execute FX conversions if needed:
   - Query Flare FTSO for current rates
   - Convert currencies as required
   - Record FX rates used
6. Batch payment execution:
   - For each employee:
     a. Get employee wallet address
     b. Calculate payment amount in target currency
     c. Create blockchain transaction
     d. Sign with treasury wallet
     e. Broadcast to Flare Network
     f. Record transaction hash
7. Monitor confirmations:
   - Wait for block confirmations
   - Update transaction status
   - Record gas fees
8. Generate ISO 20022 receipts via Proofrails:
   - For each confirmed transaction
   - Create pacs.008 message
   - Submit to Proofrails for verification
   - Store receipt with Proofrails ID
9. Mark payroll run as "Completed"
10. Reconcile treasury accounts
```

**Workflow: Treasury Reconciliation**

```
1. Navigate to "Treasury Dashboard"
2. Click "Reconcile All"
3. For each treasury account:
   - Query blockchain for current balance
   - Compare with database balance
   - Identify discrepancies
   - Review pending transactions
4. Generate reconciliation report:
   - Opening balance
   - Total credits (received)
   - Total debits (paid)
   - Gas fees paid
   - Closing balance
   - Variance (if any)
5. Update last_reconciled timestamp
6. Export report for accounting
```

---

### 3. Employee (Self-Service)

**Responsibilities**:
- View payslips
- Access payment history
- Download receipts
- Update wallet address

**Workflow: View Payslip**

```
1. Employee logs in
2. Navigate to "My Payslips"
3. Dashboard shows:
   - YTD gross income
   - YTD net income
   - YTD deductions
4. View payment history table
5. Click "View" on specific payslip
6. Detailed payslip shows:
   Earnings:
   - Base salary: $8,500
   - Performance bonus: +$1,000
   - Housing benefit: +$500
   - Gross pay: $10,000

   Deductions:
   - Income tax (20%): -$2,000
   - Social security (3%): -$300
   - Health insurance: -$200
   - 401k (5%): -$500
   - Total deductions: -$3,000

   Net Pay: $7,000

   Payment details:
   - Payment date: February 5, 2024
   - Currency: USDC
   - Blockchain transaction: 0x1234...cdef
   - Network: Flare
   - Status: Confirmed
7. Export options:
   - Download PDF (printable payslip)
   - Download JSON (ISO 20022 receipt)
   - Download CSV (for personal records)
```

---

### 4. Auditor

**Responsibilities**:
- Compliance verification
- Audit trail review
- ISO 20022 receipt validation
- Regulatory reporting

**Workflow: Monthly Compliance Audit**

```
1. Auditor logs in
2. Navigate to "Audit & Compliance Dashboard"
3. Review compliance checks:
   ✓ ISO 20022 receipt generation
   ✓ Tax calculation accuracy
   ✓ Blockchain transaction verification
   ⚠ Employee wallet validation (1 pending)
   ✓ Cross-border payment compliance
   ✓ Data retention policy
4. Review audit trail:
   - Filter by date range (last 30 days)
   - Filter by entity type (payroll_run, payment, etc.)
   - Filter by action (created, approved, paid)
5. Verify specific payroll run:
   - Click on PR-2024-02
   - Review audit log entries:
     • Created by HR Manager on 2024-02-28
     • Approved by HR Manager on 2024-03-04
     • Processed by Treasury on 2024-03-05
   - Verify all calculations
   - Check ISO 20022 receipts
6. Validate ISO 20022 receipts:
   - Navigate to "Payments"
   - Review receipt verification status
   - Download sample receipts
   - Verify Proofrails signatures
   - Confirm message type (pacs.008)
   - Check settlement method (CRPT)
7. Generate compliance report:
   - Export audit logs
   - Include compliance check results
   - Attach ISO 20022 receipt samples
   - Document any warnings or failures
8. Submit to regulatory authority (if required)
```

---

## Database Schema

### Key Tables

#### employees
Stores employee profiles and onboarding status.
```sql
CREATE TABLE employees (
  id uuid PRIMARY KEY,
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
```

#### payroll_configurations
Defines salary and deduction settings for each employee.
```sql
CREATE TABLE payroll_configurations (
  id uuid PRIMARY KEY,
  employee_id uuid REFERENCES employees(id),
  base_salary decimal(15, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  payment_frequency text NOT NULL,
  tax_rate decimal(5, 2) NOT NULL,
  social_security_rate decimal(5, 2) NOT NULL,
  health_insurance decimal(10, 2) NOT NULL,
  retirement_contribution decimal(5, 2) NOT NULL,
  effective_from date NOT NULL,
  effective_to date
);
```

#### payment_transactions
Records blockchain payment transactions.
```sql
CREATE TABLE payment_transactions (
  id uuid PRIMARY KEY,
  transaction_hash text UNIQUE,
  payroll_item_id uuid REFERENCES payroll_items(id),
  employee_id uuid REFERENCES employees(id),
  from_address text NOT NULL,
  to_address text NOT NULL,
  amount decimal(15, 2) NOT NULL,
  currency text NOT NULL,
  original_amount decimal(15, 2),
  original_currency text,
  fx_rate decimal(10, 6),
  network text NOT NULL DEFAULT 'flare',
  status text NOT NULL,
  block_number bigint,
  gas_fee decimal(15, 8),
  confirmation_count integer DEFAULT 0,
  confirmed_at timestamptz
);
```

#### iso20022_receipts
Stores ISO 20022 compliant receipts from Proofrails.
```sql
CREATE TABLE iso20022_receipts (
  id uuid PRIMARY KEY,
  receipt_id text UNIQUE NOT NULL,
  transaction_id uuid REFERENCES payment_transactions(id),
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
  verification_status text NOT NULL,
  verification_timestamp timestamptz
);
```

---

## Core Features

### 1. Employee Onboarding
- Multi-step employee profile creation
- Blockchain wallet integration
- Country-specific tax configuration
- Automated onboarding workflows

### 2. Salary Calculation Engine
- Base salary management
- Bonus and benefits tracking
- Multi-currency support
- Automated deduction calculations:
  - Income tax (jurisdiction-specific)
  - Social security contributions
  - Health insurance premiums
  - Retirement contributions (401k, pension)
  - Other deductions

### 3. Payroll Processing
- Payroll run creation and approval workflow
- Batch payment processing
- Multi-currency payment support
- FX conversion with transparent rate tracking
- Draft, review, and approval stages

### 4. Blockchain Payments
- Flare Network integration
- Multi-currency support (FLR, USDC, EURC)
- Atomic transaction execution
- Gas fee optimization
- Transaction confirmation tracking
- Cross-border payment support

### 5. ISO 20022 Compliance
- Proofrails integration
- Automated pacs.008 message generation
- Cryptographic receipt verification
- Audit-ready payment documentation
- Regulatory compliance tracking

### 6. Treasury Management
- Multi-wallet management
- Real-time balance tracking
- Automated reconciliation
- FX rate monitoring via Flare FTSO
- Gas fee analytics

### 7. Audit & Compliance
- Comprehensive audit trail
- Role-based access control (RBAC)
- Automated compliance checks
- Regulatory reporting
- ISO 20022 receipt verification

### 8. Employee Portal
- Self-service payslip access
- Payment history tracking
- Multi-format export (PDF, JSON, CSV)
- YTD income summaries
- Blockchain transaction verification

---

## Example Outputs

### Example 1: Payslip Format

```
┌────────────────────────────────────────────────────────────────┐
│                        PAYSLIP                                  │
│                      TechCorp Inc.                              │
│                                                                  │
│  Employee: John Doe                    Employee ID: EMP001      │
│  Period: January 2024                  Payment Date: 2024-02-05 │
│  Department: Engineering               Position: Sr. Engineer   │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  EARNINGS                                                        │
│  ─────────────────────────────────────────────────────────────  │
│  Base Salary                                        $8,500.00   │
│  Performance Bonus                                  $1,000.00   │
│  Housing Benefit                                      $500.00   │
│  ─────────────────────────────────────────────────────────────  │
│  Gross Pay                                         $10,000.00   │
│                                                                  │
│  DEDUCTIONS                                                      │
│  ─────────────────────────────────────────────────────────────  │
│  Income Tax (20%)                                  -$2,000.00   │
│  Social Security (3%)                                -$300.00   │
│  Health Insurance                                    -$200.00   │
│  401k Contribution (5%)                              -$500.00   │
│  ─────────────────────────────────────────────────────────────  │
│  Total Deductions                                  -$3,000.00   │
│                                                                  │
│  ═════════════════════════════════════════════════════════════  │
│  NET PAY                                            $7,000.00   │
│  ═════════════════════════════════════════════════════════════  │
│                                                                  │
│  PAYMENT DETAILS                                                │
│  ─────────────────────────────────────────────────────────────  │
│  Currency: USDC                                                 │
│  Network: Flare                                                 │
│  Transaction: 0x1234567890abcdef1234567890abcdef...            │
│  Block: #12,345,678                                             │
│  Status: Confirmed                                              │
│  Confirmations: 15                                              │
│                                                                  │
│  ISO 20022 Receipt: RCP-2024-02-001                            │
│  Proofrails ID: PR-FL-20240205-7891234                         │
│  Verification: VERIFIED ✓                                       │
└────────────────────────────────────────────────────────────────┘
```

### Example 2: ISO 20022 Receipt JSON

```json
{
  "Document": {
    "FIToFICstmrCdtTrf": {
      "GrpHdr": {
        "MsgId": "RCP-2024-02-001",
        "CreDtTm": "2024-02-05T14:32:00Z",
        "NbOfTxs": "1",
        "SttlmInf": {
          "SttlmMtd": "CRPT"
        }
      },
      "CdtTrfTxInf": {
        "PmtId": {
          "InstrId": "RCP-2024-02-001",
          "EndToEndId": "PR-FL-20240205-7891234"
        },
        "IntrBkSttlmAmt": {
          "@Ccy": "USDC",
          "#text": "7000.00"
        },
        "IntrBkSttlmDt": "2024-02-05",
        "ChrgBr": "SLEV",
        "Dbtr": {
          "Nm": "TechCorp Inc."
        },
        "DbtrAcct": {
          "Id": {
            "Othr": {
              "Id": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              "SchmeNm": {
                "Prtry": "BLOCKCHAIN"
              }
            }
          }
        },
        "DbtrAgt": {
          "FinInstnId": {
            "Nm": "Flare Network",
            "Othr": {
              "Id": "FLARE"
            }
          }
        },
        "CdtrAgt": {
          "FinInstnId": {
            "Nm": "Flare Network",
            "Othr": {
              "Id": "FLARE"
            }
          }
        },
        "Cdtr": {
          "Nm": "John Doe"
        },
        "CdtrAcct": {
          "Id": {
            "Othr": {
              "Id": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
              "SchmeNm": {
                "Prtry": "BLOCKCHAIN"
              }
            }
          }
        },
        "RmtInf": {
          "Ustrd": "Payroll Payment - January 2024"
        },
        "SplmtryData": {
          "PlcAndNm": "ProofrailsVerification",
          "Envlp": {
            "ProofrailsId": "PR-FL-20240205-7891234",
            "VerificationStatus": "VERIFIED",
            "BlockchainNetwork": "Flare",
            "BlockNumber": "12345678",
            "TransactionHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            "MessageType": "pacs.008.001.08"
          }
        }
      }
    }
  }
}
```

### Example 3: Auditor Verification Flow

```
AUDITOR VERIFICATION CHECKLIST
─────────────────────────────────────────────────────────────────

Payroll Run: PR-2024-02
Period: February 1-29, 2024
Total Employees: 27
Total Gross: $265,000.00
Total Net: $198,750.00

□ PAYROLL CREATION
  ✓ Created by: hr.manager@techcorp.com
  ✓ Created at: 2024-02-28 10:15:00 UTC
  ✓ All active employees included
  ✓ Current salary configurations applied

□ CALCULATIONS VERIFIED
  ✓ Base salaries calculated correctly
  ✓ Bonuses applied from approved bonus table
  ✓ Tax rates match jurisdiction requirements
  ✓ Social security calculations accurate
  ✓ Health insurance deductions correct
  ✓ Retirement contributions (5%) applied
  ✓ Gross and net calculations verified

□ APPROVAL PROCESS
  ✓ Approved by: hr.director@techcorp.com
  ✓ Approved at: 2024-03-04 14:20:00 UTC
  ✓ Two-factor authentication used
  ✓ Approval recorded in audit log

□ PAYMENT EXECUTION
  ✓ Processed by: treasury@techcorp.com
  ✓ Processed at: 2024-03-05 09:00:00 UTC
  ✓ All 27 transactions executed
  ✓ All transactions confirmed on blockchain
  ✓ Average confirmation time: 2 minutes
  ✓ Gas fees within budget ($0.27 avg)

□ ISO 20022 COMPLIANCE
  ✓ All payments have ISO 20022 receipts
  ✓ Receipt type: pacs.008.001.08
  ✓ All receipts verified by Proofrails
  ✓ Settlement method: CRPT (Cryptocurrency)
  ✓ Cryptographic signatures valid

□ CROSS-BORDER PAYMENTS
  ✓ FX conversions tracked transparently
  ✓ FTSO rates used for conversions
  ✓ Rate sources documented
  ✓ Conversion timestamps recorded

□ AUDIT TRAIL
  ✓ All actions logged
  ✓ Actor roles recorded
  ✓ IP addresses captured
  ✓ Timestamps in UTC
  ✓ No unauthorized access detected

□ COMPLIANCE STATUS
  ✓ GDPR compliance maintained
  ✓ Data retention policies followed
  ✓ Employee privacy protected
  ✓ RLS policies enforced

RESULT: ✓ PASSED - All checks successful
Auditor: compliance@auditors.com
Audit Date: 2024-03-10
Signature: [Digital Signature]
```

---

## Security and Compliance

### 1. Data Security

**Row Level Security (RLS)**
- All database tables have RLS enabled
- Employees can only access their own data
- HR managers have restricted access to employee data
- Treasury can only access payment-related data
- Auditors have read-only access to all data
- Admins have full access with audit logging

**Authentication**
- Supabase Auth for user authentication
- Multi-factor authentication (MFA) support
- Session management with JWT tokens
- Secure password policies
- Role-based access control (RBAC)

**Data Encryption**
- Data at rest: PostgreSQL encryption
- Data in transit: TLS/SSL
- Blockchain private keys: Hardware wallet / HSM storage
- Sensitive fields: Additional encryption layer

### 2. Blockchain Security

**Wallet Management**
- Multi-signature wallets for treasury accounts
- Hardware wallet integration (Ledger, Trezor)
- Key rotation policies
- Cold storage for reserves
- Hot wallet limits for operational funds

**Transaction Security**
- Transaction signing verification
- Gas price limits
- Nonce management
- Failed transaction handling
- Replay attack prevention

### 3. Compliance Requirements

**ISO 20022**
- pacs.008 message format for payments
- Proper message structure validation
- Proofrails cryptographic verification
- Audit trail for all receipts

**GDPR / Data Privacy**
- Right to access (employee portal)
- Right to rectification (profile updates)
- Right to erasure (controlled deletion)
- Data minimization
- Consent management
- Privacy by design

**Financial Regulations**
- AML (Anti-Money Laundering) checks
- KYC (Know Your Customer) for employees
- Tax reporting requirements
- Cross-border payment regulations
- Audit trail retention (7 years minimum)

**Employment Law Compliance**
- Accurate salary calculations
- Timely payment execution
- Transparent deduction breakdowns
- Payslip accessibility
- Record retention

### 4. Audit Requirements

**Audit Trail**
- Every action logged with:
  - Timestamp (UTC)
  - Actor ID and role
  - Entity type and ID
  - Action performed
  - Changes made (before/after)
  - IP address
  - Additional metadata

**Compliance Checks**
- Automated daily compliance scans
- ISO 20022 receipt verification
- Tax calculation validation
- Blockchain transaction confirmation
- Employee wallet validation
- Data retention policy compliance

**Reporting**
- Monthly compliance reports
- Audit log exports
- ISO 20022 receipt samples
- Treasury reconciliation reports
- Tax documentation

---

## Integration Guide

### 1. Flare Network Integration

**Setup**
```javascript
import { ethers } from 'ethers';

// Connect to Flare Network
const provider = new ethers.JsonRpcProvider('https://flare-api.flare.network/ext/C/rpc');

// Load treasury wallet
const wallet = new ethers.Wallet(process.env.TREASURY_PRIVATE_KEY, provider);

// ERC-20 token contracts
const USDC_ADDRESS = '0x...'; // USDC on Flare
const EURC_ADDRESS = '0x...'; // EURC on Flare

const usdcContract = new ethers.Contract(
  USDC_ADDRESS,
  ['function transfer(address to, uint256 amount) returns (bool)'],
  wallet
);
```

**Payment Execution**
```javascript
async function executePayment(employeeAddress, amount, currency) {
  let tx;

  if (currency === 'FLR') {
    // Native FLR transfer
    tx = await wallet.sendTransaction({
      to: employeeAddress,
      value: ethers.parseEther(amount.toString())
    });
  } else if (currency === 'USDC') {
    // USDC transfer
    tx = await usdcContract.transfer(
      employeeAddress,
      ethers.parseUnits(amount.toString(), 6) // USDC has 6 decimals
    );
  } else if (currency === 'EURC') {
    // EURC transfer
    const eurcContract = new ethers.Contract(EURC_ADDRESS, [...], wallet);
    tx = await eurcContract.transfer(
      employeeAddress,
      ethers.parseUnits(amount.toString(), 6)
    );
  }

  // Wait for confirmation
  const receipt = await tx.wait();

  return {
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed,
    status: receipt.status === 1 ? 'confirmed' : 'failed'
  };
}
```

### 2. Flare FTSO Price Feed Integration

```javascript
import { FlareContractRegistry, FTSO } from '@flarenetwork/flare-periphery-contracts';

async function getFXRate(baseCurrency, quoteCurrency) {
  const registry = await FlareContractRegistry.at(provider);
  const ftsoManager = await registry.getFtsoManager();

  // Get FTSO contract for currency pair
  const ftso = await FTSO.at(ftsoManager, `${baseCurrency}/${quoteCurrency}`);

  // Get current price
  const [price, timestamp, decimals] = await ftso.getCurrentPrice();

  return {
    rate: price / (10 ** decimals),
    timestamp: new Date(timestamp * 1000),
    source: 'FTSO'
  };
}

// Example: Get EUR/USD rate
const rate = await getFXRate('EUR', 'USD');
console.log(`EUR/USD: ${rate.rate}`);
```

### 3. Proofrails Integration

```javascript
async function generateISO20022Receipt(transaction, payrollItem, employee) {
  const receiptData = {
    messageType: 'pacs.008.001.08',
    groupHeader: {
      messageId: `RCP-${new Date().getFullYear()}-${String(Math.random()).slice(2, 8)}`,
      creationDateTime: new Date().toISOString(),
      numberOfTransactions: 1,
      settlementMethod: 'CRPT'
    },
    creditTransfer: {
      paymentId: {
        instructionId: transaction.transaction_hash,
        endToEndId: `PAYROLL-${payrollItem.id}`
      },
      amount: {
        value: transaction.amount,
        currency: transaction.currency
      },
      valueDate: new Date(payrollItem.payment_date).toISOString().split('T')[0],
      debtor: {
        name: 'TechCorp Inc.',
        account: transaction.from_address,
        accountType: 'BLOCKCHAIN'
      },
      creditor: {
        name: `${employee.first_name} ${employee.last_name}`,
        account: transaction.to_address,
        accountType: 'BLOCKCHAIN'
      },
      remittanceInfo: {
        unstructured: `Payroll Payment - ${payrollItem.period}`
      },
      supplementaryData: {
        blockchainNetwork: 'Flare',
        blockNumber: transaction.block_number,
        transactionHash: transaction.transaction_hash,
        gasUsed: transaction.gas_fee
      }
    }
  };

  // Submit to Proofrails for verification
  const proofrailsResponse = await fetch('https://api.proofrails.com/v1/receipts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PROOFRAILS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(receiptData)
  });

  const proofrailsReceipt = await proofrailsResponse.json();

  // Store in database
  await supabase.from('iso20022_receipts').insert({
    receipt_id: receiptData.groupHeader.messageId,
    transaction_id: transaction.id,
    proofrails_id: proofrailsReceipt.id,
    message_type: receiptData.messageType,
    receipt_data: receiptData,
    debtor_name: receiptData.creditTransfer.debtor.name,
    debtor_account: receiptData.creditTransfer.debtor.account,
    creditor_name: receiptData.creditTransfer.creditor.name,
    creditor_account: receiptData.creditTransfer.creditor.account,
    amount: transaction.amount,
    currency: transaction.currency,
    value_date: receiptData.creditTransfer.valueDate,
    settlement_method: 'CRPT',
    verification_status: proofrailsReceipt.verificationStatus,
    verification_timestamp: new Date()
  });

  return proofrailsReceipt;
}
```

### 4. Supabase Edge Function for Batch Payments

```typescript
// supabase/functions/process-payroll/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    const { payrollRunId } = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get payroll items
    const { data: payrollItems } = await supabase
      .from('payroll_items')
      .select('*, employee:employees(*)')
      .eq('payroll_run_id', payrollRunId);

    // Process each payment
    for (const item of payrollItems) {
      // Execute blockchain payment
      const txResult = await executePayment(
        item.employee.blockchain_wallet,
        item.net_pay,
        item.currency
      );

      // Store transaction
      const { data: transaction } = await supabase
        .from('payment_transactions')
        .insert({
          payroll_item_id: item.id,
          employee_id: item.employee_id,
          from_address: TREASURY_WALLET,
          to_address: item.employee.blockchain_wallet,
          amount: item.net_pay,
          currency: item.currency,
          transaction_hash: txResult.transactionHash,
          block_number: txResult.blockNumber,
          gas_fee: txResult.gasUsed,
          status: 'confirmed'
        })
        .select()
        .single();

      // Generate ISO 20022 receipt
      await generateISO20022Receipt(transaction, item, item.employee);
    }

    // Update payroll run status
    await supabase
      .from('payroll_runs')
      .update({ status: 'completed', completed_at: new Date() })
      .eq('id', payrollRunId);

    return new Response(
      JSON.stringify({ success: true, message: 'Payroll processed' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

---

## Deployment Checklist

### Pre-Production
- [ ] Configure Supabase project
- [ ] Set up database schema and RLS policies
- [ ] Configure environment variables
- [ ] Set up Flare Network wallet (testnet: Coston2)
- [ ] Obtain Proofrails API credentials
- [ ] Configure FTSO price feeds
- [ ] Set up user roles and permissions
- [ ] Test authentication flows
- [ ] Verify RLS policies
- [ ] Test payroll calculations
- [ ] Test blockchain payments (testnet)
- [ ] Verify ISO 20022 receipt generation
- [ ] Conduct security audit
- [ ] Perform compliance review

### Production
- [ ] Deploy to Flare Network mainnet
- [ ] Configure production wallets (hardware wallets)
- [ ] Set up multi-signature treasury wallets
- [ ] Enable MFA for all admin users
- [ ] Configure monitoring and alerts
- [ ] Set up automated backups
- [ ] Configure audit log retention
- [ ] Enable real-time compliance monitoring
- [ ] Set up incident response procedures
- [ ] Train users on system workflows
- [ ] Document disaster recovery procedures
- [ ] Obtain regulatory approvals (if required)

---

## Support and Maintenance

### Monitoring
- Database performance metrics
- Blockchain transaction success rate
- Gas fee trends
- ISO 20022 receipt verification rate
- User activity logs
- Compliance check results

### Regular Maintenance
- Weekly database backups
- Monthly security patches
- Quarterly compliance audits
- Annual penetration testing
- Regular RLS policy reviews
- Blockchain wallet security audits

---

## Conclusion

FlarePayroll provides a complete, production-ready blockchain payroll system with enterprise-grade security, ISO 20022 compliance, and comprehensive audit trails. The system leverages the Flare Network for fast, cost-effective payments and Proofrails for regulatory compliance, making it suitable for global enterprises with complex payroll requirements.

For implementation support, contact: [your-contact@company.com]
