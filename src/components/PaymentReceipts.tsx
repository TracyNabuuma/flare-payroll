import { useState } from 'react';
import { FileText, CheckCircle, Eye } from 'lucide-react';
import ISO20022Receipt from './ISO20022Receipt';

type Receipt = {
  id: string;
  receipt_id: string;
  transaction_id: string;
  proofrails_id: string;
  message_type: string;
  debtor_name: string;
  debtor_account: string;
  creditor_name: string;
  creditor_account: string;
  amount: number;
  currency: string;
  value_date: string;
  settlement_method: string;
  verification_status: string;
  created_at: string;
  receipt_data: any;
};

const mockReceipts: Receipt[] = [
  {
    id: '1',
    receipt_id: 'RCP-2024-02-001',
    transaction_id: 'TX-001',
    proofrails_id: 'PR-FL-20240205-7891234',
    message_type: 'pacs.008.001.08',
    debtor_name: 'TechCorp Inc.',
    debtor_account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creditor_name: 'John Doe',
    creditor_account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    amount: 7000,
    currency: 'USDC',
    value_date: '2024-02-05',
    settlement_method: 'CRPT',
    verification_status: 'verified',
    created_at: '2024-02-05T14:32:00Z',
    receipt_data: {},
  },
  {
    id: '2',
    receipt_id: 'RCP-2024-02-002',
    transaction_id: 'TX-002',
    proofrails_id: 'PR-FL-20240205-7891235',
    message_type: 'pacs.008.001.08',
    debtor_name: 'TechCorp Inc.',
    debtor_account: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    creditor_name: 'Sarah Smith',
    creditor_account: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    amount: 5280,
    currency: 'EURC',
    value_date: '2024-02-05',
    settlement_method: 'CRPT',
    verification_status: 'verified',
    created_at: '2024-02-05T14:33:00Z',
    receipt_data: {},
  },
];

export default function PaymentReceipts() {
  const [receipts] = useState<Receipt[]>(mockReceipts);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">ISO 20022 Payment Receipts</h2>
        <p className="text-slate-600 mt-1">Proofrails-verified blockchain payment receipts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Receipts</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{receipts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Verified</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {receipts.filter(r => r.verification_status === 'verified').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Compliance Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-1">100%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Receipt History</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Receipt ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Proofrails ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Payee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Value Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {receipts.map(receipt => (
              <tr key={receipt.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{receipt.receipt_id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-mono text-slate-600">{receipt.proofrails_id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{receipt.creditor_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-green-600">
                    {receipt.amount.toLocaleString()} {receipt.currency}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {new Date(receipt.value_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedReceipt(receipt)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReceipt && <ISO20022Receipt receipt={selectedReceipt} />}
    </div>
  );
}
