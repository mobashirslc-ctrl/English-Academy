import { useState } from 'react';
import { Search, Plus, Filter, Download, Eye } from 'lucide-react';

const students = [
  { id: 'EP-2024-001', name: 'Tasneem Akter', phone: '01711-111111', parent: 'Shahidul Akter', course: 'Academic IELTS', batch: 'A2', branch: 'Uttara', admission: '1 Dec 2024', status: 'active', paid: true },
  { id: 'EP-2024-002', name: 'Ariful Islam', phone: '01722-222222', parent: 'Kamal Islam', course: 'Academic IELTS', batch: 'A2', branch: 'Uttara', admission: '1 Dec 2024', status: 'active', paid: true },
  { id: 'EP-2024-003', name: 'Nusrat Jahan', phone: '01733-333333', parent: 'Ripon Jahan', course: 'Academic IELTS', batch: 'A3', branch: 'Mirpur', admission: '5 Dec 2024', status: 'active', paid: false },
  { id: 'EP-2024-004', name: 'Farhan Hossain', phone: '01744-444444', parent: 'Rahim Hossain', course: 'Academic IELTS', batch: 'A2', branch: 'Uttara', admission: '8 Dec 2024', status: 'at-risk', paid: false },
  { id: 'EP-2024-005', name: 'Sadia Rahman', phone: '01755-555555', parent: 'Jalal Rahman', course: 'Spoken English', batch: 'SE-3', branch: 'Dhanmondi', admission: '10 Dec 2024', status: 'active', paid: true },
  { id: 'EP-2024-006', name: 'Mariam Khan', phone: '01766-666666', parent: 'Ali Khan', course: 'Spoken English', batch: 'SE-2', branch: 'Mirpur', admission: '12 Dec 2024', status: 'active', paid: true },
  { id: 'EP-2024-007', name: 'Imran Ahmed', phone: '01777-777777', parent: 'Alam Ahmed', course: 'Online IELTS', batch: 'OB-1', branch: 'Online', admission: '15 Dec 2024', status: 'inactive', paid: false },
  { id: 'EP-2024-008', name: 'Rabeya Begum', phone: '01788-888888', parent: 'Nazrul Begum', course: 'General IELTS', batch: 'G1', branch: 'Dhanmondi', admission: '18 Dec 2024', status: 'active', paid: true },
];

export function AdminStudents() {
  const [search, setSearch] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const branches = Array.from(new Set(students.map(s => s.branch)));
  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (filterBranch === '' || s.branch === filterBranch) &&
    (filterStatus === '' || s.status === filterStatus)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Student Management</h2>
          <p className="text-muted-foreground text-sm">All enrolled students across branches</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/50">
            <Download size={14} /> Export
          </button>
          <button style={{ background: '#ea580c' }} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm">
            <Plus size={14} /> Add Student
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Students', value: students.length, color: '#ea580c' },
          { label: 'Active', value: students.filter(s => s.status === 'active').length, color: '#16a34a' },
          { label: 'Fee Due', value: students.filter(s => !s.paid).length, color: '#dc2626' },
          { label: 'At Risk', value: students.filter(s => s.status === 'at-risk').length, color: '#d97706' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-3 text-center">
            <div className="font-bold text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none"
          />
        </div>
        <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none">
          <option value="">All Branches</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="at-risk">At Risk</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {['Student ID', 'Name', 'Phone', 'Parent', 'Course', 'Batch', 'Branch', 'Admission', 'Status', 'Fee', 'Action'].map(h => (
                  <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground">{s.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div style={{ background: '#ea580c' }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">{s.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{s.phone}</td>
                  <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">{s.parent}</td>
                  <td className="p-3 text-foreground text-xs whitespace-nowrap">{s.course}</td>
                  <td className="p-3 text-muted-foreground text-xs">{s.batch}</td>
                  <td className="p-3 text-muted-foreground text-xs">{s.branch}</td>
                  <td className="p-3 text-muted-foreground text-xs whitespace-nowrap">{s.admission}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : s.status === 'at-risk' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {s.paid ? 'Clear' : 'Due'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button style={{ color: '#ea580c' }} className="flex items-center gap-1 text-xs hover:underline">
                      <Eye size={11} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {students.length} students
        </div>
      </div>
    </div>
  );
}
