import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { Loader2, Youtube, Target, TrendingUp, Calendar, Zap, ChevronRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_PROMPT = `You are a YouTube Growth Strategist, Content Architect, SEO Expert, and Monetization Consultant.

Your task is to create a COMPLETE YOUTUBE CHANNEL STRATEGY for the given input.

The strategy must be practical, structured, and designed for long-term growth, authority building, and monetization.

Avoid generic advice. Give specific actionable ideas.

YOUR OUTPUT MUST FOLLOW THIS EXACT STRUCTURE:

# 1️⃣ CHANNEL POSITIONING

Define:
- Core niche
- Unique angle
- What makes this channel different
- Emotional value offered to viewers
- Authority positioning statement

# 2️⃣ TARGET AUDIENCE PROFILE

Describe:
- Who they are
- Their biggest problems
- What they search on YouTube
- What type of videos they binge-watch
- Their transformation goal

# 3️⃣ CONTENT PILLARS (Give 4–6)

For each pillar include:
- Pillar name
- What type of videos belong here
- Why this pillar attracts viewers
- Monetization role (growth / trust / sales)

# 4️⃣ VIDEO STRATEGY

Explain clearly:
- Shorts strategy
- Long video strategy
- Educational vs emotional mix
- Authority-building video types
- Viral video formats to use
- Series ideas for retention

# 5️⃣ 10 STARTER VIDEO IDEAS

Give 10 strong early videos.

For each include:
- Title idea
- Video angle
- Why it will perform well

# 6️⃣ SEO STRATEGY

Explain:
- Keyword approach (recommend specific tools like vidIQ, TubeBuddy, Ahrefs, or YouTube Search Auto-suggest)
- Title formula
- Thumbnail psychology
- Description structure
- Tag strategy
- How to rank as a new channel

# 7️⃣ MONETIZATION ROADMAP

Explain step-by-step:
- Phase 1 — First 1k subscribers
- Phase 2 — 1k–10k growth
- Phase 3 — Authority stage

Include:
- When to sell
- What to sell
- Lead magnet ideas
- Affiliate options
- Digital product ideas

# 8️⃣ POSTING SCHEDULE PLAN

Create a realistic weekly plan based on posting capacity.

Include:
- Shorts vs long video mix
- Batch recording strategy
- Growth timeline expectation

# 9️⃣ 90-DAY GROWTH ROADMAP

Explain what to focus on:
- Month 1 — Foundation
- Month 2 — Momentum
- Month 3 — Authority

Include:
- Key actions
- Metrics to track
- What success looks like

GLOBAL RULES:
- Use simple English
- Avoid generic advice
- Be practical, not theoretical
- Keep formatting clean using Markdown
- Avoid emojis (except the headers)
- Do not skip sections
- Focus on growth + monetization`;

export default function App() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('views');
  const [experience, setExperience] = useState('beginner');
  const [capacity, setCapacity] = useState('1-2 per week');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Channel topic is required');
      return;
    }

    setIsGenerating(true);
    setError('');
    setStrategy('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
INPUT:
Channel Topic: ${topic}
Target Audience: ${audience || 'Not specified (assume based on topic)'}
Goal: ${goal}
Experience Level: ${experience}
Posting Capacity: ${capacity}
`;

      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      for await (const chunk of response) {
        if (chunk.text) {
          setStrategy((prev) => prev + chunk.text);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate strategy. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-red-500/30 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/80 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-2 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400/20">
              <Youtube className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">YT Strategist</h1>
          </div>
          <div className="text-sm font-medium text-zinc-400 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50">
            AI-Powered Growth Plans
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-zinc-800 p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-zinc-100">
                <Target className="w-5 h-5 text-red-400" />
                Channel Details
              </h2>
              
              <form onSubmit={handleGenerate} className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Channel Topic <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Personal Finance for Gen Z"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 shadow-inner"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Target Audience <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. College students, young professionals"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition-all text-zinc-100 placeholder:text-zinc-600 shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition-all text-zinc-100 shadow-inner appearance-none"
                  >
                    <option value="views">Maximize Views & AdSense</option>
                    <option value="authority">Build Industry Authority</option>
                    <option value="affiliate">Affiliate Marketing Income</option>
                    <option value="course sales">Sell Courses/Products</option>
                    <option value="personal brand">Grow Personal Brand</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition-all text-zinc-100 shadow-inner appearance-none"
                  >
                    <option value="beginner">Beginner (Just starting)</option>
                    <option value="intermediate">Intermediate (Some videos made)</option>
                    <option value="advanced">Advanced (Experienced creator)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Posting Capacity
                  </label>
                  <select
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none transition-all text-zinc-100 shadow-inner appearance-none"
                  >
                    <option value="1 per week">1 video per week</option>
                    <option value="2-3 per week">2-3 videos per week</option>
                    <option value="daily">Daily uploads</option>
                    <option value="1-2 per month">1-2 videos per month</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating || !topic.trim()}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transform hover:-translate-y-0.5 border border-red-400/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Strategy...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Generate Strategy
                    </>
                  )}
                </button>
                
                {error && (
                  <div className="p-4 bg-red-950/50 border border-red-900 text-red-400 text-sm rounded-xl flex items-start gap-3 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </form>
            </div>
            
            {/* Info Card */}
            <div className="bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400" />
                Pro Tip
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                The more specific your channel topic and target audience, the more actionable and tailored your strategy will be. Don't be afraid to niche down!
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!strategy && !isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-zinc-800 transform rotate-3">
                    <Calendar className="w-10 h-10 text-zinc-500 transform -rotate-3" />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-200 mb-3">Ready to build your strategy</h3>
                  <p className="text-zinc-500 max-w-md leading-relaxed">
                    Fill out the form on the left with your channel details, and our AI will generate a comprehensive, step-by-step growth plan.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-zinc-800 p-6 md:p-10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="prose prose-invert prose-red max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h1:border-b prose-h1:border-zinc-800 prose-h1:pb-5 prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-zinc-300 prose-li:text-zinc-300 prose-li:my-1.5 relative z-10">
                    <ReactMarkdown>{strategy}</ReactMarkdown>
                  </div>
                  
                  {isGenerating && (
                    <div className="flex items-center gap-3 text-red-400 mt-10 pt-6 border-t border-zinc-800 relative z-10">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">AI is architecting your strategy...</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </main>
    </div>
  );
}
