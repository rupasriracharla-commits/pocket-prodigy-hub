import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  isRecurring?: boolean;
}

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 45.99, description: 'Grocery shopping', category: 'Food & Dining', date: '2024-01-15' },
    { id: '2', amount: 12.50, description: 'Bus ticket', category: 'Transportation', date: '2024-01-14' },
    { id: '3', amount: 25.00, description: 'Movie ticket', category: 'Entertainment', date: '2024-01-13' },
    { id: '4', amount: 89.99, description: 'Textbook', category: 'Education', date: '2024-01-12' },
    { id: '5', amount: 8.75, description: 'Coffee', category: 'Food & Dining', date: '2024-01-11' },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: '',
    description: '',
    category: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Education',
    'Shopping',
    'Health & Fitness',
    'Bills & Utilities',
    'Other'
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food & Dining': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Transportation': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Entertainment': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Education': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Shopping': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Health & Fitness': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'Bills & Utilities': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Other': 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[category] || colors['Other'];
  };

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.description || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add an expense.",
        variant: "destructive",
      });
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ amount: '', description: '', category: '' });
    
    toast({
      title: "Expense Added",
      description: `Added $${expense.amount} for ${expense.description}`,
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed from your records.",
    });
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Add and categorize your expenses with smart suggestions
            </p>
          </div>
          <Card className="bg-gradient-success text-white border-0 shadow-elevated">
            <CardContent className="p-4">
              <div className="text-sm opacity-90">Total This Month</div>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addExpense} className="bg-gradient-primary hover:opacity-90 shadow-elevated">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} found
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{expense.description}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={getCategoryColor(expense.category)}>
                          {expense.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">${expense.amount.toFixed(2)}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteExpense(expense.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredExpenses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No expenses found. Add your first expense above!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;