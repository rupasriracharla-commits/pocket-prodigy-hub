import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Plus } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const totalBalance = 2450.50;
  const monthlyIncome = 1200;
  const monthlyExpenses = 985.20;
  const budgetUsed = 78;
  
  const expenseData = [
    { name: 'Food & Dining', value: 380, color: '#ef4444' },
    { name: 'Transportation', value: 220, color: '#f97316' },
    { name: 'Entertainment', value: 150, color: '#eab308' },
    { name: 'Education', value: 180, color: '#22c55e' },
    { name: 'Other', value: 55.20, color: '#6366f1' },
  ];

  const spendingTrend = [
    { month: 'Aug', amount: 920 },
    { month: 'Sep', amount: 1050 },
    { month: 'Oct', amount: 890 },
    { month: 'Nov', amount: 1120 },
    { month: 'Dec', amount: 985 },
  ];

  const goals = [
    { name: 'Emergency Fund', current: 1200, target: 3000, deadline: '6 months' },
    { name: 'Laptop Upgrade', current: 450, target: 1200, deadline: '3 months' },
    { name: 'Spring Break Trip', current: 280, target: 800, deadline: '4 months' },
  ];

  const predictedSpending = [
    { category: 'Food & Dining', predicted: 420, current: 380 },
    { category: 'Transportation', predicted: 240, current: 220 },
    { category: 'Entertainment', predicted: 180, current: 150 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Student Finance Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your expenses, reach your goals, and make smarter financial decisions
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-elevated">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-success" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${monthlyIncome}</div>
              <p className="text-xs text-muted-foreground">
                From part-time job & allowance
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-expense" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense">${monthlyExpenses}</div>
              <p className="text-xs text-muted-foreground">
                -8% vs budget limit
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{budgetUsed}%</div>
              <Progress value={budgetUsed} className="mt-2" />
              {budgetUsed > 75 && (
                <p className="text-xs text-warning flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Approaching limit
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">This month's spending by category</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Spending Trend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Spending Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Monthly spending over time</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Spending']} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Goals */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <p className="text-sm text-muted-foreground">Track your savings progress</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.name}</h4>
                      <Badge variant="outline">{goal.deadline}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${goal.current} / ${goal.target}</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Predictive Analytics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Spending Predictions</CardTitle>
              <p className="text-sm text-muted-foreground">AI-powered spending forecasts</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={predictedSpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#22c55e" name="Current" />
                    <Bar dataKey="predicted" fill="#f97316" name="Predicted" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span>Current Spending</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-warning rounded"></div>
                  <span>Predicted Spending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;