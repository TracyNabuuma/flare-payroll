import { useState } from 'react';
import { Plus, Edit, Wallet, CheckCircle, XCircle } from 'lucide-react';
import type { Employee } from '../lib/supabase';

const mockEmployees: Employee[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    email: 'john.doe@company.com',
    first_name: 'John',
    last_name: 'Doe',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    blockchain_wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    country: 'United States',
    status: 'active',
    onboarding_completed: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    employee_id: 'EMP002',
    email: 'sarah.smith@company.com',
    first_name: 'Sarah',
    last_name: 'Smith',
    department: 'Marketing',
    position: 'Marketing Manager',
    blockchain_wallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    country: 'United Kingdom',
    status: 'active',
    onboarding_completed: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    employee_id: 'EMP003',
    email: 'michael.chen@company.com',
    first_name: 'Michael',
    last_name: 'Chen',
    department: 'Finance',
    position: 'Financial Analyst',
    blockchain_wallet: null,
    country: 'Singapore',
    status: 'active',
    onboarding_completed: false,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
  },
];

export default function EmployeeManagement() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Employee Management</h2>
          <p className="text-slate-600 mt-1">Manage employee profiles and onboarding</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{employees.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Onboarding Complete</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {employees.filter(e => e.onboarding_completed).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Onboarding</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {employees.filter(e => !e.onboarding_completed).length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Wallet
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
            {employees.map(employee => (
              <tr key={employee.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-slate-900">
                      {employee.first_name} {employee.last_name}
                    </div>
                    <div className="text-sm text-slate-600">{employee.email}</div>
                    <div className="text-xs text-slate-500">{employee.employee_id}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{employee.department}</div>
                  <div className="text-xs text-slate-600">{employee.position}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">{employee.country}</td>
                <td className="px-6 py-4">
                  {employee.blockchain_wallet ? (
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-slate-600 font-mono">
                        {employee.blockchain_wallet.slice(0, 6)}...{employee.blockchain_wallet.slice(-4)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-orange-600">Not configured</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {employee.onboarding_completed ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Onboarding
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
