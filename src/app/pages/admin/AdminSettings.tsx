import { useState } from 'react';
import { Save, Building2, Bell, Lock, Globe, MessageSquare } from 'lucide-react';

export function AdminSettings() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">Settings</h2>
      <p className="text-muted-foreground text-sm mb-6">Configure system preferences for EnglishPro Academy</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border p-3 space-y-1">
            {[
              { label: 'Academy Info', icon: <Building2 size={15} />, active: true },
              { label: 'Notifications', icon: <Bell size={15} />, active: false },
              { label: 'Security', icon: <Lock size={15} />, active: false },
              { label: 'SMS / WhatsApp', icon: <MessageSquare size={15} />, active: false },
              { label: 'Website', icon: <Globe size={15} />, active: false },
            ].map(item => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${item.active ? 'text-white' : 'text-muted-foreground hover:bg-muted/50'}`}
                style={item.active ? { background: '#ea580c' } : {}}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings panel */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Building2 size={16} /> Academy Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Academy Name</label>
                  <input defaultValue="EnglishPro Academy" className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                  <input defaultValue="+880 1700-000000" className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <input defaultValue="info@englishpro.com.bd" className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Website URL</label>
                <input defaultValue="www.englishpro.com.bd" className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Branch Management</h3>
            <div className="space-y-3">
              {['Uttara Branch', 'Mirpur Branch', 'Dhanmondi Branch', 'Online Branch'].map(b => (
                <div key={b} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-2">
                    <div style={{ background: '#ea580c' }} className="w-2 h-2 rounded-full" />
                    <span className="text-sm text-foreground">{b}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                    <button style={{ color: '#ea580c' }} className="text-xs hover:underline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 text-sm flex items-center gap-1" style={{ color: '#ea580c' }}>+ Add New Branch</button>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Fee Configuration</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Admission Fee', value: '৳1,000' },
                { label: 'IELTS Monthly Fee', value: '৳4,000' },
                { label: 'Spoken English Fee', value: '৳2,500' },
                { label: 'Mock Test Fee', value: '৳500' },
                { label: 'O Level Fee', value: '৳5,000' },
                { label: 'Kids Program Fee', value: '৳2,000' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
                  <input defaultValue={f.value} className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-background focus:outline-none focus:ring-2 focus:ring-orange-500/30" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
              style={{ background: '#ea580c' }}
              className="flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-sm hover:bg-orange-700"
            >
              <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
