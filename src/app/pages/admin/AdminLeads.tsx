import { useState } from 'react';
import { Plus, Search, Phone, MessageSquare, ChevronDown, Filter } from 'lucide-react';

const allLeads = [
  { id: 'L-001', name: 'Kamrul Hassan', phone: '01811-111111', course: 'Academic IELTS', source: 'Facebook', status: 'new', counsellor: 'Sadia', date: '9 Jan 2025', followUps: [] },
  { id: 'L-002', name: 'Sumaiya Khatun', phone: '01822-222222', course: 'Spoken English', source: 'WhatsApp', status: 'follow-up', counsellor: 'Imran', date: '8 Jan 2025', followUps: ['Called — no answer', 'Sent WhatsApp'] },
  { id: 'L-003', name: 'Tanveer Ahmed', phone: '01833-333333', course: 'Online IELTS', source: 'Website', status: 'interested', counsellor: 'Sadia', date: '7 Jan 2025', followUps: ['Called — very interested', 'Sent brochure via email'] },
  { id: 'L-004', name: 'Rokshana Begum', phone: '01844-444444', course: 'Kids Program', source: 'Walk-in', status: 'converted', counsellor: 'Imran', date: '5 Jan 2025', followUps: ['Met in person', 'Enrolled — Batch K2'] },
  { id: 'L-005', name: 'Raisul Islam', phone: '01855-555555', course: 'Academic IELTS', source: 'Facebook', status: 'lost', counsellor: 'Sadia', date: '3 Jan 2025', followUps: ['No response after 3 follow-ups'] },
  { id: 'L-006', name: 'Habiba Sultana', phone: '01866-666666', course: 'General IELTS', source: 'WhatsApp', status: 'new', counsellor: 'Imran', date: '9 Jan 2025', followUps: [] },
  { id: 'L-007', name: 'Sabbir Khan', phone: '01877-777777', course: 'O Level', source: 'Website', status: 'interested', counsellor: 'Sadia', date: '6 Jan 2025', followUps: ['Demo class attended', 'Thinking about it'] },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'New Lead', color: '#1d4ed8', bg: '#dbeafe' },
  'follow-up': { label: 'Follow-up', color: '#b45309', bg: '#fef3c7' },
  interested: { label: 'Interested', color: '#6d28d9', bg: '#ede9fe' },
  converted: { label: 'Converted', color: '#15803d', bg: '#dcfce7' },
  lost: { label: 'Lost', color: '#b91c1c', bg: '#fee2e2' },
};

const sourceColors: Record<string, string> = {
  'Facebook': '#1877f2',
  'WhatsApp': '#25d366',
  'Website': '#ea580c',
  'Walk-in': '#7c3aed',
};

export function AdminLeads() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const filtered = allLeads.filter(l =>
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.course.toLowerCase().includes(search.toLowerCase())) &&
    (filterStatus === '' || l.status === filterStatus)
  );

  const selectedLead = allLeads.find(l => l.id === selected);

  const statusCounts = Object.fromEntries(
    Object.keys(statusConfig).map(k => [k, allLeads.filter(l => l.status === k).length])
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-foreground mb-1">Lead Management (CRM)</h2>
          <p className="text-muted-foreground text-sm">Track and convert prospective students</p>
        </div>
        <button style={{ background: '#ea580c' }} className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm hover:bg-orange-700">
          <Plus size={14} /> Add Lead
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(filterStatus === key ? '' : key)}
            className={`p-3 rounded-xl border text-center transition-colors ${filterStatus === key ? 'border-orange-400' : 'border-border bg-white hover:border-orange-200'}`}
          >
            <div className="font-bold text-2xl" style={{ color: cfg.color }}>{statusCounts[key]}</div>
            <div className="text-xs text-muted-foreground">{cfg.label}</div>
          </button>
        ))}
      </div>

      {/* Search and filter */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or course..."
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none"
          />
        </div>
        <div className="relative">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="pl-3 pr-8 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none appearance-none">
            <option value="">All Status</option>
            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <Filter size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Leads table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {['Lead', 'Course', 'Source', 'Status', 'Counsellor', 'Date'].map(h => (
                    <th key={h} className="text-left p-3 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(lead => {
                  const cfg = statusConfig[lead.status];
                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-muted/20 cursor-pointer transition-colors ${selected === lead.id ? 'bg-orange-50' : ''}`}
                      onClick={() => setSelected(lead.id === selected ? null : lead.id)}
                    >
                      <td className="p-3">
                        <div className="font-medium text-foreground">{lead.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={10} /> {lead.phone}</div>
                      </td>
                      <td className="p-3 text-muted-foreground text-xs">{lead.course}</td>
                      <td className="p-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ background: sourceColors[lead.source] || '#6b7280' }}>
                          {lead.source}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground text-xs">{lead.counsellor}</td>
                      <td className="p-3 text-muted-foreground text-xs">{lead.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead detail */}
        <div>
          {selectedLead ? (
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ background: '#ea580c' }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{selectedLead.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedLead.id}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span style={{ color: '#ea580c' }}>{selectedLead.phone}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Course:</span><span>{selectedLead.course}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Source:</span><span>{selectedLead.source}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Counsellor:</span><span>{selectedLead.counsellor}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <select className="border border-border rounded px-2 py-0.5 text-xs bg-white focus:outline-none">
                    {Object.entries(statusConfig).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <div className="font-medium text-foreground text-sm mb-2">Follow-up History</div>
                {selectedLead.followUps.length > 0 ? (
                  <div className="space-y-1">
                    {selectedLead.followUps.map((note, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 flex-shrink-0" />
                        {note}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No follow-ups yet</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Add follow-up note..."
                  className="flex-1 px-2 py-1.5 border border-border rounded-lg text-xs focus:outline-none bg-input-background"
                />
                <button style={{ background: '#ea580c' }} className="text-white px-3 py-1.5 rounded-lg text-xs">Add</button>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-border rounded-lg text-xs hover:bg-muted/50">
                  <Phone size={12} /> Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-border rounded-lg text-xs hover:bg-muted/50">
                  <MessageSquare size={12} /> WhatsApp
                </button>
                <button style={{ background: '#16a34a' }} className="flex-1 flex items-center justify-center gap-1 py-2 text-white rounded-lg text-xs">
                  Convert
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <MessageSquare size={28} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Select a lead to view details and follow-up history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
