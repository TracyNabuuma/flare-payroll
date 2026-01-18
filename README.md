# FlarePayroll - Blockchain Payroll Payment System

A comprehensive blockchain-based payroll payment system built on the Flare Network with Proofrails ISO 20022 compliance.

## Features

- **Employee Management**: Complete onboarding workflow with blockchain wallet integration
- **Payroll Processing**: Automated salary calculations with deductions, bonuses, and benefits
- **Multi-Currency Payments**: Support for FLR, USDC, EURC with transparent FX conversion
- **ISO 20022 Compliance**: Proofrails-verified payment receipts for regulatory compliance
- **Employee Portal**: Self-service access to payslips with PDF/JSON/CSV export
- **Treasury Dashboard**: Multi-wallet management and reconciliation tools
- **Audit & Compliance**: Comprehensive audit trails and compliance verification
- **Cross-Border Payroll**: Global payment support with FTSO price feeds

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Blockchain**: Flare Network (Mainnet/Coston2)
- **Compliance**: Proofrails ISO 20022 (pacs.008)
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Flare Network wallet (for production)
- Proofrails API credentials (for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flarepayroll
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase project
   - Run the migration file from `SYSTEM_DOCUMENTATION.md`
   - The schema includes all necessary tables and RLS policies

5. Start the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## User Roles

The system supports multiple user roles with different access levels:

### HR Manager
- Employee onboarding and management
- Payroll configuration (salary, deductions, bonuses)
- Payroll run creation and approval
- Benefits management

### Treasury Team
- Wallet and account management
- Payment execution on blockchain
- FX rate monitoring
- Treasury reconciliation
- ISO 20022 receipt verification

### Employee
- View payslips
- Access payment history
- Download receipts (PDF, JSON, CSV)
- Update wallet address

### Auditor
- Compliance verification
- Audit trail review
- ISO 20022 receipt validation
- Regulatory reporting

### Admin
- Full system access
- User role management
- System configuration

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx              # Main navigation
│   ├── EmployeeManagement.tsx      # Employee CRUD
│   ├── PayrollProcessing.tsx       # Payroll runs
│   ├── EmployeePortal.tsx          # Employee self-service
│   ├── TreasuryDashboard.tsx       # Treasury management
│   ├── AuditorDashboard.tsx        # Audit & compliance
│   ├── PaymentReceipts.tsx         # Receipt listing
│   └── ISO20022Receipt.tsx         # Receipt detail view
├── lib/
│   └── supabase.ts                 # Supabase client & types
├── App.tsx                         # Main application
└── main.tsx                        # Entry point
```

## Database Schema

The system uses 11 main tables:

1. **employees** - Employee profiles and onboarding
2. **payroll_configurations** - Salary and deduction settings
3. **bonuses_benefits** - Bonuses, benefits, allowances
4. **payroll_runs** - Pay period runs
5. **payroll_items** - Individual employee payroll calculations
6. **payment_transactions** - Blockchain payment records
7. **iso20022_receipts** - ISO 20022 compliant receipts
8. **audit_logs** - Comprehensive audit trail
9. **treasury_accounts** - Company treasury wallets
10. **fx_rates** - Foreign exchange rates
11. **user_roles** - User role and permission management

All tables have Row Level Security (RLS) enabled for data protection.

## Key Workflows

### 1. Employee Onboarding
1. HR Manager creates employee profile
2. Sets up payroll configuration (salary, deductions)
3. Employee receives onboarding email
4. Employee sets up blockchain wallet
5. Employee adds wallet address to profile
6. HR Manager completes onboarding

### 2. Monthly Payroll Processing
1. HR Manager creates payroll run
2. System calculates gross pay (salary + bonuses + benefits)
3. System calculates deductions (tax, social security, insurance, retirement)
4. System calculates net pay
5. HR Manager reviews and approves
6. Treasury executes blockchain payments
7. Proofrails generates ISO 20022 receipts
8. Employees receive payments and payslips

### 3. Treasury Reconciliation
1. Treasury team reviews account balances
2. Compares blockchain balances with database
3. Identifies and resolves discrepancies
4. Generates reconciliation report
5. Updates last reconciled timestamp

### 4. Compliance Audit
1. Auditor reviews compliance checks
2. Examines audit trail for specific period
3. Verifies ISO 20022 receipt generation
4. Validates payment calculations
5. Exports compliance report

## Example Outputs

### Payslip
Employees can view and download detailed payslips showing:
- Earnings breakdown (base salary, bonuses, benefits)
- Deduction breakdown (tax, social security, insurance, retirement)
- Net pay calculation
- Blockchain transaction details
- ISO 20022 receipt reference

### ISO 20022 Receipt JSON
Each payment generates a compliant pacs.008 receipt with:
- Payment identification
- Debtor and creditor details
- Amount and currency
- Settlement method (CRPT for cryptocurrency)
- Blockchain transaction details
- Proofrails verification status

### Audit Reports
Comprehensive audit trails including:
- All system actions with timestamps
- Actor identification and roles
- Before/after change tracking
- Compliance check results
- ISO 20022 receipt verification status

## Security Features

- **Row Level Security (RLS)**: PostgreSQL RLS on all tables
- **Role-Based Access Control (RBAC)**: Fine-grained permissions
- **Authentication**: Supabase Auth with MFA support
- **Encryption**: Data at rest and in transit
- **Audit Logging**: Complete audit trail for all actions
- **Wallet Security**: Support for hardware wallets and multi-sig

## Compliance

- **ISO 20022**: pacs.008 message format for payment receipts
- **GDPR**: Data privacy and employee rights
- **AML/KYC**: Anti-money laundering and know-your-customer
- **Tax Compliance**: Jurisdiction-specific tax calculations
- **Audit Trail**: 7-year retention for regulatory requirements

## Development

### Run Tests
```bash
npm run test
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run typecheck
```

### Build for Production
```bash
npm run build
```

## Blockchain Integration

### Flare Network
- **Mainnet**: Production payments
- **Coston2**: Testnet for development
- **Supported Currencies**: FLR, USDC, EURC
- **Gas Optimization**: Batch payments to reduce fees

### Proofrails
- **API Integration**: Automated receipt generation
- **Message Types**: pacs.008 (FIToFICustomerCreditTransfer)
- **Verification**: Cryptographic signature validation
- **Compliance**: ISO 20022 standard compliance

### FTSO Price Feeds
- Real-time exchange rates for FX conversions
- Transparent rate tracking
- On-chain price verification

## Documentation

For detailed documentation, see:
- **SYSTEM_DOCUMENTATION.md**: Complete system architecture, workflows, and integration guide
- **Database Schema**: Detailed table structures and RLS policies
- **API Documentation**: Supabase API and blockchain integration
- **User Guides**: Role-specific user workflows

## Support

For questions or issues:
1. Check the system documentation
2. Review the database schema
3. Consult the integration guide
4. Contact your system administrator

## License

[Your License Here]

## Contributors

[Your Team/Company Name]

---

Built with React, TypeScript, Supabase, and Flare Network.
