import { useState } from 'react';
import Navigation from './components/Navigation';
import EmployeeManagement from './components/EmployeeManagement';
import PayrollProcessing from './components/PayrollProcessing';
import TreasuryDashboard from './components/TreasuryDashboard';
import AuditorDashboard from './components/AuditorDashboard';
import EmployeePortal from './components/EmployeePortal';
import PaymentReceipts from './components/PaymentReceipts';

function App() {
  const [currentView, setCurrentView] = useState('employees');
  const [userRole] = useState('admin');

  const renderView = () => {
    switch (currentView) {
      case 'employees':
        return <EmployeeManagement />;
      case 'payroll':
        return <PayrollProcessing />;
      case 'payments':
        return <PaymentReceipts />;
      case 'treasury':
        return <TreasuryDashboard />;
      case 'auditor':
        return <AuditorDashboard />;
      case 'employee-portal':
        return <EmployeePortal />;
      default:
        return <EmployeeManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation currentView={currentView} onViewChange={setCurrentView} userRole={userRole} />
      <main>{renderView()}</main>
    </div>
  );
}

export default App;
