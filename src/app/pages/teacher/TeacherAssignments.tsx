import { useState } from 'react';
import { Plus, Upload, Clock, CheckCircle, Users } from 'lucide-react';

const assignments = [
  { id: 1, title: 'IELTS Writing Task 2 — Education Essay', batch: 'IELTS A2', deadline: '15 Jan 2025', submissions: 18, total: 24, status: 'active' },
  { id: 2, title: 'Listening Practice Set 4', batch: 'IELTS A2', deadline: '12 Jan 2025', submissions: 24, total: 24, status: 'closed' },
  { id: 3, title: 'Reading Passage Summary', batch: 'IELTS A3', deadline: '10 Jan 2025', submissions: 16, total: 18, status: 'closed' },
  { id: 4, title: 'Spoken English — Self Introduction Recording', batch: 'SE-2', deadline: '20 Jan 2025', submissions: 8, total: 15, status: 'active' },
];

const submissions = [
  { student: 'Tasneem Akter', assignment: 'Writing Task 2 Essay', submitted: '2h ago', wordCount: 278, status: 'pending' },
  { student: 'Ariful Islam', assignment: 'Writing Task 2 Essay', submitted: '4h ago', wordCount: 312, status: 'pending' },
  { student: 'Nusrat Jahan', assignment: 'Listening Practice Set 4', submitted: '1d ago', wordCount: null, score: 32, status: 'reviewed' },
  { student: 'Farhan Hossain', assignment: 'Reading Passage Summary', submitted: '2d ago', wordCount: 195, score: 72, status: 'reviewed' },
];

export function TeacherAssignments() {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', batch: '', deadline: '', instructions: '' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Assignments</h2>
          <p className="text-muted-foreground text-sm">Create and manage assignments for your batches</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{ background: '#ea580c' }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm hover:bg-orange-700"
        >
          <Plus size={14} /> New Assignment
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-white rounded-xl border border-border p-5 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Create New Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Assignment Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Writing Task 2 — Environment" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 bg-input-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Select Batch *</label>
              <select value={form.batch} onChange={e => setForm(p => ({ ...p, batch: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none bg-input-background">
                <option value="">-- Select batch --</option>
                <option>IELTS A2</option><option>IELTS A3</option><option>SE-2</option><option>OB-1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Deadline *</label>
              <input type="datetime-local" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none bg-input-background" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Attach File</label>
              <button className="w-full flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-muted/30">
                <Upload size={14} /> Upload PDF/Word file
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1.5">Instructions</label>
            <textarea value={form.instructions} onChange={e => setForm(p => ({ ...p, instructions: e.target.value }))} rows={3} placeholder="Detailed instructions for students..." className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 bg-input-background resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-border rounded-lg text-sm">Cancel</button>
            <button style={{ background: '#ea580c' }} className="px-5 py-2 text-white rounded-lg text-sm hover:bg-orange-700">Publish Assignment</button>
          </div>
        </div>
      )}

      {/* Active assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {assignments.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-medium text-foreground text-sm">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{a.batch}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                {a.status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Clock size={11} /> Due: {a.deadline}</span>
              <span className="flex items-center gap-1"><Users size={11} /> {a.submissions}/{a.total} submitted</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mb-3">
              <div className="h-1.5 rounded-full" style={{ width: `${(a.submissions / a.total) * 100}%`, background: '#ea580c' }} />
            </div>
            <button style={{ color: '#ea580c' }} className="text-xs hover:underline font-medium">View Submissions →</button>
          </div>
        ))}
      </div>

      {/* Submissions pending review */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Pending Reviews</h3>
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">2 pending</span>
        </div>
        <div className="divide-y divide-border">
          {submissions.map((s, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ background: '#ea580c' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {s.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{s.student}</div>
                  <div className="text-xs text-muted-foreground">{s.assignment} • {s.submitted}</div>
                  {s.wordCount && <div className="text-xs text-muted-foreground">{s.wordCount} words</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {s.score !== undefined ? (
                  <span className="text-sm font-bold" style={{ color: '#ea580c' }}>{s.score}%</span>
                ) : null}
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {s.status === 'pending' ? 'Needs Review' : 'Reviewed'}
                </span>
                {s.status === 'pending' && (
                  <button style={{ background: '#ea580c' }} className="text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-700">Grade</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
