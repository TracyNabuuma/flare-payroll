import { useState } from 'react';
import { Shield, FileCheck, AlertTriangle, Clock, Download } from 'lucide-react';

type AuditLog = {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  actor_role: string;
  timestamp: string;
  details: string;
};

type ComplianceCheck = {
  id: string;
  check_name: string;
  category: string;
  status: 'passed' | 'warning' | 'failed';
  last_checked: string;
  details: string;
};

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    entity_type: 'payroll_run',
    entity_id: 'PR-2024-02',
    action: 'approved',
    actor_role: 'hr_manager',
    timestamp: '2024-03-05T14:30:00Z',
    details: 'Payroll run PR-2024-02 approved for processing',
  },
  {
    id: '2',
    entity_type: 'payment_transaction',
    entity_id: 'TX-123456',
    action: 'initiated',
    actor_role: 'treasury',
    timestamp: '2024-03-05T14:35:00Z',
    details: 'Blockchain payment initiated for employee EMP001',
  },
  {
    id: '3',
    entity_type: 'employee',
    entity_id: 'EMP003',
    action: 'created',
    actor_role: 'hr_manager',
    timestamp: '2024-03-10T10:00:00Z',
    details: 'New employee Michael Chen added to system',
  },
  {
    id: '4',
    entity_type: 'payroll_configuration',
    entity_id: 'CFG-456',
    action: 'updated',
    actor_role: 'hr_manager',
    timestamp: '2024-03-12T11:20:00Z',
    details: 'Salary configuration updated for employee EMP002',
  },
];

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: '1',
    check_name: 'ISO 20022 Receipt Generation',
    category: 'Payment Compliance',
    status: 'passed',
    last_checked: '2024-03-15T10:00:00Z',
    details: 'All payments have valid ISO 20022 receipts',
  },
  {
    id: '2',
    check_name: 'Tax Calculation Accuracy',
    category: 'Financial Compliance',
    status: 'passed',
    last_checked: '2024-03-15T10:00:00Z',
    details: 'Tax deductions calculated correctly for all jurisdictions',
  },
  {
    id: '3',
    check_name: 'Blockchain Transaction Verification',
    category: 'Payment Compliance',
    status: 'passed',
    last_checked: '2024-03-15T10:00:00Z',
    details: 'All transactions confirmed on Flare Network',
  },
  {
    id: '4',
    check_name: 'Employee Wallet Validation',
    category: 'Security',
    status: 'warning',
    last_checked: '2024-03-15T10:00:00Z',
    details: '1 employee has not configured blockchain wallet',
  },
  {
    id: '5',
    check_name: 'Cross-Border Payment Compliance',
    category: 'Regulatory',
    status: 'passed',
    last_checked: '2024-03-15T10:00:00Z',
    details: 'All cross-border payments comply with local regulations',
  },
  {
    id: '6',
    check_name: 'Data Retention Policy',
    category: 'Security',
    status: 'passed',
    last_checked: '2024-03-15T10:00:00Z',
    details: 'All payroll records properly archived',
  },
];

export default function AuditorDashboard() {
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [complianceChecks] = useState<ComplianceCheck[]>(mockComplianceChecks);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const passedChecks = complianceChecks.filter(c => c.status === 'passed').length;
  const warningChecks = complianceChecks.filter(c => c.status === 'warning').length;
  const failedChecks = complianceChecks.filter(c => c.status === 'failed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <FileCheck className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Audit & Compliance Dashboard</h2>
          <p className="text-slate-600 mt-1">Monitor compliance and audit trails</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Audit Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Checks</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{complianceChecks.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Passed</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{passedChecks}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Warnings</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{warningChecks}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{failedChecks}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Compliance Checks</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Check Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Last Checked
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {complianceChecks.map(check => (
              <tr key={check.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{check.check_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">{check.category}</div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      check.status
                    )}`}
                  >
                    {getStatusIcon(check.status)}
                    <span className="ml-1 capitalize">{check.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">
                    {new Date(check.last_checked).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">{check.details}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Audit Trail</h3>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Entity Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actor Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {auditLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {log.entity_type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900 capitalize">{log.action}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600 capitalize">
                    {log.actor_role.replace('_', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600">{log.details}</div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Full
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Audit Log Details</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Entity Type</p>
                <p className="text-base font-medium text-slate-900 mt-1 capitalize">
                  {selectedLog.entity_type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Entity ID</p>
                <p className="text-base font-medium text-slate-900 mt-1">{selectedLog.entity_id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Action</p>
                <p className="text-base font-medium text-slate-900 mt-1 capitalize">
                  {selectedLog.action}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Actor Role</p>
                <p className="text-base font-medium text-slate-900 mt-1 capitalize">
                  {selectedLog.actor_role.replace('_', ' ')}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600">Timestamp</p>
                <p className="text-base font-medium text-slate-900 mt-1">
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-600">Details</p>
                <p className="text-base text-slate-900 mt-1">{selectedLog.details}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
