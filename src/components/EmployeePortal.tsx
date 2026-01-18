import { useState } from 'react';
import { Download, FileText, CheckCircle, Eye } from 'lucide-react';

type Payslip = {
  id: string;
  period: string;
  payment_date: string;
  base_salary: number;
  bonuses: number;
  benefits: number;
  gross_pay: number;
  tax: number;
  social_security: number;
  health_insurance: number;
  retirement: number;
  total_deductions: number;
  net_pay: number;
  currency: string;
  status: string;
  transaction_hash: string | null;
};

const mockPayslips: Payslip[] = [
  {
    id: '1',
    period: 'January 2024',
    payment_date: '2024-02-05',
    base_salary: 8500,
    bonuses: 1000,
    benefits: 500,
    gross_pay: 10000,
    tax: 2000,
    social_security: 300,
    health_insurance: 200,
    retirement: 500,
    total_deductions: 3000,
    net_pay: 7000,
    currency: 'USD',
    status: 'paid',
    transaction_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: '2',
    period: 'February 2024',
    payment_date: '2024-03-05',
    base_salary: 8500,
    bonuses: 500,
    benefits: 500,
    gross_pay: 9500,
    tax: 1900,
    social_security: 300,
    health_insurance: 200,
    retirement: 500,
    total_deductions: 2900,
    net_pay: 6600,
    currency: 'USD',
    status: 'paid',
    transaction_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: '3',
    period: 'March 2024',
    payment_date: '2024-04-05',
    base_salary: 8500,
    bonuses: 1500,
    benefits: 500,
    gross_pay: 10500,
    tax: 2100,
    social_security: 300,
    health_insurance: 200,
    retirement: 500,
    total_deductions: 3100,
    net_pay: 7400,
    currency: 'USD',
    status: 'pending',
    transaction_hash: null,
  },
];

export default function EmployeePortal() {
  const [payslips] = useState<Payslip[]>(mockPayslips);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  const handleExport = (format: 'pdf' | 'json' | 'csv') => {
    alert(`Exporting payslip in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Payslips</h2>
        <p className="text-slate-600 mt-1">View and download your payment history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Gross Income</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">$30,000</p>
              <p className="text-xs text-slate-600 mt-1">Before deductions</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Net Income</p>
              <p className="text-3xl font-bold text-green-600 mt-1">$21,000</p>
              <p className="text-xs text-slate-600 mt-1">After deductions</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Deductions</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">$9,000</p>
              <p className="text-xs text-slate-600 mt-1">30% of gross</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Download className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Payment History</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Gross Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Net Pay
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
            {payslips.map(payslip => (
              <tr key={payslip.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{payslip.period}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">
                    {new Date(payslip.payment_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">
                    ${payslip.gross_pay.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-orange-600">
                    -${payslip.total_deductions.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-green-600">
                    ${payslip.net_pay.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payslip.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {payslip.status === 'paid' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : null}
                    <span className="capitalize">{payslip.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedPayslip(payslip)}
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

      {selectedPayslip && (
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Payslip</h3>
              <p className="text-slate-600 mt-1">{selectedPayslip.period}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport('pdf')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button
                onClick={() => handleExport('json')}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Earnings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Base Salary</span>
                  <span className="text-sm font-medium text-slate-900">
                    ${selectedPayslip.base_salary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Bonuses</span>
                  <span className="text-sm font-medium text-green-600">
                    +${selectedPayslip.bonuses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Benefits</span>
                  <span className="text-sm font-medium text-green-600">
                    +${selectedPayslip.benefits.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-semibold text-slate-700">Gross Pay</span>
                  <span className="text-sm font-bold text-blue-600">
                    ${selectedPayslip.gross_pay.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Deductions</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Income Tax</span>
                  <span className="text-sm font-medium text-orange-600">
                    -${selectedPayslip.tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Social Security</span>
                  <span className="text-sm font-medium text-orange-600">
                    -${selectedPayslip.social_security.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Health Insurance</span>
                  <span className="text-sm font-medium text-orange-600">
                    -${selectedPayslip.health_insurance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">Retirement (401k)</span>
                  <span className="text-sm font-medium text-orange-600">
                    -${selectedPayslip.retirement.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Net Pay</span>
                <span className="text-3xl font-bold text-green-600">
                  ${selectedPayslip.net_pay.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                Payment Date: {new Date(selectedPayslip.payment_date).toLocaleDateString()}
              </div>
              {selectedPayslip.transaction_hash && (
                <div className="mt-2 p-2 bg-white rounded border border-slate-200">
                  <p className="text-xs text-slate-600">Blockchain Transaction:</p>
                  <p className="text-xs font-mono text-slate-900 mt-1">
                    {selectedPayslip.transaction_hash}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
