import { Link } from 'react-router';
import { ArrowRight, Star, Users, Award, BookOpen, Play, CheckCircle, ChevronRight, Phone, MapPin, Clock, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const successData = [
  { month: 'Jan', band7: 12, band8: 4 },
  { month: 'Feb', band7: 18, band8: 7 },
  { month: 'Mar', band7: 22, band8: 9 },
  { month: 'Apr', band7: 28, band8: 12 },
  { month: 'May', band7: 35, band8: 15 },
  { month: 'Jun', band7: 42, band8: 19 },
];

const courses = [
  { title: 'Academic IELTS', level: 'All Levels', duration: '3 months', fee: '৳12,000', students: 245, rating: 4.9, badge: 'Most Popular' },
  { title: 'General IELTS', level: 'Beginner–Advanced', duration: '3 months', fee: '৳10,000', students: 180, rating: 4.8, badge: '' },
  { title: 'Spoken English', level: 'Beginner', duration: '2 months', fee: '৳6,000', students: 312, rating: 4.7, badge: 'Trending' },
  { title: 'Kids Spoken English', level: 'Age 6–14', duration: '3 months', fee: '৳5,000', students: 156, rating: 4.9, badge: '' },
  { title: 'Online IELTS', level: 'All Levels', duration: '3 months', fee: '৳9,000', students: 203, rating: 4.8, badge: 'Online' },
  { title: 'English Medium Support', level: 'O & A Level', duration: '4 months', fee: '৳15,000', students: 89, rating: 4.9, badge: '' },
];

const testimonials = [
  { name: 'Fatima Begum', score: 'IELTS Band 8.0', text: 'EnglishPro Academy transformed my English skills. The teachers are incredibly dedicated and the study materials are world-class. I achieved Band 8.0 on my first attempt!', avatar: 'FB', batch: 'Academic IELTS • Uttara' },
  { name: 'Ariful Islam', score: 'IELTS Band 7.5', text: 'The mock tests and weekly evaluations really helped me identify my weak areas. The speaking sessions with native-level trainers boosted my confidence significantly.', avatar: 'AI', batch: 'Academic IELTS • Mirpur' },
  { name: 'Nusrat Jahan', score: 'IELTS Band 7.0', text: 'As a working professional, the evening batch schedule was perfect for me. Online resources and recorded classes helped me revise at my own pace. Highly recommended!', avatar: 'NJ', batch: 'General IELTS • Online' },
];

const teachers = [
  { name: 'Md. Rafiqul Islam', role: 'Senior IELTS Trainer', exp: '12 years', score: 'Scored Band 9.0', avatar: 'RI' },
  { name: 'Rumana Akter', role: 'Spoken English Coach', exp: '8 years', score: 'CELTA Certified', avatar: 'RA' },
  { name: 'Tanvir Ahmed', role: 'Grammar & Writing', exp: '10 years', score: 'M.A. English Literature', avatar: 'TA' },
  { name: 'Sabrina Chowdhury', role: 'Kids Program Lead', exp: '6 years', score: 'Child Psychology Diploma', avatar: 'SC' },
];

const upcomingBatches = [
  { name: 'Academic IELTS — Morning', start: '15 Jan 2025', time: '9:00–11:00 AM', seats: 8, branch: 'Uttara' },
  { name: 'Spoken English — Evening', start: '20 Jan 2025', time: '6:00–7:30 PM', seats: 12, branch: 'Mirpur' },
  { name: 'Online IELTS Intensive', start: '22 Jan 2025', time: '8:00–10:00 PM', seats: 5, branch: 'Online' },
  { name: 'Kids Program — Weekend', start: '25 Jan 2025', time: '10:00 AM–12:00 PM', seats: 15, branch: 'Dhanmondi' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #1a1a2e 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full" style={{ background: '#ea580c', filter: 'blur(80px)' }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full" style={{ background: '#f97316', filter: 'blur(100px)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-orange-300 mb-6">
              <Star size={12} className="fill-orange-400 text-orange-400" /> Bangladesh's #1 English Coaching Institute
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Transform Your<br />
              <span style={{ color: '#f97316' }}>English Skills</span><br />
              with Experts
            </h1>
            <p className="text-slate-400 text-lg mb-6">
              IELTS | Spoken English | Kids Spoken | English Medium Programs<br />
              <span className="text-slate-500 text-base">4 Branches across Bangladesh • 5,000+ Success Stories</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register" style={{ background: '#ea580c' }} className="flex items-center gap-2 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium">
                Enroll Now <ArrowRight size={16} />
              </Link>
              <Link to="/mock-test" className="flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                <Play size={16} /> Free Mock Test
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Free Consultation</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Expert Teachers</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Online Classes</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">Monthly Success Rate</span>
                <span className="text-green-400 text-sm flex items-center gap-1"><TrendingUp size={14} /> +28% this year</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={successData}>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }} />
                  <Area type="monotone" dataKey="band7" name="Band 7+" stroke="#ea580c" fill="url(#grad1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="band8" name="Band 8+" stroke="#22c55e" fill="none" strokeWidth={2} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[{ v: '5,200+', l: 'Students' }, { v: '94%', l: 'Success' }, { v: 'Band 7+', l: 'Average' }].map(s => (
                  <div key={s.l} className="text-center bg-white/5 rounded-lg py-2">
                    <div style={{ color: '#f97316' }} className="font-bold">{s.v}</div>
                    <div className="text-xs text-slate-400">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Users size={20} />, value: '5,200+', label: 'Total Students' },
            { icon: <Award size={20} />, value: '94%', label: 'IELTS Success Rate' },
            { icon: <BookOpen size={20} />, value: '12+', label: 'Expert Teachers' },
            { icon: <MapPin size={20} />, value: '4', label: 'Branches' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-3">
              <div style={{ background: '#fff7ed', color: '#ea580c' }} className="p-2.5 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <div className="font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-bold text-foreground">Our Courses</h2>
              <p className="text-muted-foreground text-sm mt-1">Expert-designed programs for every level</p>
            </div>
            <Link to="/courses" style={{ color: '#ea580c' }} className="text-sm flex items-center gap-1 hover:underline font-medium">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <div key={course.title} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-3">
                  <div style={{ background: '#fff7ed', color: '#ea580c' }} className="p-2 rounded-lg">
                    <BookOpen size={18} />
                  </div>
                  {course.badge && (
                    <span style={{ background: '#ea580c' }} className="text-white text-xs px-2 py-0.5 rounded-full">{course.badge}</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{course.level} • {course.duration}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users size={12} /> {course.students} students</span>
                  <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {course.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold" style={{ color: '#ea580c' }}>{course.fee}</span>
                  <Link to="/register" style={{ background: '#ea580c' }} className="text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-700 transition-colors">
                    Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-bold text-foreground">Upcoming Batches</h2>
            <p className="text-muted-foreground text-sm mt-1">Limited seats — register early to secure your spot</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBatches.map(batch => (
              <div key={batch.name} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div style={{ background: '#fff7ed', color: '#ea580c' }} className="p-2 rounded-lg flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{batch.name}</div>
                    <div className="text-xs text-muted-foreground">{batch.time} • {batch.branch}</div>
                    <div className="text-xs text-muted-foreground">Starts: {batch.start}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-red-600">{batch.seats} seats left</div>
                  <Link to="/register" style={{ color: '#ea580c' }} className="text-xs hover:underline font-medium">Register →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="font-bold text-foreground">Meet Our Expert Trainers</h2>
            <p className="text-muted-foreground text-sm mt-1">Qualified professionals with proven track records</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teachers.map(t => (
              <div key={t.name} className="bg-white rounded-xl p-5 text-center border border-border hover:shadow-md transition-shadow">
                <div style={{ background: '#ea580c' }} className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold mx-auto mb-3">
                  {t.avatar}
                </div>
                <div className="font-semibold text-sm text-foreground">{t.name}</div>
                <div style={{ color: '#ea580c' }} className="text-xs font-medium mt-0.5">{t.role}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.exp} exp</div>
                <div className="text-xs text-muted-foreground">{t.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="font-bold text-foreground">Student Success Stories</h2>
            <p className="text-muted-foreground text-sm mt-1">Real results from real students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-muted/30 rounded-xl p-6 border border-border">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div style={{ background: '#ea580c' }} className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div style={{ color: '#ea580c' }} className="text-xs font-semibold">{t.score}</div>
                    <div className="text-xs text-muted-foreground">{t.batch}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)' }} className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-bold text-white mb-3">Ready to Start Your IELTS Journey?</h2>
          <p className="text-orange-100 mb-6">Book a free consultation today and get a personalized study plan</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register" className="bg-white px-6 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors" style={{ color: '#ea580c' }}>
              Book Free Consultation
            </Link>
            <a href="tel:+8801700000000" className="border border-white/50 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
