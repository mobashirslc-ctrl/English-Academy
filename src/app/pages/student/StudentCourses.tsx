import { BookOpen, Clock, Users, CheckCircle, Play } from 'lucide-react';

const courses = [
  {
    title: 'Academic IELTS',
    teacher: 'Md. Rafiqul Islam',
    batch: 'Batch A2 — Morning',
    progress: 65,
    nextClass: 'Monday, 9:00 AM',
    completedTopics: 13,
    totalTopics: 24,
    modules: [
      { name: 'Listening Module', topics: 6, done: 5, status: 'in-progress' },
      { name: 'Reading Module', topics: 6, done: 4, status: 'in-progress' },
      { name: 'Writing Module', topics: 6, done: 3, status: 'in-progress' },
      { name: 'Speaking Module', topics: 6, done: 1, status: 'upcoming' },
    ],
    color: '#ea580c',
  },
  {
    title: 'Spoken English — Intermediate',
    teacher: 'Rumana Akter',
    batch: 'Batch SE-3 — Evening',
    progress: 40,
    nextClass: 'Monday, 6:00 PM',
    completedTopics: 8,
    totalTopics: 16,
    modules: [
      { name: 'Basic Communication', topics: 4, done: 4, status: 'completed' },
      { name: 'Advanced Grammar', topics: 4, done: 3, status: 'in-progress' },
      { name: 'Presentation Skills', topics: 4, done: 1, status: 'in-progress' },
      { name: 'Interview Prep', topics: 4, done: 0, status: 'upcoming' },
    ],
    color: '#0284c7',
  },
];

const resources = [
  { title: 'Cambridge IELTS 16 — Practice Papers', type: 'PDF', size: '24 MB', course: 'IELTS' },
  { title: 'Listening Section 1–4 Audio Files', type: 'Audio', size: '85 MB', course: 'IELTS' },
  { title: 'Writing Task 2 Model Answers', type: 'PDF', size: '3.2 MB', course: 'IELTS' },
  { title: 'Vocabulary Notebook — Week 1–6', type: 'PDF', size: '1.8 MB', course: 'IELTS' },
  { title: 'Grammar Basics — Recorded Class', type: 'Video', size: '450 MB', course: 'Spoken English' },
  { title: 'Business English Phrases', type: 'PDF', size: '2.1 MB', course: 'Spoken English' },
];

export function StudentCourses() {
  return (
    <div>
      <h2 className="font-bold text-foreground mb-1">My Courses</h2>
      <p className="text-muted-foreground text-sm mb-6">Track your progress across all enrolled courses</p>

      <div className="space-y-5 mb-8">
        {courses.map(course => (
          <div key={course.title} className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="h-1" style={{ background: course.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg" style={{ background: course.color + '18', color: course.color }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.teacher} • {course.batch}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: course.color }}>{course.progress}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{course.completedTopics} of {course.totalTopics} topics done</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> Next: {course.nextClass}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${course.progress}%`, background: course.color }} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {course.modules.map(mod => (
                  <div key={mod.name} className={`p-3 rounded-lg border ${mod.status === 'completed' ? 'bg-green-50 border-green-200' : mod.status === 'in-progress' ? 'border-border' : 'bg-muted/30 border-border'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${mod.status === 'completed' ? 'text-green-700' : mod.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {mod.done}/{mod.topics}
                      </span>
                      {mod.status === 'completed' && <CheckCircle size={12} className="text-green-600" />}
                      {mod.status === 'in-progress' && <Play size={12} style={{ color: course.color }} />}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">{mod.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Resource Library</h3>
          <span className="text-xs text-muted-foreground">{resources.length} files available</span>
        </div>
        <div className="divide-y divide-border">
          {resources.map((r, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`px-2 py-0.5 rounded text-xs font-medium ${r.type === 'PDF' ? 'bg-red-100 text-red-700' : r.type === 'Video' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {r.type}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.course} • {r.size}</div>
                </div>
              </div>
              <button style={{ color: '#ea580c' }} className="text-xs hover:underline font-medium">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
