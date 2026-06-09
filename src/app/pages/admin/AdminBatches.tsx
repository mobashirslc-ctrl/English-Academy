import { Users, Clock, BookOpen, Plus } from 'lucide-react';

const batches = [
  { id: 'A2', name: 'IELTS Batch A2', type: 'Academic IELTS', time: 'Mon/Wed/Fri 9–11 AM', teacher: 'Md. Rafiqul Islam', room: 'Room 201', branch: 'Uttara', students: 24, capacity: 25, status: 'active', startDate: '1 Dec 2024', endDate: '28 Feb 2025' },
  { id: 'A3', name: 'IELTS Batch A3', type: 'Academic IELTS', time: 'Tue/Thu/Sat 9–11 AM', teacher: 'Tanvir Ahmed', room: 'Room 202', branch: 'Mirpur', students: 18, capacity: 25, status: 'active', startDate: '8 Dec 2024', endDate: '8 Mar 2025' },
  { id: 'G1', name: 'General IELTS G1', type: 'General IELTS', time: 'Mon/Wed/Fri 4–6 PM', teacher: 'Md. Rafiqul Islam', room: 'Room 201', branch: 'Dhanmondi', students: 20, capacity: 25, status: 'active', startDate: '15 Dec 2024', endDate: '15 Mar 2025' },
  { id: 'SE-2', name: 'Spoken English SE-2', type: 'Spoken English', time: 'Mon/Thu 6–7:30 PM', teacher: 'Rumana Akter', room: 'Room 105', branch: 'Uttara', students: 15, capacity: 20, status: 'active', startDate: '5 Dec 2024', endDate: '5 Feb 2025' },
  { id: 'SE-3', name: 'Spoken English SE-3', type: 'Spoken English', time: 'Tue/Fri 6–7:30 PM', teacher: 'Rumana Akter', room: 'Room 105', branch: 'Dhanmondi', students: 12, capacity: 20, status: 'active', startDate: '10 Dec 2024', endDate: '10 Feb 2025' },
  { id: 'OB-1', name: 'Online IELTS OB-1', type: 'Online IELTS', time: 'Mon/Wed/Sat 8–10 PM', teacher: 'Nasir Uddin', room: 'Zoom', branch: 'Online', students: 22, capacity: 30, status: 'active', startDate: '1 Jan 2025', endDate: '31 Mar 2025' },
  { id: 'K2', name: 'Kids Batch K2', type: 'Kids Program', time: 'Fri/Sat 10 AM–12 PM', teacher: 'Sabrina Chowdhury', room: 'Room 110', branch: 'Dhanmondi', students: 15, capacity: 15, status: 'full', startDate: '5 Jan 2025', endDate: '5 Apr 2025' },
];

const typeColors: Record<string, string> = {
  'Academic IELTS': '#ea580c',
  'General IELTS': '#d97706',
  'Online IELTS': '#0284c7',
  'Spoken English': '#16a34a',
  'Kids Program': '#7c3aed',
};

export function AdminBatches() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Batch Management</h2>
          <p className="text-muted-foreground text-sm">All active batches across branches</p>
        </div>
        <button style={{ background: '#ea580c' }} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm">
          <Plus size={14} /> New Batch
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Batches', value: batches.length, color: '#ea580c' },
          { label: 'Active', value: batches.filter(b => b.status === 'active').length, color: '#16a34a' },
          { label: 'Full', value: batches.filter(b => b.status === 'full').length, color: '#dc2626' },
          { label: 'Total Seats', value: batches.reduce((s, b) => s + b.students, 0), color: '#0284c7' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-3 text-center">
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {batches.map(b => {
          const fillPct = Math.round((b.students / b.capacity) * 100);
          const color = typeColors[b.type] || '#ea580c';
          return (
            <div key={b.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1" style={{ background: color }} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-foreground">{b.name}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color }}>{b.type}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {b.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5"><Clock size={11} /> {b.time}</div>
                  <div className="flex items-center gap-1.5"><BookOpen size={11} /> {b.teacher}</div>
                  <div className="flex items-center gap-1.5"><Users size={11} /> {b.branch} • {b.room}</div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{b.students}/{b.capacity} students</span>
                    <span style={{ color }} className="font-medium">{fillPct}% full</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${fillPct}%`, background: color }} />
                  </div>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>Start: {b.startDate}</span>
                  <span>End: {b.endDate}</span>
                </div>

                <div className="flex gap-2">
                  <button style={{ color, borderColor: color }} className="flex-1 py-1.5 border rounded-lg text-xs hover:opacity-80">View Details</button>
                  {b.status !== 'full' && (
                    <button style={{ background: color }} className="flex-1 py-1.5 text-white rounded-lg text-xs">Enroll Student</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
