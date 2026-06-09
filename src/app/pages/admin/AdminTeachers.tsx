import { Users, Star, BookOpen, Clock } from 'lucide-react';

const teachers = [
  { id: 'T-001', name: 'Md. Rafiqul Islam', phone: '01911-111111', role: 'Senior IELTS Trainer', branch: 'Uttara', batches: 5, students: 87, rating: 4.9, salary: 35000, join: 'Jan 2020' },
  { id: 'T-002', name: 'Rumana Akter', phone: '01922-222222', role: 'Spoken English Coach', branch: 'Uttara', batches: 4, students: 62, rating: 4.8, salary: 28000, join: 'Jun 2021' },
  { id: 'T-003', name: 'Tanvir Ahmed', phone: '01933-333333', role: 'Grammar & Writing', branch: 'Mirpur', batches: 3, students: 54, rating: 4.7, salary: 30000, join: 'Mar 2019' },
  { id: 'T-004', name: 'Sabrina Chowdhury', phone: '01944-444444', role: 'Kids Program Lead', branch: 'Dhanmondi', batches: 2, students: 38, rating: 4.9, salary: 25000, join: 'Sep 2022' },
  { id: 'T-005', name: 'Nasir Uddin', phone: '01955-555555', role: 'IELTS Trainer', branch: 'Mirpur', batches: 3, students: 48, rating: 4.6, salary: 27000, join: 'Jan 2023' },
];

export function AdminTeachers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Teachers & Staff</h2>
          <p className="text-muted-foreground text-sm">Manage teaching staff across all branches</p>
        </div>
        <button style={{ background: '#ea580c' }} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm">
          <Users size={14} /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div style={{ background: '#ea580c' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {t.name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div>
                <div className="font-semibold text-foreground">{t.name}</div>
                <div style={{ color: '#ea580c' }} className="text-xs font-medium">{t.role}</div>
                <div className="text-xs text-muted-foreground">{t.branch} Branch</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-muted/30 rounded-lg p-2 text-center">
                <div className="font-bold text-foreground">{t.batches}</div>
                <div className="text-xs text-muted-foreground">Batches</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-2 text-center">
                <div className="font-bold text-foreground">{t.students}</div>
                <div className="text-xs text-muted-foreground">Students</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-2 text-center">
                <div className="font-bold flex items-center justify-center gap-0.5 text-foreground">
                  {t.rating} <Star size={10} className="fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
              <div className="flex justify-between"><span>Phone:</span><span style={{ color: '#ea580c' }}>{t.phone}</span></div>
              <div className="flex justify-between"><span>Salary:</span><span className="font-medium text-foreground">৳{t.salary.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Joined:</span><span>{t.join}</span></div>
            </div>

            <div className="flex gap-2">
              <button style={{ color: '#ea580c', borderColor: '#ea580c' }} className="flex-1 py-1.5 border rounded-lg text-xs hover:bg-orange-50">View Profile</button>
              <button style={{ background: '#ea580c' }} className="flex-1 py-1.5 text-white rounded-lg text-xs">Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
