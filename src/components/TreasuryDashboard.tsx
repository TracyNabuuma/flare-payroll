import { useState } from 'react';
import { Wallet, TrendingUp, RefreshCw, ExternalLink, CheckCircle } from 'lucide-react';

type TreasuryAccount = {
  id: string;
  account_name: string;
  blockchain_address: string;
  currency: string;
  balance: number;
  network: string;
  account_type: string;
  last_reconciled: string;
};

type Transaction = {
  id: string;
  transaction_hash: string;
  employee_name: string;
  amount: number;
  currency: string;
  original_amount: number;
  original_currency: string;
  fx_rate: number;
  status: string;
  block_number: number;
  gas_fee: number;
  initiated_at: string;
  confirmed_at: string;
};

const mockAccounts: TreasuryAccount[] = [
  {
    id: '1',
    account_name: 'Main Payroll Wallet',
    blockchain_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    currency: 'FLR',
    balance: 500000,
    network: 'flare',
    account_type: 'operational',
    last_reconciled: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    account_name: 'USD Stablecoin Reserve',
    blockchain_address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    currency: 'USDC',
    balance: 250000,
    network: 'flare',
    account_type: 'reserve',
    last_reconciled: '2024-03-15T10:00:00Z',
  },
  {
    id: '3',
    account_name: 'EUR Stablecoin Reserve',
    blockchain_address: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    currency: 'EURC',
    balance: 180000,
    network: 'flare',
    account_type: 'reserve',
    last_reconciled: '2024-03-15T10:00:00Z',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    transaction_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    employee_name: 'John Doe',
    amount: 7000,
    currency: 'USDC',
    original_amount: 7000,
    original_currency: 'USD',
    fx_rate: 1.0,
    status: 'confirmed',
    block_number: 12345678,
    gas_fee: 0.25,
    initiated_at: '2024-02-05T14:30:00Z',
    confirmed_at: '2024-02-05T14:32:00Z',
  },
  {
    id: '2',
    transaction_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    employee_name: 'Sarah Smith',
    amount: 5280,
    currency: 'EURC',
    original_amount: 6000,
    original_currency: 'GBP',
    fx_rate: 1.137,
    status: 'confirmed',
    block_number: 12345680,
    gas_fee: 0.28,
    initiated_at: '2024-02-05T14:31:00Z',
    confirmed_at: '2024-02-05T14:33:00Z',
  },
  {
    id: '3',
    transaction_hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    employee_name: 'Michael Chen',
    amount: 8500,
    currency: 'USDC',
    original_amount: 11900,
    original_currency: 'SGD',
    fx_rate: 1.4,
    status: 'pending',
    block_number: 0,
    gas_fee: 0.0,
    initiated_at: '2024-03-05T14:35:00Z',
    confirmed_at: '',
  },
];

export default function TreasuryDashboard() {
  const [accounts] = useState<TreasuryAccount[]>(mockAccounts);
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const totalBalance = accounts.reduce((sum, account) => {
    if (account.currency === 'FLR') return sum + account.balance * 0.03;
    return sum + account.balance;
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Treasury Dashboard</h2>
          <p className="text-slate-600 mt-1">Monitor wallets, payments, and FX conversions</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Reconcile All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Treasury Value</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                ${totalBalance.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600 mt-1">USD equivalent</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Transactions Today</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {transactions.filter(t => t.status === 'confirmed').length}
              </p>
              <p className="text-xs text-green-600 mt-1">All successful</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Average Gas Fee</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">$0.27</p>
              <p className="text-xs text-slate-600 mt-1">Per transaction</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Treasury Accounts</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Blockchain Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Network
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Last Reconciled
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {accounts.map(account => (
              <tr key={account.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{account.account_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-600">
                      {account.blockchain_address.slice(0, 10)}...{account.blockchain_address.slice(-8)}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-900">
                    {account.balance.toLocaleString()} {account.currency}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {account.network}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 capitalize">{account.account_type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {new Date(account.last_reconciled).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Transaction Hash
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                FX Conversion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Gas Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Block
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-600">
                      {tx.transaction_hash.slice(0, 10)}...{tx.transaction_hash.slice(-8)}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{tx.employee_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-900">
                    {tx.amount.toLocaleString()} {tx.currency}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {tx.fx_rate !== 1.0 ? (
                    <div className="text-xs text-slate-600">
                      {tx.original_amount.toLocaleString()} {tx.original_currency}
                      <br />
                      <span className="text-blue-600">@ {tx.fx_rate.toFixed(4)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">No conversion</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {tx.gas_fee > 0 ? `$${tx.gas_fee.toFixed(2)}` : '-'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    <span className="capitalize">{tx.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {tx.block_number > 0 ? `#${tx.block_number.toLocaleString()}` : '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
