import { CreditCard, CheckCircle, Clock, Download, AlertCircle } from 'lucide-react';

const payments = [
  { id: 'INV-2025-001', type: 'Monthly Fee', course: 'Academic IELTS', month: 'January 2025', amount: 4000, status: 'paid', date: '3 Jan 2025', method: 'bKash' },
  { id: 'INV-2024-012', type: 'Monthly Fee', course: 'Spoken English', month: 'January 2025', amount: 2500, status: 'paid', date: '3 Jan 2025', method: 'bKash' },
  { id: 'INV-2024-011', type: 'Mock Test Fee', course: 'Academic IELTS', month: 'January 2025', amount: 500, status: 'paid', date: '10 Jan 2025', method: 'Cash' },
  { id: 'INV-2025-002', type: 'Monthly Fee', course: 'Academic IELTS', month: 'February 2025', amount: 4000, status: 'due', dueDate: '10 Feb 2025', method: '' },
  { id: 'INV-2025-003', type: 'Monthly Fee', course: 'Spoken English', month: 'February 2025', amount: 2500, status: 'due', dueDate: '10 Feb 2025', method: '' },
  { id: 'INV-2024-010', type: 'Admission Fee', course: 'Academic IELTS', month: 'Dec 2024', amount: 1000, status: 'paid', date: '1 Dec 2024', method: 'Nagad' },
];

const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
const totalDue = payments.filter(p => p.status === 'due').reduce((s, p) => s + p.amount, 0);

export function StudentPayments() {
  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Payments</h2>
      <p className="text-muted-foreground text-sm mb-6">Fee history and upcoming payments</p>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50 text-green-600"><CheckCircle size={18} /></div>
            <div>
              <div className="font-bold text-foreground">৳{totalPaid.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Paid</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50 text-red-600"><AlertCircle size={18} /></div>
            <div>
              <div className="font-bold text-red-600">৳{totalDue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Due</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-50" style={{ color: '#ea580c' }}><CreditCard size={18} /></div>
            <div>
              <div className="font-bold text-foreground">6</div>
              <div className="text-xs text-muted-foreground">Total Transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Due payments alert */}
      {totalDue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-red-800">You have ৳{totalDue.toLocaleString()} in pending fees</div>
            <p className="text-sm text-red-700 mt-0.5">Due by 10 February 2025. Pay now to avoid late fees.</p>
            <button style={{ background: '#ea580c' }} className="mt-3 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-orange-700">
              Pay Now via bKash / Nagad
            </button>
          </div>
        </div>
      )}

      {/* Payment history */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Invoice', 'Type', 'Course', 'Amount', 'Status', 'Date/Due', 'Method', 'Action'].map(h => (
                  <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-mono text-xs text-foreground">{p.id}</td>
                  <td className="p-3 text-foreground whitespace-nowrap">{p.type}</td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{p.course}</td>
                  <td className="p-3 font-semibold text-foreground">৳{p.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.status === 'paid' ? <CheckCircle size={11} /> : <Clock size={11} />}
                      {p.status === 'paid' ? 'Paid' : 'Due'}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground whitespace-nowrap text-xs">{p.date || p.dueDate}</td>
                  <td className="p-3 text-muted-foreground text-xs">{p.method || '—'}</td>
                  <td className="p-3">
                    {p.status === 'paid' ? (
                      <button style={{ color: '#ea580c' }} className="flex items-center gap-1 text-xs hover:underline">
                        <Download size={11} /> Invoice
                      </button>
                    ) : (
                      <button style={{ background: '#ea580c' }} className="text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-700">
                        Pay
                      </button>
                    )}
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
