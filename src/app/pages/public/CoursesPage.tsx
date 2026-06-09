import { Link } from 'react-router';
import { BookOpen, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';

const courseCategories = [
  {
    category: 'IELTS Programs',
    color: '#ea580c',
    courses: [
      {
        title: 'Academic IELTS',
        description: 'Comprehensive preparation for students applying to universities abroad. Covers all 4 modules with intensive practice.',
        duration: '3 months', sessions: '24 sessions', fee: '৳12,000', rating: 4.9, students: 245,
        features: ['Full Mock Tests', 'Speaking Evaluation', 'Writing Feedback', 'Band Prediction'],
        badge: 'Most Popular', schedule: 'Morning & Evening batches'
      },
      {
        title: 'General IELTS',
        description: 'Designed for immigration and work visa purposes. Focus on practical English skills and general training modules.',
        duration: '3 months', sessions: '24 sessions', fee: '৳10,000', rating: 4.8, students: 180,
        features: ['Task 1 & Task 2 Writing', 'GP Reading', 'Listening Practice', 'Speaking Mock'],
        badge: '', schedule: 'Morning & Evening batches'
      },
      {
        title: 'Online IELTS',
        description: 'Live online classes with the same quality as in-person training. Ideal for students outside Dhaka.',
        duration: '3 months', sessions: '24 sessions', fee: '৳9,000', rating: 4.8, students: 203,
        features: ['Live Zoom Classes', 'Recorded Sessions', 'Online Mock Tests', 'WhatsApp Support'],
        badge: 'Online', schedule: 'Flexible scheduling'
      },
    ]
  },
  {
    category: 'Spoken English',
    color: '#0284c7',
    courses: [
      {
        title: 'Beginner Spoken English',
        description: 'Start from scratch and build a solid foundation in English communication. Perfect for complete beginners.',
        duration: '2 months', sessions: '16 sessions', fee: '৳5,000', rating: 4.7, students: 312,
        features: ['Basic Grammar', 'Pronunciation Training', 'Conversational Practice', 'Vocabulary Building'],
        badge: '', schedule: 'Multiple batches daily'
      },
      {
        title: 'Intermediate Spoken English',
        description: 'Build fluency and confidence in everyday communication. For students with basic English knowledge.',
        duration: '2 months', sessions: '16 sessions', fee: '৳6,000', rating: 4.8, students: 198,
        features: ['Advanced Grammar', 'Presentation Skills', 'Debate Practice', 'Business English Intro'],
        badge: '', schedule: 'Morning & Evening'
      },
      {
        title: 'Advanced Spoken English',
        description: 'Master professional communication, public speaking, and advanced language structures.',
        duration: '2 months', sessions: '16 sessions', fee: '৳7,000', rating: 4.9, students: 134,
        features: ['Public Speaking', 'Professional Emails', 'Debate & Discussion', 'Interview Preparation'],
        badge: 'Premium', schedule: 'Evening batches'
      },
    ]
  },
  {
    category: 'Kids Program',
    color: '#16a34a',
    courses: [
      {
        title: 'Kids Spoken English (Age 6–10)',
        description: 'Fun and interactive English learning for young children. Activity-based teaching methodology.',
        duration: '3 months', sessions: '24 sessions', fee: '৳5,000', rating: 4.9, students: 156,
        features: ['Story Telling', 'Songs & Rhymes', 'Interactive Games', 'Pronunciation Focus'],
        badge: 'Kids', schedule: 'Weekend batches'
      },
      {
        title: 'Kids Spoken English (Age 11–14)',
        description: 'Structured English communication for pre-teens. Builds academic vocabulary and expression skills.',
        duration: '3 months', sessions: '24 sessions', fee: '৳5,500', rating: 4.8, students: 121,
        features: ['Essay Writing Basics', 'Debate Skills', 'Reading Comprehension', 'Grammar Foundation'],
        badge: 'Kids', schedule: 'Weekend batches'
      },
    ]
  },
  {
    category: 'English Medium Support',
    color: '#7c3aed',
    courses: [
      {
        title: 'O Level English',
        description: 'Complete preparation for CIE O Level First Language and Second Language English exams.',
        duration: '4 months', sessions: '32 sessions', fee: '৳15,000', rating: 4.9, students: 89,
        features: ['Summary Writing', 'Directed Writing', 'Literature Analysis', 'Exam Technique'],
        badge: 'Premium', schedule: 'Customized batches'
      },
      {
        title: 'A Level English',
        description: 'Advanced preparation for CIE AS and A Level English Language and Literature papers.',
        duration: '4 months', sessions: '32 sessions', fee: '৳18,000', rating: 4.9, students: 52,
        features: ['Critical Reading', 'Argument Essays', 'Comparative Analysis', 'Coursework Support'],
        badge: 'Premium', schedule: 'Small group sessions'
      },
    ]
  },
];

export function CoursesPage() {
  return (
    <div className="py-10">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)' }} className="py-12 mb-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-bold text-white mb-2">All Courses</h1>
          <p className="text-slate-400">Choose the right program for your goals — IELTS, Spoken English, Kids, or English Medium</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {courseCategories.map(cat => (
          <div key={cat.category} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: cat.color }} />
              <h2 className="font-bold text-foreground">{cat.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.courses.map(course => (
                <div key={course.title} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="p-1" style={{ background: cat.color }} />
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg" style={{ background: cat.color + '18', color: cat.color }}>
                        <BookOpen size={18} />
                      </div>
                      {course.badge && (
                        <span className="text-white text-xs px-2 py-0.5 rounded-full" style={{ background: cat.color }}>{course.badge}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {course.students}+</span>
                      <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {course.rating}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 mb-4">
                      {course.features.map(f => (
                        <div key={f} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle size={11} style={{ color: cat.color }} className="flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <div className="font-bold" style={{ color: cat.color }}>{course.fee}</div>
                        <div className="text-xs text-muted-foreground">{course.schedule}</div>
                      </div>
                      <Link to="/register" className="flex items-center gap-1 text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" style={{ background: cat.color }}>
                        Enroll <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
