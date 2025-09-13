import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, PlusCircle, Target, Settings, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'expenses', label: 'Expenses', icon: PlusCircle },
    { id: 'budget', label: 'Budget', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden lg:block fixed left-6 top-6 bottom-6 w-64 shadow-elevated bg-gradient-card border-0 z-10">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FinanceTracker
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Student Edition</p>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive 
                      ? 'bg-gradient-primary text-white shadow-elevated' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleTabChange(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
          
          <div className="mt-auto pt-6 border-t">
            <div className="text-xs text-muted-foreground">
              <p>Made for students</p>
              <p>© 2024 FinanceTracker</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <Card className="fixed top-0 left-0 right-0 z-20 shadow-card bg-gradient-card border-0 rounded-none">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                FinanceTracker
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </Card>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <Card className="fixed top-16 left-4 right-4 shadow-elevated bg-gradient-card border-0">
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 h-12 ${
                        isActive 
                          ? 'bg-gradient-primary text-white shadow-elevated' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => handleTabChange(item.id)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;