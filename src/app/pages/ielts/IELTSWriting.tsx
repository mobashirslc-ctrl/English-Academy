import { useState } from 'react';
import { PenTool, Clock, CheckCircle, Send } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Task 1 — Graph Description',
    prompt: 'The graph below shows the percentage of households in the United Kingdom with different types of internet access between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    minWords: 150,
    timeLimit: 20,
    type: 'task1',
    tip: 'Begin with an overview statement, then describe key trends. Use precise language for changes: "rose sharply", "declined steadily", "remained stable".'
  },
  {
    id: 2,
    title: 'Task 2 — Essay',
    prompt: 'Some people believe that universities should focus on providing academic knowledge and skills, while others believe that universities should prepare students for real-world employment. Discuss both views and give your own opinion.',
    minWords: 250,
    timeLimit: 40,
    type: 'task2',
    tip: 'Structure: Introduction → View 1 + evidence → View 2 + evidence → Your opinion → Conclusion. Use formal connectors: "Furthermore", "In contrast", "Nevertheless".'
  }
];

export function IELTSWriting() {
  const [activeTask, setActiveTask] = useState(1);
  const [texts, setTexts] = useState<Record<number, string>>({ 1: '', 2: '' });
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const task = tasks.find(t => t.id === activeTask)!;
  const wordCount = (texts[activeTask] || '').trim().split(/\s+/).filter(Boolean).length;
  const isMinMet = wordCount >= task.minWords;

  function handleSubmit() {
    setSubmitted(p => ({ ...p, [activeTask]: true }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-foreground">IELTS Writing Module</h2>
          <p className="text-muted-foreground text-sm">Complete both tasks for a full evaluation</p>
        </div>
      </div>

      {/* Task selector */}
      <div className="flex gap-3 mb-5">
        {tasks.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTask(t.id)}
            className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-colors text-left ${activeTask === t.id ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-border bg-white text-muted-foreground hover:border-purple-200'}`}
          >
            <div className="flex items-center justify-between">
              <span>{t.title}</span>
              {submitted[t.id] && <CheckCircle size={14} className="text-green-600" />}
            </div>
            <div className="text-xs mt-0.5 font-normal text-muted-foreground">Min {t.minWords} words • {t.timeLimit} min</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Task prompt */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <PenTool size={16} style={{ color: '#7c3aed' }} />
              <span className="font-semibold text-foreground text-sm">{task.title}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{task.prompt}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="font-medium text-purple-800 text-sm mb-1">✏️ Writing Tips</div>
            <p className="text-xs text-purple-700 leading-relaxed">{task.tip}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <div className="font-semibold text-foreground text-sm mb-2">Band Descriptors</div>
            <div className="space-y-1.5">
              {['Task Achievement', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range'].map(d => (
                <div key={d} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{d}</span>
                  <span className="font-medium text-foreground">25%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Writing area */}
        <div className="lg:col-span-2">
          {submitted[activeTask] ? (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-green-600" />
                <div>
                  <div className="font-semibold text-foreground">Submitted for Evaluation</div>
                  <div className="text-sm text-muted-foreground">Your teacher will review and provide band scores within 24–48 hours</div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 text-sm text-foreground leading-relaxed mb-4 max-h-60 overflow-y-auto">
                {texts[activeTask]}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Task Achievement', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range'].map(d => (
                  <div key={d} className="bg-muted/30 rounded-lg p-3 text-center">
                    <div className="text-muted-foreground text-xs mb-1">{d}</div>
                    <div className="text-xl font-bold text-muted-foreground">—</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{task.timeLimit} minutes suggested</span>
                </div>
                <div className={`text-sm font-medium flex items-center gap-1.5 ${isMinMet ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {wordCount} words
                  {isMinMet && <CheckCircle size={14} />}
                  {!isMinMet && <span className="text-xs">({task.minWords - wordCount} more needed)</span>}
                </div>
              </div>
              <textarea
                value={texts[activeTask]}
                onChange={e => setTexts(p => ({ ...p, [activeTask]: e.target.value }))}
                placeholder={`Start writing your ${task.type === 'task1' ? 'graph description' : 'essay'} here...\n\nTip: Begin with an introduction paragraph that paraphrases the question.`}
                className="w-full p-4 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 bg-input-background leading-7"
                rows={16}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="w-full bg-muted rounded-full h-1.5 mr-4">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((wordCount / task.minWords) * 100, 100)}%`, background: isMinMet ? '#16a34a' : '#7c3aed' }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!isMinMet}
                  className="flex items-center gap-2 px-5 py-2 text-white rounded-lg text-sm flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#7c3aed' }}
                >
                  <Send size={14} /> Submit for Evaluation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
