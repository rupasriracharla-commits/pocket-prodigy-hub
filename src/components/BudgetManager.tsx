import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Target, Plus, Pencil, Trash2, Bell } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
}

const BudgetManager = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: '1', category: 'Food & Dining', budgeted: 400, spent: 320, color: '#ef4444' },
    { id: '2', category: 'Transportation', budgeted: 200, spent: 165, color: '#f97316' },
    { id: '3', category: 'Entertainment', budgeted: 150, spent: 140, color: '#eab308' },
    { id: '4', category: 'Education', budgeted: 300, spent: 180, color: '#22c55e' },
    { id: '5', category: 'Shopping', budgeted: 100, spent: 85, color: '#8b5cf6' },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
  });

  const [totalBudgetLimit, setTotalBudgetLimit] = useState(1200);
  const [isEditingLimit, setIsEditingLimit] = useState(false);

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overallProgress = (totalSpent / totalBudgetLimit) * 100;

  const addBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in both category and amount.",
        variant: "destructive",
      });
      return;
    }

    const budget: BudgetItem = {
      id: Date.now().toString(),
      category: newBudget.category,
      budgeted: parseFloat(newBudget.amount),
      spent: 0,
      color: '#6366f1',
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: '', amount: '' });
    
    toast({
      title: "Budget Added",
      description: `Created budget for ${budget.category}`,
    });
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    toast({
      title: "Budget Deleted",
      description: "Budget has been removed.",
    });
  };

  const getBudgetStatus = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return { status: 'over', color: 'text-destructive' };
    if (percentage >= 80) return { status: 'warning', color: 'text-warning' };
    return { status: 'good', color: 'text-success' };
  };

  const getAlerts = () => {
    const alerts = [];
    
    // Overall budget alert
    if (overallProgress >= 90) {
      alerts.push({
        type: 'critical',
        message: 'You\'ve exceeded 90% of your monthly budget limit!',
        icon: AlertTriangle,
      });
    } else if (overallProgress >= 75) {
      alerts.push({
        type: 'warning',
        message: 'You\'re approaching your monthly budget limit.',
        icon: Bell,
      });
    }

    // Category-specific alerts
    budgets.forEach(budget => {
      const percentage = (budget.spent / budget.budgeted) * 100;
      if (percentage >= 100) {
        alerts.push({
          type: 'critical',
          message: `${budget.category} budget exceeded by $${(budget.spent - budget.budgeted).toFixed(2)}`,
          icon: AlertTriangle,
        });
      } else if (percentage >= 80) {
        alerts.push({
          type: 'warning',
          message: `${budget.category} budget is ${percentage.toFixed(0)}% used`,
          icon: Bell,
        });
      }
    });

    return alerts;
  };

  const alerts = getAlerts();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Budget Manager
            </h1>
            <p className="text-muted-foreground mt-2">
              Set spending limits and track your progress with smart alerts
            </p>
          </div>
        </div>

        {/* Budget Alerts */}
        {alerts.length > 0 && (
          <Card className="shadow-card border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Budget Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => {
                const Icon = alert.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background">
                    <Icon className={`h-4 w-4 ${alert.type === 'critical' ? 'text-destructive' : 'text-warning'}`} />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Overall Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Monthly Budget Limit</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditingLimit(!isEditingLimit)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditingLimit ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
                  />
                  <Button 
                    size="sm" 
                    onClick={() => setIsEditingLimit(false)}
                    className="bg-gradient-primary"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="text-2xl font-bold">${totalBudgetLimit}</div>
              )}
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                ${totalSpent.toFixed(2)} spent of ${totalBudgetLimit}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Total Budgeted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudgeted}</div>
              <p className="text-xs text-muted-foreground">
                Across {budgets.length} categories
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Remaining Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${(totalBudgetLimit - totalSpent).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Available to spend
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Budget */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Budget Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Groceries, Gas, etc."
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-amount">Monthly Budget</Label>
                <Input
                  id="budget-amount"
                  type="number"
                  placeholder="0.00"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addBudget} className="bg-gradient-primary hover:opacity-90 shadow-elevated">
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </CardContent>
        </Card>

        {/* Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.budgeted) * 100;
            const status = getBudgetStatus(budget.spent, budget.budgeted);
            const remaining = budget.budgeted - budget.spent;
            
            return (
              <Card key={budget.id} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">{budget.category}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={status.status === 'over' ? 'destructive' : status.status === 'warning' ? 'secondary' : 'default'}
                      className={status.status === 'good' ? 'bg-success text-success-foreground' : ''}
                    >
                      {percentage.toFixed(0)}%
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => deleteBudget(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Spent: ${budget.spent.toFixed(2)}</span>
                      <span>Budget: ${budget.budgeted.toFixed(2)}</span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                    {percentage > 100 && (
                      <div className="mt-1 h-1 bg-destructive rounded-full" style={{ width: `${Math.min((percentage - 100), 50)}%` }}></div>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className={`text-sm font-medium ${status.color}`}>
                      {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over budget`}
                    </span>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {budgets.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No budgets set up yet</h3>
              <p className="text-muted-foreground">
                Create your first budget category above to start tracking your spending limits.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;