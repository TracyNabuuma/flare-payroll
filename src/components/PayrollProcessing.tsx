import { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Play } from 'lucide-react';

type PayrollRun = {
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
  employee_count: number;
};

const mockPayrollRuns: PayrollRun[] = [
  {
    id: '1',
    run_id: 'PR-2024-01',
    period_start: '2024-01-01',
    period_end: '2024-01-31',
    payment_date: '2024-02-05',
    status: 'completed',
    total_gross: 250000,
    total_deductions: 62500,
    total_net: 187500,
    currency: 'USD',
    employee_count: 25,
  },
  {
    id: '2',
    run_id: 'PR-2024-02',
    period_start: '2024-02-01',
    period_end: '2024-02-29',
    payment_date: '2024-03-05',
    status: 'processing',
    total_gross: 265000,
    total_deductions: 66250,
    total_net: 198750,
    currency: 'USD',
    employee_count: 27,
  },
  {
    id: '3',
    run_id: 'PR-2024-03',
    period_start: '2024-03-01',
    period_end: '2024-03-31',
    payment_date: '2024-04-05',
    status: 'draft',
    total_gross: 270000,
    total_deductions: 67500,
    total_net: 202500,
    currency: 'USD',
    employee_count: 28,
  },
];

export default function PayrollProcessing() {
  const [payrollRuns] = useState<PayrollRun[]>(mockPayrollRuns);
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-slate-100 text-slate-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'processing':
        return <Play className="w-4 h-4" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Payroll Processing</h2>
          <p className="text-slate-600 mt-1">Manage payroll runs and salary calculations</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Calendar className="w-4 h-4" />
          <span>New Payroll Run</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Payroll (This Month)</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">$198,750</p>
              <p className="text-xs text-green-600 mt-1">+5.8% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Average Deduction Rate</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">25%</p>
              <p className="text-xs text-slate-600 mt-1">Tax, SS, Benefits</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Employees</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">28</p>
              <p className="text-xs text-slate-600 mt-1">Receiving payment</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Payroll Runs</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Run ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Pay Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Gross
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Net
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
            {payrollRuns.map(run => (
              <tr key={run.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{run.run_id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">
                    {new Date(run.period_start).toLocaleDateString()} -{' '}
                    {new Date(run.period_end).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">
                    {new Date(run.payment_date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{run.employee_count}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">
                    ${run.total_gross.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-green-600">
                    ${run.total_net.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      run.status
                    )}`}
                  >
                    {getStatusIcon(run.status)}
                    <span className="ml-1 capitalize">{run.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedRun(run)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRun && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Payroll Calculation Breakdown - {selectedRun.run_id}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-600">Base Salary</p>
              <p className="text-xl font-bold text-blue-600 mt-1">
                ${(selectedRun.total_gross * 0.85).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-slate-600">Bonuses</p>
              <p className="text-xl font-bold text-green-600 mt-1">
                ${(selectedRun.total_gross * 0.1).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-slate-600">Benefits</p>
              <p className="text-xl font-bold text-purple-600 mt-1">
                ${(selectedRun.total_gross * 0.05).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-slate-600">Total Deductions</p>
              <p className="text-xl font-bold text-orange-600 mt-1">
                -${selectedRun.total_deductions.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-900">Net Pay</span>
              <span className="text-2xl font-bold text-green-600">
                ${selectedRun.total_net.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
