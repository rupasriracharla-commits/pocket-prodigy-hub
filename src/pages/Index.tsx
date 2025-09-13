import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ExpenseTracker from '@/components/ExpenseTracker';
import BudgetManager from '@/components/BudgetManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'budget':
        return <BudgetManager />;
      case 'settings':
        return (
          <div className="min-h-screen bg-background p-6 lg:pl-80">
            <div className="max-w-4xl mx-auto pt-16 lg:pt-0">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Settings
              </h1>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="lg:pl-80 pt-16 lg:pt-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
