import { useState } from 'react';
import { ClipboardList, Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const assignments = [
  { id: 1, title: 'IELTS Writing Task 2 — Education Essay', course: 'Academic IELTS', teacher: 'Tanvir Ahmed', deadline: '15 Jan 2025', status: 'pending', instructions: 'Write a 250-word essay on the topic: "Some people think that universities should focus on academic subjects rather than practical skills." Discuss both views and give your opinion.' },
  { id: 2, title: 'Listening Practice Set 4', course: 'Academic IELTS', teacher: 'Md. Rafiqul', deadline: '12 Jan 2025', status: 'submitted', submittedDate: '11 Jan 2025', score: null },
  { id: 3, title: 'Reading Passage Summary', course: 'Academic IELTS', teacher: 'Tanvir Ahmed', deadline: '8 Jan 2025', status: 'reviewed', submittedDate: '7 Jan 2025', score: 78, feedback: 'Good comprehension. Work on sentence structure and paraphrasing skills.' },
  { id: 4, title: 'Presentation — My Future Goals', course: 'Spoken English', teacher: 'Rumana Akter', deadline: '20 Jan 2025', status: 'pending', instructions: 'Prepare a 5-minute presentation about your future career goals. Focus on pronunciation and fluency.' },
  { id: 5, title: 'Grammar Exercise Set 3', course: 'Spoken English', teacher: 'Rumana Akter', deadline: '5 Jan 2025', status: 'reviewed', submittedDate: '4 Jan 2025', score: 85, feedback: 'Excellent work! Minor errors in tense usage. Keep practising conditionals.' },
];

const statusConfig = {
  pending: { label: 'Pending', color: '#d97706', bg: '#fef3c7', icon: <Clock size={12} /> },
  submitted: { label: 'Submitted', color: '#0284c7', bg: '#e0f2fe', icon: <CheckCircle size={12} /> },
  reviewed: { label: 'Reviewed', color: '#16a34a', bg: '#dcfce7', icon: <CheckCircle size={12} /> },
};

export function StudentAssignments() {
  const [selected, setSelected] = useState<number | null>(null);
  const [uploadText, setUploadText] = useState('');
  const [submitted, setSubmitted] = useState<number[]>([]);

  const pending = assignments.filter(a => a.status === 'pending');
  const done = assignments.filter(a => a.status !== 'pending');

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Assignments</h2>
      <p className="text-muted-foreground text-sm mb-6">Submit assignments and view teacher feedback</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending', value: pending.length, color: '#d97706' },
          { label: 'Submitted', value: assignments.filter(a => a.status === 'submitted').length, color: '#0284c7' },
          { label: 'Reviewed', value: assignments.filter(a => a.status === 'reviewed').length, color: '#16a34a' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending assignments */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle size={16} style={{ color: '#d97706' }} /> Pending Assignments
          </h3>
          <div className="space-y-3">
            {pending.map(a => (
              <div key={a.id} className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-50" style={{ color: '#ea580c' }}>
                      <ClipboardList size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{a.title}</h4>
                      <p className="text-xs text-muted-foreground">{a.course} • {a.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    <Clock size={11} /> Due: {a.deadline}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{a.instructions}</p>

                {selected === a.id ? (
                  <div className="border border-border rounded-lg p-4 bg-muted/20">
                    <label className="block text-sm font-medium text-foreground mb-2">Your Answer / File Upload</label>
                    <textarea
                      value={uploadText}
                      onChange={e => setUploadText(e.target.value)}
                      placeholder="Type your answer here, or describe what you're submitting..."
                      className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/30 bg-white"
                      rows={4}
                    />
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs hover:bg-muted/50">
                        <Upload size={12} /> Attach File
                      </button>
                      <div className="flex-1" />
                      <button onClick={() => setSelected(null)} className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted/50">Cancel</button>
                      <button
                        onClick={() => { setSubmitted([...submitted, a.id]); setSelected(null); }}
                        style={{ background: '#ea580c' }}
                        className="px-4 py-1.5 text-white text-xs rounded-lg hover:bg-orange-700"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  </div>
                ) : submitted.includes(a.id) ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle size={16} /> Submitted successfully!
                  </div>
                ) : (
                  <button
                    onClick={() => setSelected(a.id)}
                    style={{ background: '#ea580c' }}
                    className="flex items-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-700"
                  >
                    <Upload size={14} /> Submit Assignment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed assignments */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Submitted & Reviewed</h3>
        <div className="space-y-3">
          {done.map(a => {
            const cfg = statusConfig[a.status as keyof typeof statusConfig];
            return (
              <div key={a.id} className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{a.title}</h4>
                    <p className="text-xs text-muted-foreground">{a.course} • {a.teacher}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.score !== undefined && a.score !== null && (
                      <div className="text-center">
                        <div className="font-bold" style={{ color: '#ea580c' }}>{a.score}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    )}
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                </div>
                {a.feedback && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    <strong>Teacher Feedback:</strong> {a.feedback}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">Submitted: {a.submittedDate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
