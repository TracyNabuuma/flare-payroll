import { Building2, Users, DollarSign, FileText, TrendingUp, Shield } from 'lucide-react';

type NavigationProps = {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: string;
};

export default function Navigation({ currentView, onViewChange, userRole }: NavigationProps) {
  const menuItems = [
    { id: 'employees', label: 'Employees', icon: Users, roles: ['hr_manager', 'admin'] },
    { id: 'payroll', label: 'Payroll', icon: DollarSign, roles: ['hr_manager', 'admin', 'treasury'] },
    { id: 'payments', label: 'Payments', icon: Building2, roles: ['treasury', 'admin'] },
    { id: 'treasury', label: 'Treasury', icon: TrendingUp, roles: ['treasury', 'admin'] },
    { id: 'auditor', label: 'Audit & Compliance', icon: Shield, roles: ['auditor', 'admin'] },
    { id: 'employee-portal', label: 'My Payslips', icon: FileText, roles: ['employee'] },
  ];

  const filteredItems = menuItems.filter(item =>
    item.roles.includes(userRole) || userRole === 'admin'
  );

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">FlarePayroll</h1>
              <p className="text-xs text-slate-400">Blockchain Payroll on Flare Network</p>
            </div>
          </div>
          <div className="flex space-x-1">
            {filteredItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
