import { DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const income = [
  { category: 'Admission Fees', amount: 45000, count: 45 },
  { category: 'Monthly Fees', amount: 218000, count: 218 },
  { category: 'Mock Test Fees', amount: 12500, count: 25 },
  { category: 'Exam Fees', amount: 8000, count: 16 },
];

const expenses = [
  { category: 'Teacher Salaries', amount: 145000 },
  { category: 'Rent', amount: 35000 },
  { category: 'Marketing', amount: 15000 },
  { category: 'Utilities', amount: 8000 },
  { category: 'Stationery & Materials', amount: 5000 },
  { category: 'Miscellaneous', amount: 4000 },
];

const recentTransactions = [
  { id: 'TXN-001', student: 'Tasneem Akter', type: 'Monthly Fee', amount: 4000, method: 'bKash', date: '9 Jan 2025', status: 'success' },
  { id: 'TXN-002', student: 'Ariful Islam', type: 'Monthly Fee', amount: 4000, method: 'bKash', date: '9 Jan 2025', status: 'success' },
  { id: 'TXN-003', student: 'Nusrat Jahan', type: 'Monthly Fee', amount: 4000, method: 'Nagad', date: '8 Jan 2025', status: 'success' },
  { id: 'TXN-004', student: 'Mariam Khan', type: 'Admission Fee', amount: 1000, method: 'Cash', date: '7 Jan 2025', status: 'success' },
  { id: 'TXN-005', student: 'Sadia Rahman', type: 'Mock Test Fee', amount: 500, method: 'bKash', date: '6 Jan 2025', status: 'success' },
];

const totalIncome = income.reduce((s, i) => s + i.amount, 0);
const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
const profit = totalIncome - totalExpenses;

const chartData = [
  { name: 'Income', amount: totalIncome, color: '#16a34a' },
  { name: 'Expenses', amount: totalExpenses, color: '#dc2626' },
  { name: 'Profit', amount: profit, color: '#ea580c' },
];

export function AdminAccounts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Accounts Module</h2>
          <p className="text-muted-foreground text-sm">January 2025 financial summary</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted/50">
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-50 text-green-600"><TrendingUp size={18} /></div>
            <span className="text-sm text-muted-foreground">Total Income</span>
          </div>
          <div className="font-bold text-3xl text-green-600">৳{totalIncome.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">4 income categories</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-50 text-red-600"><TrendingDown size={18} /></div>
            <span className="text-sm text-muted-foreground">Total Expenses</span>
          </div>
          <div className="font-bold text-3xl text-red-600">৳{totalExpenses.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">6 expense categories</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-50" style={{ color: '#ea580c' }}><DollarSign size={18} /></div>
            <span className="text-sm text-muted-foreground">Net Profit</span>
          </div>
          <div className="font-bold text-3xl" style={{ color: '#ea580c' }}>৳{profit.toLocaleString()}</div>
          <div className="text-xs text-green-600 font-medium mt-1">Margin: {Math.round((profit/totalIncome)*100)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* P&L chart */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Profit & Loss</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`৳${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income breakdown */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Income Breakdown</h3>
          <div className="space-y-3">
            {income.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.category}</span>
                  <span className="font-medium text-green-600">৳{item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${(item.amount / totalIncome) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense breakdown */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {expenses.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{item.category}</span>
                  <span className="font-medium text-red-600">৳{item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${(item.amount / totalExpenses) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <span className="text-xs text-muted-foreground">{recentTransactions.length} transactions today</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['TXN ID', 'Student', 'Type', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTransactions.map(t => (
                <tr key={t.id} className="hover:bg-muted/20">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="p-3 font-medium text-foreground">{t.student}</td>
                  <td className="p-3 text-muted-foreground">{t.type}</td>
                  <td className="p-3 font-semibold text-green-600">৳{t.amount.toLocaleString()}</td>
                  <td className="p-3 text-muted-foreground">{t.method}</td>
                  <td className="p-3 text-muted-foreground text-xs">{t.date}</td>
                  <td className="p-3">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ {t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
