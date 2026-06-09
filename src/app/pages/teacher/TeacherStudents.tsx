import { useState } from 'react';
import { Search, Phone, TrendingUp, ChevronDown } from 'lucide-react';

const students = [
  { id: 'EP-001', name: 'Tasneem Akter', phone: '01711-111111', batch: 'IELTS A2', attendance: 87, band: 7.0, progress: 65, status: 'active' },
  { id: 'EP-002', name: 'Ariful Islam', phone: '01722-222222', batch: 'IELTS A2', attendance: 93, band: 7.5, progress: 72, status: 'active' },
  { id: 'EP-003', name: 'Nusrat Jahan', phone: '01733-333333', batch: 'IELTS A3', attendance: 78, band: 6.5, progress: 48, status: 'active' },
  { id: 'EP-004', name: 'Farhan Hossain', phone: '01744-444444', batch: 'IELTS A2', attendance: 65, band: 6.0, progress: 40, status: 'at-risk' },
  { id: 'EP-005', name: 'Sadia Rahman', phone: '01755-555555', batch: 'IELTS A3', attendance: 95, band: 7.5, progress: 80, status: 'active' },
  { id: 'EP-006', name: 'Mariam Khan', phone: '01766-666666', batch: 'SE-2', attendance: 80, band: null, progress: 55, status: 'active' },
  { id: 'EP-007', name: 'Imran Ahmed', phone: '01777-777777', batch: 'SE-2', attendance: 70, band: null, progress: 38, status: 'at-risk' },
  { id: 'EP-008', name: 'Rabeya Begum', phone: '01788-888888', batch: 'OB-1', attendance: 88, band: 6.5, progress: 60, status: 'active' },
];

export function TeacherStudents() {
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const batches = Array.from(new Set(students.map(s => s.batch)));
  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (filterBatch === '' || s.batch === filterBatch)
  );
  const selectedStudent = students.find(s => s.id === selected);

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">My Students</h2>
      <p className="text-muted-foreground text-sm mb-6">Monitor student progress and performance</p>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </div>
        <div className="relative">
          <select
            value={filterBatch}
            onChange={e => setFilterBatch(e.target.value)}
            className="pl-3 pr-8 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none appearance-none"
          >
            <option value="">All Batches</option>
            {batches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Student list */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {['Student', 'Batch', 'Attendance', 'Band', 'Progress', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(s => (
                  <tr
                    key={s.id}
                    className={`hover:bg-muted/20 transition-colors cursor-pointer ${selected === s.id ? 'bg-orange-50' : ''}`}
                    onClick={() => setSelected(s.id === selected ? null : s.id)}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div style={{ background: '#ea580c' }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{s.batch}</td>
                    <td className="p-3">
                      <span className={`font-medium ${s.attendance >= 80 ? 'text-green-600' : s.attendance >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="p-3">
                      {s.band ? <span className="font-medium" style={{ color: '#ea580c' }}>Band {s.band}</span> : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-1.5">
                          <div className="h-1.5 rounded-full" style={{ width: `${s.progress}%`, background: '#ea580c' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.status === 'active' ? 'Active' : 'At Risk'}
                      </span>
                    </td>
                    <td className="p-3">
                      <button style={{ color: '#ea580c' }} className="text-xs hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student detail panel */}
        <div>
          {selectedStudent ? (
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ background: '#ea580c' }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{selectedStudent.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedStudent.id} • {selectedStudent.batch}</div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><a href={`tel:${selectedStudent.phone}`} style={{ color: '#ea580c' }} className="flex items-center gap-1"><Phone size={12} /> {selectedStudent.phone}</a></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Attendance:</span><span className={`font-medium ${selectedStudent.attendance >= 80 ? 'text-green-600' : 'text-red-600'}`}>{selectedStudent.attendance}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">IELTS Band:</span><span className="font-medium" style={{ color: '#ea580c' }}>{selectedStudent.band ? `Band ${selectedStudent.band}` : 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Progress:</span><span className="font-medium text-foreground">{selectedStudent.progress}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status:</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedStudent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedStudent.status === 'active' ? 'Active' : 'At Risk'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <button style={{ background: '#ea580c' }} className="w-full py-2 text-white rounded-lg text-sm">Send Message</button>
                <button className="w-full py-2 border border-border rounded-lg text-sm hover:bg-muted/50">View Full Profile</button>
              </div>
              {selectedStudent.status === 'at-risk' && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                  ⚠️ This student is at risk. Attendance below 75% or performance declining. Consider a counselling session.
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <TrendingUp size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Click on a student to view their detailed profile and performance data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
