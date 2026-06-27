import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Award, CheckCircle2, Bookmark, Search, Filter, ArrowRight, 
  ChevronRight, ChevronDown, Clock, Flame, ShieldAlert, Lightbulb, Play, 
  RefreshCw, Sliders, Download, Sparkles, Activity, FileText, Check, 
  Trash2, HelpCircle, Trophy, Eye, Sparkle, User, GraduationCap, MapPin, 
  ArrowUpRight, BookMarked, ToggleLeft, ToggleRight, AlertCircle, X, ChevronLeft,
  Sun, Moon
} from 'lucide-react';
import { getQuestionDetails } from './data/questionDetails';
import { rawQuestions, chapters } from './data/questionsData';
import { cheatsheets } from './data/cheatsheets';
import { Question, Difficulty, UserProgress } from './types';

export default function App() {
  // --- DARK MODE SYSTEM STATE ---
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('react_handbook_dark_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('react_handbook_dark_mode', String(next));
      return next;
    });
  };

  // --- CORE SYSTEM STATE ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'handbook' | 'cheatsheets' | 'mock' | 'flashcards' | 'print'>('dashboard');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);

  useEffect(() => {
    setActiveFileIndex(0);
  }, [selectedQuestionId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarks' | 'completed'>('all');
  
  // --- USER DATA & PROGRESS PERSISTENCE ---
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [customNotes, setCustomNotes] = useState<Record<number, string>>({});
  const [activeNote, setActiveNote] = useState('');

  // Load local storage progress
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('react_handbook_progress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.completed) setCompleted(parsed.completed);
        if (parsed.customNotes) setCustomNotes(parsed.customNotes);
      }
    } catch (e) {
      console.error("Error reading local storage", e);
    }
  }, []);

  // Save progress
  const saveProgress = (newBookmarks: number[], newCompleted: number[], newNotes: Record<number, string>) => {
    try {
      localStorage.setItem('react_handbook_progress', JSON.stringify({
        bookmarks: newBookmarks,
        completed: newCompleted,
        customNotes: newNotes
      }));
    } catch (e) {
      console.error("Error saving local storage", e);
    }
  };

  const toggleBookmark = (id: number) => {
    const updated = bookmarks.includes(id) 
      ? bookmarks.filter(b => b !== id) 
      : [...bookmarks, id];
    setBookmarks(updated);
    saveProgress(updated, completed, customNotes);
  };

  const toggleCompleted = (id: number) => {
    const updated = completed.includes(id) 
      ? completed.filter(c => c !== id) 
      : [...completed, id];
    setCompleted(updated);
    saveProgress(bookmarks, updated, customNotes);
  };

  const saveNoteForQuestion = (id: number, text: string) => {
    const updated = { ...customNotes, [id]: text };
    setCustomNotes(updated);
    saveProgress(bookmarks, completed, updated);
  };

  useEffect(() => {
    setActiveNote(customNotes[selectedQuestionId] || '');
  }, [selectedQuestionId, customNotes]);

  // --- PRACTICE RESPONDER TIMER STATE ---
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setPracticeTimer(p => p + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const resetPracticeTimer = () => {
    setIsTimerRunning(false);
    setPracticeTimer(0);
  };

  // --- MOCK INTERVIEW SIMULATOR STATE ---
  const [mockActive, setMockActive] = useState(false);
  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);
  const [mockIndex, setMockIndex] = useState(0);
  const [mockRatings, setMockRatings] = useState<Record<number, 'excellent' | 'good' | 'needs-work'>>({});
  const [mockRevealed, setMockRevealed] = useState(false);
  const [mockCompleted, setMockCompleted] = useState(false);

  const startMockInterview = (chapterId: number | 'all') => {
    const pool = rawQuestions.filter(q => chapterId === 'all' || q.chapterId === chapterId);
    // Shuffle and pick 5
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    const detailedPool = shuffled.map(q => getQuestionDetails(q.id));
    
    setMockQuestions(detailedPool);
    setMockIndex(0);
    setMockRatings({});
    setMockRevealed(false);
    setMockCompleted(false);
    setMockActive(true);
    resetPracticeTimer();
    setIsTimerRunning(true);
  };

  // --- FLASHCARD STATE ---
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const flashQuestions = rawQuestions.slice(0, 30); // Practice first 30 essential questions

  // --- QUESTION SEARCH & FILTER ENGINE ---
  const filteredQuestions = rawQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.id.toString() === searchQuery;
    const matchesChapter = selectedChapterId === 'all' || q.chapterId === selectedChapterId;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    
    if (filterMode === 'bookmarks') {
      return matchesSearch && matchesChapter && matchesDifficulty && bookmarks.includes(q.id);
    }
    if (filterMode === 'completed') {
      return matchesSearch && matchesChapter && matchesDifficulty && completed.includes(q.id);
    }
    return matchesSearch && matchesChapter && matchesDifficulty;
  });

  const activeQuestion: Question = getQuestionDetails(selectedQuestionId);

  // Trigger browser-native high-fidelity PDF print dialog
  const printToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-charcoal font-sans selection:bg-editorial-accent selection:text-white flex flex-col antialiased">
      
      {/* HEADER BAR (no-print) */}
      <header className="no-print bg-editorial-card text-editorial-charcoal border-b-2 border-editorial-border sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="p-2 bg-editorial-charcoal text-editorial-bg rounded-xl border border-editorial-border">
            <Activity className="w-5 h-5 text-editorial-accent animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif italic font-bold text-xl md:text-2xl tracking-tight flex items-center gap-2 text-editorial-charcoal">
              React Interview Handbook <span className="text-[10px] bg-editorial-accent text-white font-mono font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider">Pro Edition</span>
            </h1>
            <p className="text-[10px] text-editorial-charcoal/60 font-sans tracking-widest uppercase font-bold mt-0.5">100 Premium QA • Practice Arena • Printable PDF</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-2 bg-editorial-bg hover:brightness-105 active:scale-95 text-editorial-charcoal border border-editorial-border rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* CANDIDATE QUICK CARD */}
          <div className="hidden md:flex items-center space-x-4 bg-editorial-bg border border-editorial-border rounded-xl px-4 py-1.5">
            <div className="text-right">
              <p className="text-xs font-serif font-bold text-editorial-charcoal">Lavneet Sharma</p>
              <p className="text-[9px] text-editorial-charcoal/60 font-mono font-medium uppercase tracking-wider">B.Tech VIT Vellore • 1+ Yr Exp</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-editorial-charcoal border border-editorial-border flex items-center justify-center font-bold text-editorial-bg text-xs font-serif">
              LS
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row no-print">
        
        {/* APP NAVIGATION SIDEBAR (no-print) */}
        <nav className="no-print w-full md:w-64 bg-editorial-card text-editorial-charcoal border-r border-editorial-border p-5 space-y-6 flex-shrink-0">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] text-editorial-accent uppercase font-extrabold mb-3">Preparation Stages</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('dashboard'); setMockActive(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-all border ${
                  activeTab === 'dashboard' ? 'bg-editorial-charcoal text-editorial-bg border-editorial-border shadow-md' : 'border-transparent text-editorial-charcoal/80 hover:bg-editorial-bg hover:text-editorial-charcoal'
                }`}
              >
                <Trophy className="w-4 h-4 text-editorial-accent" />
                <span>Dashboard & Progress</span>
              </button>
              
              <button 
                onClick={() => { setActiveTab('handbook'); setMockActive(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-all border ${
                  activeTab === 'handbook' ? 'bg-editorial-charcoal text-editorial-bg border-editorial-border shadow-md' : 'border-transparent text-editorial-charcoal/80 hover:bg-editorial-bg hover:text-editorial-charcoal'
                }`}
              >
                <BookOpen className="w-4 h-4 text-editorial-accent" />
                <span>100 Questions Q&A</span>
              </button>

              <button 
                onClick={() => { setActiveTab('cheatsheets'); setMockActive(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-all border ${
                  activeTab === 'cheatsheets' ? 'bg-editorial-charcoal text-editorial-bg border-editorial-border shadow-md' : 'border-transparent text-editorial-charcoal/80 hover:bg-editorial-bg hover:text-editorial-charcoal'
                }`}
              >
                <FileText className="w-4 h-4 text-editorial-accent" />
                <span>Cheat Sheets & Tables</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] text-editorial-accent uppercase font-extrabold mb-3">Practice Arenas</p>
            <div className="space-y-1">
              <button 
                onClick={() => { setActiveTab('mock'); setMockActive(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-all border ${
                  activeTab === 'mock' ? 'bg-editorial-charcoal text-editorial-bg border-editorial-border shadow-md' : 'border-transparent text-editorial-charcoal/80 hover:bg-editorial-bg hover:text-editorial-charcoal'
                }`}
              >
                <Sliders className="w-4 h-4 text-editorial-accent" />
                <span>Mock Interview Simulator</span>
              </button>

              <button 
                onClick={() => { setActiveTab('flashcards'); setMockActive(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-all border ${
                  activeTab === 'flashcards' ? 'bg-editorial-charcoal text-editorial-bg border-editorial-border shadow-md' : 'border-transparent text-editorial-charcoal/80 hover:bg-editorial-bg hover:text-editorial-charcoal'
                }`}
              >
                <Flame className="w-4 h-4 text-editorial-accent animate-pulse" />
                <span>Rapid Recall Flashcards</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-editorial-border/30">
            <p className="text-[10px] font-mono tracking-[0.2em] text-editorial-accent uppercase font-extrabold mb-3">Resource Actions</p>
            <button 
              onClick={() => setActiveTab('print')}
              className="w-full text-left px-3 py-3 bg-editorial-accent text-white rounded-xl text-xs font-extrabold tracking-widest uppercase flex items-center justify-between border border-editorial-border hover:brightness-105 active:translate-y-[1px] transition-all shadow-md"
            >
              <span className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Premium PDF</span>
              </span>
              <span className="bg-white/20 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-lg uppercase font-bold border border-white/10">12 Ch</span>
            </button>
          </div>

          {/* SIDEBAR REVISION CHECKLIST */}
          <div className="bg-editorial-bg border border-editorial-border p-4 rounded-xl text-xs">
            <h5 className="font-serif italic font-bold text-editorial-charcoal text-sm mb-3 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-editorial-accent" /> Key Milestone Targets
            </h5>
            <ul className="space-y-2 text-editorial-charcoal/80 font-serif italic text-[11px]">
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-sm border border-editorial-border ${completed.length >= 10 ? 'bg-editorial-accent' : 'bg-transparent'}`}></span>
                Read first 10 Fundamental QA
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-sm border border-editorial-border ${completed.length >= 50 ? 'bg-editorial-accent' : 'bg-transparent'}`}></span>
                Complete 50% Questions
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-sm border border-editorial-border ${Object.keys(customNotes).length >= 5 ? 'bg-editorial-accent' : 'bg-transparent'}`}></span>
                Draft 5 custom notes
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-sm border border-editorial-border ${bookmarks.length >= 1 ? 'bg-editorial-accent' : 'bg-transparent'}`}></span>
                Flag high-yield QA
              </li>
            </ul>
          </div>
        </nav>

        {/* PRIMARY MAIN PANEL VIEW CONTAINER */}
        <main className="flex-1 bg-editorial-bg overflow-y-auto p-4 md:p-8">

          {/* TAB 1: PROGRESS DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* WELCOME BANNER */}
              <div className="bg-editorial-charcoal text-editorial-bg rounded-2xl p-6 md:p-8 border-2 border-editorial-border relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-md">
                <div className="space-y-2.5 max-w-xl">
                  <span className="px-3 py-1 bg-editorial-accent text-white border border-editorial-accent rounded-lg text-[9px] font-mono font-bold tracking-[0.2em] uppercase inline-block">MERN STACK PROFILE</span>
                  <h2 className="text-2xl md:text-3xl font-serif italic font-bold text-editorial-bg tracking-tight">
                    Welcome back, Lavneet Sharma
                  </h2>
                  <p className="opacity-80 text-xs font-serif leading-relaxed">
                    You have professional full-stack MERN expertise (1+ Yr Exp) and a B.Tech in CSE from <b className="text-editorial-bg font-bold">VIT Vellore</b>. Use this interactive handbook to lock down core React theory, optimize system design answers, and prepare customized case studies on <b>Damora AI</b> and <b>CareMagnus</b>.
                  </p>
                </div>
                <div className="bg-editorial-bg/5 border border-editorial-bg/10 p-5 rounded-xl flex items-center space-x-5 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-3xl font-serif italic font-bold text-editorial-accent">{completed.length}/100</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-70 font-bold font-sans">Ready QA</p>
                  </div>
                  <div className="h-10 w-[1px] bg-editorial-bg/20"></div>
                  <div className="text-center">
                    <p className="text-3xl font-serif italic font-bold text-editorial-accent">{bookmarks.length}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-70 font-bold font-sans">Bookmarks</p>
                  </div>
                </div>
              </div>

              {/* PROGRESS CIRCLES & METRICS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest">Fundamentals</p>
                    <span className="text-[9px] font-mono bg-editorial-accent/10 text-editorial-accent font-bold px-2 py-0.5 rounded-lg border border-editorial-accent/20">Ch 1-3</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-serif font-bold text-editorial-charcoal">
                      {completed.filter(id => id <= 25).length} <span className="text-xs text-editorial-charcoal/50 font-sans">/ 25</span>
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-editorial-bg border border-editorial-border/10 rounded-full overflow-hidden">
                    <div className="bg-editorial-accent h-full transition-all" style={{ width: `${Math.min(100, (completed.filter(id => id <= 25).length / 25) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest">React Hooks</p>
                    <span className="text-[9px] font-mono bg-editorial-accent/10 text-editorial-accent font-bold px-2 py-0.5 rounded-lg border border-editorial-accent/20">Ch 4-6</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-serif font-bold text-editorial-charcoal">
                      {completed.filter(id => id > 25 && id <= 50).length} <span className="text-xs text-editorial-charcoal/50 font-sans">/ 25</span>
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-editorial-bg border border-editorial-border/10 rounded-full overflow-hidden">
                    <div className="bg-editorial-accent h-full transition-all" style={{ width: `${Math.min(100, (completed.filter(id => id > 25 && id <= 50).length / 25) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest">Form & Router</p>
                    <span className="text-[9px] font-mono bg-editorial-accent/10 text-editorial-accent font-bold px-2 py-0.5 rounded-lg border border-editorial-accent/20">Ch 7-9</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-serif font-bold text-editorial-charcoal">
                      {completed.filter(id => id > 50 && id <= 75).length} <span className="text-xs text-editorial-charcoal/50 font-sans">/ 25</span>
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-editorial-bg border border-editorial-border/10 rounded-full overflow-hidden">
                    <div className="bg-editorial-accent h-full transition-all" style={{ width: `${Math.min(100, (completed.filter(id => id > 50 && id <= 75).length / 25) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest">Advanced & SSR</p>
                    <span className="text-[9px] font-mono bg-editorial-accent/10 text-editorial-accent font-bold px-2 py-0.5 rounded-lg border border-editorial-accent/20">Ch 10-12</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-serif font-bold text-editorial-charcoal">
                      {completed.filter(id => id > 75).length} <span className="text-xs text-editorial-charcoal/50 font-sans">/ 25</span>
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-editorial-bg border border-editorial-border/10 rounded-full overflow-hidden">
                    <div className="bg-editorial-accent h-full transition-all" style={{ width: `${Math.min(100, (completed.filter(id => id > 75).length / 25) * 100)}%` }}></div>
                  </div>
                </div>
              </div>

              {/* CORE METHODOLOGY SECTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* INTERVIEW CODES & ACTION BOARD */}
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 shadow-md space-y-4 md:col-span-2">
                  <h3 className="font-serif italic font-bold text-lg text-editorial-charcoal border-b border-editorial-border/10 pb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-editorial-accent" /> Comprehensive Syllabus & Chapters
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2">
                    {chapters.map(ch => {
                      const chQuestions = rawQuestions.filter(q => q.chapterId === ch.id);
                      const completedCount = completed.filter(id => chQuestions.some(q => q.id === id)).length;
                      return (
                        <div key={ch.id} className="p-4 bg-editorial-card rounded-xl border border-editorial-border hover:bg-editorial-bg transition-all flex flex-col justify-between shadow-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-editorial-accent">Chapter {ch.id}</span>
                              <span className="text-[10px] font-semibold text-editorial-charcoal/50 font-mono">{completedCount}/{chQuestions.length} Checked</span>
                            </div>
                            <h4 className="font-serif font-bold text-editorial-charcoal text-sm leading-snug">{ch.title}</h4>
                            <p className="text-xs text-editorial-charcoal/70 leading-relaxed font-serif italic">{ch.description}</p>
                          </div>
                          
                          <div className="pt-3 flex items-center justify-between border-t border-editorial-border/10 mt-3">
                            <button 
                              onClick={() => {
                                setSelectedChapterId(ch.id);
                                setActiveTab('handbook');
                              }}
                              className="text-xs text-editorial-charcoal hover:text-editorial-accent font-bold uppercase tracking-wider flex items-center gap-1 border-b border-editorial-charcoal"
                            >
                              Browse QA <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => startMockInterview(ch.id)}
                              className="text-xs text-editorial-accent hover:underline font-bold uppercase tracking-wider"
                            >
                              Start Practice
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* THE MERN PORTFOLIO BOOSTER & RESUME INTEGRATOR */}
                <div className="bg-editorial-charcoal text-editorial-bg rounded-2xl p-6 border border-editorial-border space-y-4 flex flex-col justify-between shadow-md">
                  <div className="space-y-4">
                    <h3 className="font-serif italic font-bold text-lg border-b border-editorial-bg/20 pb-3 text-editorial-accent flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-editorial-accent" /> Portfolio Case Studies
                    </h3>
                    
                    <div className="space-y-3.5">
                      <div className="p-3.5 bg-editorial-bg/5 rounded-xl border border-editorial-bg/10">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-serif italic font-bold text-sm text-editorial-accent">Damora AI</h4>
                          <span className="text-[9px] font-mono bg-editorial-bg/10 text-editorial-bg px-2.5 py-0.5 rounded-lg border border-editorial-bg/10">SaaS</span>
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed font-serif">
                          Enterprise AI platform built with <b>Next.js</b> and full-stack layers. Demostrates RAG document embeddings, token-based RBAC, and server-side SSE data streams.
                        </p>
                      </div>

                      <div className="p-3.5 bg-editorial-bg/5 rounded-xl border border-editorial-bg/10">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-serif italic font-bold text-sm text-editorial-accent">CareMagnus</h4>
                          <span className="text-[9px] font-mono bg-editorial-bg/10 text-editorial-bg px-2.5 py-0.5 rounded-lg border border-editorial-bg/10">Healthcare</span>
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed font-serif">
                          Secure Healthcare MERN portal. Focuses on real-time <b>Socket.io</b> channels, Stripe billing structures, TOTP MFA validation, and AWS S3 uploads.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-editorial-bg/20">
                    <p className="text-[9px] opacity-70 font-mono text-center uppercase tracking-wider">Referrals & Cold Email Ready</p>
                    <button 
                      onClick={() => setActiveTab('cheatsheets')}
                      className="w-full py-2.5 bg-editorial-accent hover:brightness-110 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all border border-editorial-border/30 shadow-md"
                    >
                      <span>Open Revision Checklist</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE QUESTIONS HANDBOOK */}
          {activeTab === 'handbook' && (
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
              
              {/* HANDBOOK SIDEBAR (SEARCH, FILTERS, QUESTIONS LIST) */}
              <div className="w-full lg:w-80 bg-editorial-card border border-editorial-border rounded-2xl p-5 space-y-4 flex-shrink-0 shadow-md">
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-editorial-charcoal/50" />
                  <input
                    type="text"
                    placeholder="Search 100 questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-editorial-border rounded-xl text-xs focus:outline-none focus:border-editorial-accent transition-all bg-editorial-bg text-editorial-charcoal font-sans"
                  />
                </div>

                {/* Filter Controls Accordion */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-editorial-charcoal font-bold mb-1 uppercase tracking-wider text-[10px]">Chapter Select</label>
                    <select
                      value={selectedChapterId}
                      onChange={(e) => setSelectedChapterId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      className="w-full p-2 border border-editorial-border rounded-xl focus:outline-none bg-editorial-card text-editorial-charcoal font-serif text-xs"
                    >
                      <option value="all">All Chapters ({chapters.length})</option>
                      {chapters.map(ch => (
                        <option key={ch.id} value={ch.id}>Ch {ch.id}: {ch.title.substring(0, 24)}...</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-editorial-charcoal font-bold mb-1 uppercase tracking-wider text-[10px]">Difficulty</label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                        className="w-full p-2 border border-editorial-border rounded-xl focus:outline-none bg-editorial-card text-editorial-charcoal font-serif text-xs"
                      >
                        <option value="all">All</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-editorial-charcoal font-bold mb-1 uppercase tracking-wider text-[10px]">Flag Status</label>
                      <select
                        value={filterMode}
                        onChange={(e) => setFilterMode(e.target.value as any)}
                        className="w-full p-2 border border-editorial-border rounded-xl focus:outline-none bg-editorial-card text-editorial-charcoal font-serif text-xs"
                      >
                        <option value="all">All Items</option>
                        <option value="bookmarks">Bookmarked</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Questions List scroll */}
                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
                  <div className="flex justify-between items-center px-1 text-editorial-charcoal/50 text-xs font-mono">
                    <span>Found {filteredQuestions.length} Questions</span>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedChapterId('all'); setSelectedDifficulty('all'); setFilterMode('all'); }}
                      className="text-editorial-accent font-bold hover:underline"
                    >
                      Reset
                    </button>
                  </div>

                  {filteredQuestions.map(q => {
                    const isBookmarked = bookmarks.includes(q.id);
                    const isCompleted = completed.includes(q.id);
                    return (
                      <button
                        key={q.id}
                        onClick={() => setSelectedQuestionId(q.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start space-x-2.5 ${
                          selectedQuestionId === q.id 
                            ? 'bg-editorial-charcoal border-editorial-border text-editorial-bg shadow-sm' 
                            : 'bg-editorial-card hover:bg-editorial-bg border-editorial-border/30 text-editorial-charcoal'
                        }`}
                      >
                        <span className={`mt-0.5 p-0.5 rounded-lg flex-shrink-0 border ${
                          isCompleted ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-transparent text-editorial-charcoal/20 border-editorial-border/20'
                        }`}>
                          <Check className="w-3 h-3" />
                        </span>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-mono text-[9px] font-bold ${
                              selectedQuestionId === q.id ? 'text-editorial-accent' : 'text-editorial-accent'
                            }`}>Q {q.id}</span>
                            <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-lg border ${
                              q.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                              q.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                            }`}>
                              {q.difficulty}
                            </span>
                          </div>
                          <p className="font-serif font-bold leading-snug line-clamp-2">{q.title}</p>
                        </div>
                        {isBookmarked && <Bookmark className="w-3.5 h-3.5 text-editorial-accent fill-editorial-accent flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* HANDBOOK DISPLAY CONTENT AREA */}
              <div className="flex-1 space-y-6">
                
                {/* READER TOP BUTTON HEADER */}
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <span className="text-3xl font-serif italic font-bold text-editorial-accent font-mono">Q{activeQuestion.id}</span>
                    <div>
                      <span className="font-mono text-[10px] font-bold text-editorial-charcoal/50 uppercase tracking-widest">Chapter {activeQuestion.chapterId}: {activeQuestion.chapterTitle}</span>
                      <h2 className="text-xl md:text-2xl font-serif font-bold text-editorial-charcoal leading-snug">{activeQuestion.title}</h2>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button 
                      onClick={() => toggleBookmark(activeQuestion.id)}
                      className={`px-3 py-2 border rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${
                        bookmarks.includes(activeQuestion.id)
                          ? 'bg-editorial-accent border-editorial-border text-white font-bold'
                          : 'bg-editorial-card border-editorial-border text-editorial-charcoal hover:bg-editorial-bg'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(activeQuestion.id) ? 'fill-white' : ''}`} />
                      <span>{bookmarks.includes(activeQuestion.id) ? 'Saved' : 'Save'}</span>
                    </button>

                    <button 
                      onClick={() => toggleCompleted(activeQuestion.id)}
                      className={`px-3 py-2 border rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${
                        completed.includes(activeQuestion.id)
                          ? 'bg-emerald-700 border-editorial-border text-white font-bold'
                          : 'bg-editorial-card border-editorial-border text-editorial-charcoal hover:bg-editorial-bg'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{completed.includes(activeQuestion.id) ? 'Ready' : 'Mark Ready'}</span>
                    </button>
                  </div>
                </div>

                {/* VERBAL RESPONSE CHRONOMETER PRACTICE */}
                <div className="bg-editorial-charcoal text-stone-200 dark:text-stone-900 rounded-2xl p-5 border border-editorial-border space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-stone-800 dark:border-stone-300 pb-3">
                    <h4 className="font-serif italic font-bold text-sm text-editorial-accent flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-editorial-accent animate-pulse" /> Verbal Responder Trainer
                    </h4>
                    
                    <div className="flex items-center space-x-3 text-xs font-mono text-stone-300 dark:text-stone-700">
                      <span>Practice Clock: <b className="text-editorial-accent text-sm font-semibold font-mono">{practiceTimer}s</b></span>
                      <span className="text-stone-500 dark:text-stone-600">(Target: 30-60s)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest">Original 30-Second Interview Response</p>
                      <p className="text-sm font-serif italic text-stone-100 dark:text-stone-900 leading-relaxed border-l-2 border-editorial-accent pl-3">
                        "{activeQuestion.answer30s}"
                      </p>
                    </div>
                    
                    <div className="flex sm:flex-col items-stretch space-y-1.5 gap-2 flex-shrink-0 w-full sm:w-auto">
                      <button 
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1.5 border ${
                          isTimerRunning ? 'bg-rose-700 hover:bg-rose-800 text-white border-rose-800' : 'bg-editorial-accent hover:brightness-110 text-white border-editorial-accent'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isTimerRunning ? 'Pause' : 'Start Answer'}</span>
                      </button>
                      <button 
                        onClick={resetPracticeTimer}
                        className="px-4 py-2 bg-stone-800 dark:bg-stone-200 hover:bg-stone-700 dark:hover:bg-stone-300 text-stone-300 dark:text-stone-800 rounded-xl text-xs font-mono uppercase tracking-widest font-semibold border border-stone-700 dark:border-stone-300"
                      >
                        Reset Clock
                      </button>
                    </div>
                  </div>
                </div>

                {/* DETAILED CONCEPTUAL EXPLANATION */}
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 shadow-md space-y-5 text-editorial-charcoal">
                  <h3 className="font-serif italic font-bold text-base text-editorial-charcoal border-b border-editorial-border/10 pb-2">Conceptual Deep Dive</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest mb-1">What is it?</h4>
                        <p className="text-sm text-editorial-charcoal leading-relaxed font-serif">{activeQuestion.explanation.what}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest mb-1">Why does it exist?</h4>
                        <p className="text-sm text-editorial-charcoal leading-relaxed font-serif">{activeQuestion.explanation.why}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest mb-1">Problem it Solves</h4>
                        <p className="text-sm text-editorial-charcoal leading-relaxed font-serif">{activeQuestion.explanation.problemSolved}</p>
                      </div>
                    </div>

                    <div className="space-y-3 bg-editorial-bg p-5 rounded-xl border border-editorial-border/50 text-xs font-serif">
                      <div>
                        <h4 className="font-serif font-bold text-editorial-charcoal mb-1">Key Real-World Use Cases</h4>
                        <ul className="list-disc list-inside space-y-1 text-editorial-charcoal/80 leading-relaxed pl-1 italic">
                          {activeQuestion.explanation.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-serif font-bold text-editorial-charcoal mb-1">Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 text-editorial-charcoal/80 leading-relaxed pl-1 italic">
                          {activeQuestion.explanation.benefits.map((bf, i) => <li key={i}>{bf}</li>)}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-editorial-border/20 mt-2.5">
                        <div>
                          <h5 className="font-serif font-bold text-editorial-charcoal">When to use:</h5>
                          <p className="text-[11px] text-editorial-charcoal/80 leading-snug mt-0.5 italic">{activeQuestion.explanation.whenToUse}</p>
                        </div>
                        <div>
                          <h5 className="font-serif font-bold text-editorial-charcoal">When NOT to use:</h5>
                          <p className="text-[11px] text-editorial-charcoal/80 leading-snug mt-0.5 italic">{activeQuestion.explanation.whenNotToUse}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VISUAL ASCII DIAGRAM PANEL (if exists) */}
                  {activeQuestion.diagram && (
                    <div className="space-y-2 mt-4">
                      <h4 className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest">Execution & Architecture Diagram</h4>
                      <pre className="p-4 bg-editorial-charcoal text-emerald-400 rounded-xl border border-editorial-border font-mono text-xs overflow-x-auto leading-relaxed text-center">
                        {activeQuestion.diagram}
                      </pre>
                    </div>
                  )}
                </div>

                {/* MENTAL MODEL VISUALIZER */}
                <div className="bg-editorial-accent/5 border border-editorial-accent rounded-2xl p-5 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-editorial-accent text-white rounded-xl shadow-none">
                    <Lightbulb className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-editorial-accent tracking-widest">Concept Mental Model</span>
                    <h4 className="font-serif font-bold text-editorial-charcoal text-sm mt-0.5">{activeQuestion.mentalModel.analogy}</h4>
                    <p className="text-xs text-editorial-charcoal/80 leading-relaxed mt-1 font-serif italic">{activeQuestion.mentalModel.description}</p>
                  </div>
                </div>

                {/* INTERVIEW CODE PLAYGROUND */}
                <div className="bg-stone-950 text-slate-200 rounded-2xl overflow-hidden border border-editorial-border shadow-none space-y-1">
                  <div className="bg-stone-900 border-b border-stone-800 px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-editorial-accent font-bold flex items-center gap-1.5 uppercase tracking-wider">
                      <FileText className="w-4 h-4 text-editorial-accent" /> Runnable Interview-Ready Code Block
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 font-bold bg-stone-950 px-2 py-0.5 rounded-lg border border-stone-800">TSX / ES6</span>
                  </div>

                  {/* Multi-file tabs selector */}
                  {activeQuestion.files && activeQuestion.files.length > 0 && (
                    <div className="bg-stone-900/50 px-5 pt-2 flex border-b border-stone-850 overflow-x-auto gap-1">
                      {activeQuestion.files.map((file, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveFileIndex(idx)}
                          className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-lg border-t border-x transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                            activeFileIndex === idx
                              ? 'bg-stone-950 text-editorial-accent border-stone-800 font-bold'
                              : 'bg-stone-900/40 text-stone-400 border-transparent hover:text-stone-200'
                          }`}
                        >
                          <span className="text-stone-500">📄</span>
                          <span>{file.name}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <pre className="p-5 font-mono text-xs overflow-x-auto text-indigo-200 leading-relaxed bg-stone-950">
                    <code>
                      {activeQuestion.files && activeQuestion.files[activeFileIndex]
                        ? activeQuestion.files[activeFileIndex].code
                        : activeQuestion.code}
                    </code>
                  </pre>

                  {/* STEP-BY-STEP WALKTHROUGH */}
                  <div className="bg-stone-900 p-5 border-t border-stone-800 space-y-3">
                    <h5 className="text-xs font-mono text-editorial-accent font-bold uppercase tracking-wider">Step-by-Step Code Walkthrough</h5>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-stone-300 leading-relaxed font-serif">
                      {activeQuestion.walkthrough.map((step, idx) => (
                        <li key={idx} className="border-b border-stone-800 pb-1.5 last:border-0">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* TRICKY QUESTIONS & FOLLOW UPS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-3">
                    <h4 className="font-serif italic font-bold text-sm text-editorial-charcoal border-b border-editorial-border/10 pb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-700" /> Tricky Interview Follow-Ups
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-editorial-charcoal leading-relaxed pl-1 font-serif">
                      {activeQuestion.tricky.map((t, i) => <li key={i} className="font-bold text-editorial-charcoal italic">{t}</li>)}
                    </ul>
                  </div>

                  <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-3">
                    <h4 className="font-serif italic font-bold text-sm text-editorial-charcoal border-b border-editorial-border/10 pb-2 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-editorial-accent" /> Structured Follow-Ups
                    </h4>
                    <div className="space-y-2 text-[11px] leading-snug font-serif">
                      <div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono tracking-wider text-[9px] block">Beginner</span>
                        <p className="text-editorial-charcoal mt-0.5">{activeQuestion.followups.beginner[0]}</p>
                      </div>
                      <div>
                        <span className="font-bold text-amber-600 dark:text-amber-400 uppercase font-mono tracking-wider text-[9px] block">Intermediate</span>
                        <p className="text-editorial-charcoal mt-0.5">{activeQuestion.followups.intermediate[0]}</p>
                      </div>
                      <div>
                        <span className="font-bold text-rose-600 dark:text-rose-400 uppercase font-mono tracking-wider text-[9px] block">Advanced</span>
                        <p className="text-editorial-charcoal mt-0.5">{activeQuestion.followups.advanced[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COMMON MISTAKES PANEL */}
                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-5 shadow-sm space-y-3">
                  <h4 className="font-serif italic font-bold text-sm text-rose-950 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-700" /> Common Mistakes & Interview Traps
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 dark:text-rose-400 font-mono text-[10px] uppercase tracking-widest block">Junior Developer Level:</span>
                      <p className="text-rose-950/85 dark:text-stone-300 leading-relaxed">{activeQuestion.mistakes.freshers}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-rose-900 dark:text-rose-400 font-mono text-[10px] uppercase tracking-widest block">Mid-Level Developer (1-2 Yr Exp):</span>
                      <p className="text-rose-950/85 dark:text-stone-300 leading-relaxed">{activeQuestion.mistakes.midLevel}</p>
                    </div>
                  </div>
                </div>

                {/* REAL CASE STUDY PROJECTS INTEGRATED */}
                <div className={`border rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all ${
                  activeQuestion.realProject.name === 'Damora AI' 
                    ? 'bg-editorial-charcoal border-editorial-border text-editorial-bg'
                    : 'bg-stone-900 border-editorial-border text-white'
                }`}>
                  <div className="space-y-1.5 max-w-2xl">
                    <span className="text-[9px] font-mono tracking-widest bg-editorial-bg/10 text-editorial-accent font-bold px-2 py-0.5 rounded-lg inline-block border border-editorial-accent/30">
                      {activeQuestion.realProject.name === 'Damora AI' ? 'DAMORA AI EXPLAINER' : 'CAREGMAGNUS EXPLAINER'}
                    </span>
                    <h4 className={`font-serif italic font-bold text-base ${activeQuestion.realProject.name === 'Damora AI' ? 'text-editorial-bg' : 'text-white'}`}>{activeQuestion.realProject.description}</h4>
                    <p className={`text-xs leading-relaxed font-serif ${activeQuestion.realProject.name === 'Damora AI' ? 'opacity-80' : 'text-stone-300'}`}>{activeQuestion.realProject.detail}</p>
                  </div>
                  <div className={`flex-shrink-0 text-center p-4 rounded-xl ${
                    activeQuestion.realProject.name === 'Damora AI' 
                      ? 'bg-editorial-bg/5 border border-editorial-bg/10'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <span className={`text-[9px] font-mono font-bold block uppercase tracking-wider ${activeQuestion.realProject.name === 'Damora AI' ? 'opacity-70' : 'text-stone-400'}`}>Candidate Skill</span>
                    <span className="text-sm font-bold font-serif text-editorial-accent">Direct Delivery</span>
                  </div>
                </div>

                {/* PERSONAL INTERACTIVE STUDY NOTES */}
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-5 shadow-md space-y-3">
                  <h4 className="font-serif italic font-bold text-sm text-editorial-charcoal flex items-center gap-1.5">
                    <BookMarked className="w-4.5 h-4.5 text-editorial-accent" /> Personal Study Notes
                  </h4>
                  <p className="text-xs text-editorial-charcoal/50 font-serif">Draft customized talking points or project details for your interview here. Your entries save automatically to local cache.</p>
                  <textarea
                    rows={4}
                    value={activeNote}
                    onChange={(e) => {
                      setActiveNote(e.target.value);
                      saveNoteForQuestion(activeQuestion.id, e.target.value);
                    }}
                    placeholder="E.g., I implemented this rendering pattern in Damora AI when processing the SSE chat stream hooks..."
                    className="w-full p-3 border border-editorial-border rounded-xl text-xs focus:outline-none focus:border-editorial-accent font-sans leading-relaxed bg-editorial-bg text-editorial-charcoal"
                  />
                  <div className="flex justify-between items-center text-[10px] font-mono text-editorial-charcoal/40">
                    <span>Characters: {activeNote.length}</span>
                    <button 
                      onClick={() => { setActiveNote(''); saveNoteForQuestion(activeQuestion.id, ''); }}
                      className="text-rose-700 font-bold hover:underline"
                    >
                      Clear Note
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CHEAT SHEETS & GRAPH COMPILATIONS */}
          {activeTab === 'cheatsheets' && (
            <div className="max-w-6xl mx-auto space-y-8">
              
              <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 shadow-md">
                <h2 className="text-2xl font-serif font-bold text-editorial-charcoal mb-1">Cheat Sheets & Technical Guides</h2>
                <p className="text-xs text-editorial-charcoal/60 font-serif italic">Quick-reference charts, framework comparisons, and countdown checklists to read a day before your interview.</p>
              </div>

              {Object.entries(cheatsheets).map(([key, sheet]) => (
                <div key={key} className="bg-editorial-card border border-editorial-border rounded-2xl overflow-hidden shadow-md">
                  <div className="bg-editorial-charcoal text-editorial-bg p-5 border-b border-editorial-border">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-editorial-accent font-bold block">Interview Prep Resource</span>
                    <h3 className="text-lg font-serif font-bold mt-0.5">{sheet.title}</h3>
                    <p className="text-xs opacity-80 font-serif italic mt-1">{sheet.subtitle}</p>
                  </div>
                  
                  <div className="p-6 prose max-w-none prose-sm text-editorial-charcoal leading-relaxed font-mono text-xs">
                    <div className="whitespace-pre-wrap select-all leading-relaxed">
                      {sheet.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MOCK INTERVIEW SIMULATOR */}
          {activeTab === 'mock' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* STAGE A: INTRO AND SELECTION */}
              {!mockActive ? (
                <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 md:p-8 shadow-md text-center max-w-2xl mx-auto space-y-6">
                  <div className="w-14 h-14 bg-editorial-accent/10 text-editorial-accent rounded-2xl flex items-center justify-center mx-auto border border-editorial-accent/20">
                    <Sliders className="w-7 h-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-serif font-bold text-editorial-charcoal">Mock Interview Simulator</h2>
                    <p className="text-xs text-editorial-charcoal/60 max-w-md mx-auto font-serif italic">
                      Generate a live randomized 5-question mock interview to test your verbal reaction timing, conceptual accuracy, and performance under time limits.
                    </p>
                  </div>

                  <div className="bg-editorial-bg p-5 rounded-xl border border-editorial-border text-left space-y-3 font-serif">
                    <h4 className="font-bold text-xs text-editorial-charcoal uppercase tracking-widest">How it works:</h4>
                    <ol className="list-decimal list-inside text-xs text-editorial-charcoal/80 space-y-2 leading-relaxed">
                      <li>Select a chapter focus or choose across all 100 questions.</li>
                      <li>Read the question, start your practice responder clock, and say your answer out loud.</li>
                      <li>Click "Reveal Answer" and grade yourself based on the original 30s response.</li>
                      <li>Review your final dashboard feedback profile at the end.</li>
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => startMockInterview('all')}
                      className="w-full py-3 bg-editorial-accent hover:brightness-110 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all border border-editorial-border/30"
                    >
                      Start Comprehensive All-Topic Mock (5 QA)
                    </button>
                    
                    <div className="flex items-center justify-between text-editorial-charcoal/40 text-[9px] font-mono py-1">
                      <span className="h-[1px] bg-editorial-border/20 flex-1 mr-3"></span>
                      <span>OR FOCUS BY SPECIFIC CHAPTER</span>
                      <span className="h-[1px] bg-editorial-border/20 flex-1 ml-3"></span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left max-h-[160px] overflow-y-auto pr-1">
                      {chapters.map(ch => (
                        <button
                          key={ch.id}
                          onClick={() => startMockInterview(ch.id)}
                          className="p-2.5 bg-editorial-card hover:bg-editorial-bg border border-editorial-border text-xs rounded-xl text-editorial-charcoal font-serif font-bold transition-all truncate"
                        >
                          Ch {ch.id}: {ch.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                
                /* STAGE B: ACTIVE INTERVIEW CARD */
                <div className="bg-editorial-card border border-editorial-border rounded-2xl shadow-md overflow-hidden space-y-1">
                  
                  {/* PROGRESS BAR MOCK */}
                  <div className="bg-editorial-charcoal text-editorial-bg px-6 py-4 flex items-center justify-between border-b border-editorial-border">
                    <span className="text-xs font-mono font-bold text-editorial-accent uppercase tracking-wider">Mock Question {mockIndex + 1} of 5</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs opacity-70">Elapsed Time:</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-editorial-bg/10 dark:bg-black/40 px-2 py-0.5 border border-emerald-500/20">{practiceTimer}s</span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-editorial-bg">
                    <div className="bg-editorial-accent h-full transition-all" style={{ width: `${((mockIndex + 1) / 5) * 100}%` }}></div>
                  </div>

                  {/* ACTIVE QUESTION BOARD */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-editorial-charcoal/50 font-bold block">
                        Chapter {mockQuestions[mockIndex]?.chapterId}: {mockQuestions[mockIndex]?.chapterTitle}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-editorial-charcoal leading-snug">
                        {mockQuestions[mockIndex]?.title}
                      </h3>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-lg ${
                        mockQuestions[mockIndex]?.difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30' :
                        mockQuestions[mockIndex]?.difficulty === 'Intermediate' ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-800/30' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400 border-rose-200 dark:border-rose-800/30'
                      }`}>
                        {mockQuestions[mockIndex]?.difficulty} Difficulty
                      </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    {!mockRevealed ? (
                      <div className="bg-editorial-bg border border-editorial-border rounded-xl p-6 text-center space-y-4">
                        <p className="text-xs text-editorial-charcoal/60 font-serif italic max-w-sm mx-auto">
                          Read the prompt, formulate your answer, say it out loud, and click below to view model response.
                        </p>
                        <button
                          onClick={() => { setMockRevealed(true); setIsTimerRunning(false); }}
                          className="px-6 py-2.5 bg-editorial-charcoal hover:opacity-90 active:scale-95 text-editorial-bg rounded-xl text-xs font-mono font-bold uppercase tracking-widest border border-editorial-border"
                        >
                          Reveal Answer Key
                        </button>
                      </div>
                    ) : (
                      
                      /* GRADE MYSELF SECTION */
                      <div className="space-y-6 border-t border-editorial-border/10 pt-6 animate-fadeIn">
                        
                        <div className="space-y-2 bg-editorial-accent/5 border border-editorial-accent p-5 rounded-xl font-serif italic text-editorial-charcoal">
                          <h4 className="text-[10px] font-mono font-bold text-editorial-accent uppercase tracking-widest">Original Model Answer (30-60s)</h4>
                          <p className="text-sm italic leading-relaxed">
                            "{mockQuestions[mockIndex]?.answer30s}"
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-mono font-bold text-editorial-charcoal/50 uppercase tracking-widest text-center">Grade your performance on this question:</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                              onClick={() => {
                                setMockRatings({ ...mockRatings, [mockIndex]: 'excellent' });
                                if (mockIndex < 4) {
                                  setMockIndex(mockIndex + 1);
                                  setMockRevealed(false);
                                  resetPracticeTimer();
                                  setIsTimerRunning(true);
                                } else {
                                  setMockCompleted(true);
                                }
                              }}
                              className="p-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-850 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all"
                            >
                              <Trophy className="w-4 h-4 text-emerald-700" />
                              <span>Excellent (Accurate)</span>
                            </button>

                            <button
                              onClick={() => {
                                setMockRatings({ ...mockRatings, [mockIndex]: 'good' });
                                if (mockIndex < 4) {
                                  setMockIndex(mockIndex + 1);
                                  setMockRevealed(false);
                                  resetPracticeTimer();
                                  setIsTimerRunning(true);
                                } else {
                                  setMockCompleted(true);
                                }
                              }}
                              className="p-3 bg-editorial-card hover:bg-editorial-bg text-editorial-charcoal border border-editorial-border rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all"
                            >
                              <CheckCircle2 className="w-4 h-4 text-editorial-charcoal" />
                              <span>Good (Minor misses)</span>
                            </button>

                            <button
                              onClick={() => {
                                setMockRatings({ ...mockRatings, [mockIndex]: 'needs-work' });
                                if (mockIndex < 4) {
                                  setMockIndex(mockIndex + 1);
                                  setMockRevealed(false);
                                  resetPracticeTimer();
                                  setIsTimerRunning(true);
                                } else {
                                  setMockCompleted(true);
                                }
                              }}
                              className="p-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-850 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all"
                            >
                              <ShieldAlert className="w-4 h-4 text-rose-700" />
                              <span>Needs Practice</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* SCOREBOARD COMPLETED SCREEN */}
                  {mockCompleted && (
                    <div className="p-6 md:p-8 text-center space-y-6 border-t border-editorial-border/10 animate-fadeIn bg-editorial-card rounded-b-2xl">
                      <div className="w-14 h-14 bg-editorial-accent/10 text-editorial-accent rounded-2xl flex items-center justify-center mx-auto border border-editorial-accent/20">
                        <Trophy className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif font-bold text-editorial-charcoal">Mock Interview Completed!</h3>
                        <p className="text-xs text-editorial-charcoal/60 font-serif italic">Here's your performance distribution summary:</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto p-4 bg-editorial-card rounded-xl border border-editorial-border">
                        <div className="text-center">
                          <p className="text-xl font-mono font-bold text-emerald-700">{Object.values(mockRatings).filter(r => r === 'excellent').length}</p>
                          <span className="text-[9px] uppercase font-mono font-bold text-stone-400">Excellent</span>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-mono font-bold text-editorial-charcoal">{Object.values(mockRatings).filter(r => r === 'good').length}</p>
                          <span className="text-[9px] uppercase font-mono font-bold text-stone-400">Good</span>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-mono font-bold text-rose-700">{Object.values(mockRatings).filter(r => r === 'needs-work').length}</p>
                          <span className="text-[9px] uppercase font-mono font-bold text-stone-400">Practice</span>
                        </div>
                      </div>

                      <div className="flex justify-center gap-3 pt-4">
                        <button
                          onClick={() => setMockActive(false)}
                          className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest border border-stone-700"
                        >
                          Back to Selection
                        </button>
                        <button
                          onClick={() => startMockInterview('all')}
                          className="px-4 py-2.5 bg-editorial-accent hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest"
                        >
                          Retry New Quiz
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* TAB 5: FLASHCARDS ARENA */}
          {activeTab === 'flashcards' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-serif font-bold text-editorial-charcoal">Rapid Recall Flashcards</h2>
                <p className="text-xs text-editorial-charcoal/60 font-serif italic">Practice core concepts under time-pressured card recall (QA 1 to 30).</p>
              </div>

              {/* FLIP CARD AREA */}
              <div 
                onClick={() => setFlashFlipped(!flashFlipped)}
                className={`w-full min-h-[280px] bg-editorial-card border border-editorial-border rounded-2xl shadow-md p-6 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden select-none hover:bg-editorial-bg ${
                  flashFlipped ? 'border-editorial-accent ring-2 ring-editorial-accent/10' : ''
                }`}
              >
                <div className="absolute right-4 top-4 text-[9px] font-mono text-editorial-charcoal/40 uppercase tracking-widest">
                  Card {flashIndex + 1} of {flashQuestions.length}
                </div>

                <div className="space-y-2 mt-4 text-center">
                  {!flashFlipped ? (
                    <>
                      <span className="text-[9px] font-mono text-editorial-accent uppercase font-bold tracking-widest">QUESTION</span>
                      <h3 className="text-lg md:text-xl font-serif font-bold text-editorial-charcoal leading-snug">
                        {flashQuestions[flashIndex]?.title}
                      </h3>
                      <p className="text-[10px] text-editorial-charcoal/50 font-serif italic pt-4">Click card to reveal answer key</p>
                    </>
                  ) : (
                    <>
                      <span className="text-[9px] font-mono text-emerald-800 dark:text-emerald-400 uppercase font-bold tracking-widest">MODEL RESPONSE (30s)</span>
                      <p className="text-sm md:text-base text-editorial-charcoal font-serif font-bold italic leading-relaxed max-w-md mx-auto">
                        "{flashQuestions[flashIndex]?.answer30s}"
                      </p>
                      <p className="text-[10px] text-editorial-charcoal/50 font-serif italic pt-4">Click card to view question again</p>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-editorial-charcoal/40 border-t border-editorial-border/10 pt-4 mt-4 uppercase tracking-wider">
                  <span>Difficulty: {flashQuestions[flashIndex]?.difficulty}</span>
                  <span className="text-editorial-accent">Flip Card</span>
                </div>
              </div>

              {/* CARD PREV NEXT ACTIONS */}
              <div className="flex justify-between items-center px-2">
                <button
                  disabled={flashIndex === 0}
                  onClick={() => { setFlashIndex(flashIndex - 1); setFlashFlipped(false); }}
                  className="px-4 py-2 bg-editorial-card border border-editorial-border text-editorial-charcoal hover:bg-editorial-bg disabled:opacity-50 text-xs font-mono uppercase tracking-widest font-bold rounded-xl"
                >
                  Previous
                </button>
                <button
                  onClick={() => { setFlashIndex((flashIndex + 1) % flashQuestions.length); setFlashFlipped(false); }}
                  className="px-4 py-2 bg-editorial-accent hover:brightness-110 text-white text-xs font-mono uppercase tracking-widest font-bold rounded-xl border border-editorial-border/30"
                >
                  Next Card
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: PREMIUM GENERATOR VIEW / COVER PREVIEW */}
          {activeTab === 'print' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div className="bg-editorial-card border border-editorial-border rounded-2xl p-6 md:p-8 shadow-md space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-editorial-accent/10 text-editorial-accent rounded-xl flex-shrink-0 border border-editorial-accent/20">
                    <Download className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-2xl font-serif font-bold text-editorial-charcoal">Generate Premium PDF Booklet</h2>
                    <p className="text-xs text-editorial-charcoal/70 leading-relaxed font-serif italic">
                      We have engineered a robust, CSS-paginated, <b>A4-portrait print stylesheet</b>. Running this option will immediately prepare the book and trigger your browser's native print manager. Choose <b>"Save as PDF"</b> as your destination for a beautifully formatted 100-Question Handbook complete with cover page, index, cheat sheets, and custom diagrams.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-editorial-bg rounded-xl border border-editorial-border space-y-2">
                  <h4 className="font-bold text-xs text-editorial-charcoal uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <AlertCircle className="w-4 h-4 text-editorial-accent" /> Recommended PDF Export Settings:
                  </h4>
                  <ul className="list-disc list-inside text-xs text-editorial-charcoal/80 space-y-1.5 pl-1 font-serif">
                    <li><b>Layout:</b> Portrait (A4 Standard)</li>
                    <li><b>Margins:</b> Default (or Custom to align spacing)</li>
                    <li><b>Options:</b> Tick <b>"Background graphics"</b> to ensure premium colored panels and syntax blocks render correctly.</li>
                    <li><b>Headers/Footers:</b> Disable default browser headers to keep custom page numbers pristine.</li>
                  </ul>
                </div>

                <button
                  onClick={printToPDF}
                  className="w-full py-3 bg-editorial-accent hover:brightness-110 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-bold border border-editorial-border/30 active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Launch PDF Printer Now</span>
                </button>
              </div>

              {/* COVER PAGE PREVIEW CARD */}
              <div className="bg-editorial-charcoal border border-editorial-border rounded-2xl p-10 text-editorial-bg text-center shadow-md space-y-6 relative overflow-hidden">
                <span className="text-[9px] font-mono tracking-widest text-editorial-accent font-bold uppercase block">Technical Handbook Preview</span>
                
                <div className="space-y-3 pt-6">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                    React Interview Preparation Handbook
                  </h1>
                  <p className="opacity-80 text-sm max-w-md mx-auto font-serif italic">
                    The Comprehensive 12-Chapter Curriculum & 100 Core Q&As for Frontend, MERN Stack, and Senior Software Engineering Interviews.
                  </p>
                </div>

                <div className="w-12 h-[1px] bg-editorial-bg/25 mx-auto my-6"></div>

                <div className="space-y-1.5 text-xs opacity-80 font-serif">
                  <p className="">Prepared for Candidate: <b className="text-editorial-bg font-sans text-sm tracking-wide">Lavneet Sharma</b></p>
                  <p className="font-mono opacity-70 text-[10px] tracking-wide">B.Tech CSE, VIT Vellore • 1+ Year Professional Experience</p>
                  <p className="font-mono opacity-70 text-[10px] tracking-wide">Real-World Cases: Damora AI & CareMagnus Applications</p>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* 
        ========================================================================
        FULL COMPREHENSIVE PRINTABLE BOOK (Only renders when window.print() fires)
        ========================================================================
      */}
      <div className="hidden print-only print-container font-serif text-editorial-charcoal bg-white p-0 m-0">
        
        {/* PRINT COVER PAGE */}
        <div className="page-break-after flex flex-col justify-between min-h-[297mm] p-16 border-[16px] border-editorial-charcoal">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-editorial-charcoal/60 uppercase block">PROFESSIONAL TECHNICAL COMPILATION</span>
            <div className="h-[2px] w-12 bg-editorial-charcoal my-4"></div>
          </div>

          <div className="space-y-6 my-auto py-12">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-editorial-charcoal leading-tight">
              React.js Interview<br />Preparation Handbook
            </h1>
            <p className="text-base text-editorial-charcoal/80 max-w-xl leading-relaxed italic">
              An exhaustive study resource compiling 100 core React.js, Next.js, and MERN stack interview questions with rapid-response scripts, mental models, structural diagrams, and robust source code templates.
            </p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-b border-editorial-border py-6 max-w-md">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400">Chapters Included</span>
                <p className="text-sm font-bold text-editorial-charcoal">12 Chapters</p>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-stone-400">Total Solved QA</span>
                <p className="text-sm font-bold text-editorial-charcoal">100 Premium Questions</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-editorial-border pt-8">
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] font-mono uppercase font-bold text-stone-400">Candidate Profile</p>
                <p className="font-bold text-editorial-charcoal text-sm">Lavneet Sharma</p>
                <p className="text-stone-500 text-[11px]">B.Tech in Computer Science, VIT Vellore (1+ Yr Exp)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase font-bold text-stone-400">Case Study Context</p>
                <p className="font-bold text-editorial-charcoal text-sm">Damora AI & CareMagnus</p>
                <p className="text-stone-500 text-[11px]">Next.js SaaS • WebSockets • Stripe Integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="page-break-after p-12 space-y-8">
          <h2 className="text-2xl font-serif font-bold text-editorial-charcoal border-b-2 border-editorial-charcoal pb-3">Table of Contents</h2>
          
          <div className="space-y-4">
            {chapters.map(ch => (
              <div key={ch.id} className="flex justify-between items-baseline border-b border-dotted border-editorial-border pb-1">
                <div className="space-x-2">
                  <span className="font-mono font-bold text-editorial-charcoal/50 text-sm">Chapter {ch.id}</span>
                  <span className="font-bold text-editorial-charcoal text-sm">{ch.title}</span>
                </div>
                <span className="font-mono text-xs text-stone-400">QA {ch.id * 8 - 7} - {Math.min(100, ch.id * 8 + 1)}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline border-b border-dotted border-editorial-border pb-1 pt-4">
              <span className="font-bold text-editorial-charcoal text-sm">React Interview Cheat Sheet & Revision Checklists</span>
              <span className="font-mono text-xs text-stone-400">Appendix A</span>
            </div>
          </div>
        </div>

        {/* PRINT ALL 12 CHAPTERS & 100 QUESTIONS SEQUENTIALLY */}
        {chapters.map(ch => {
          const chQuestions = rawQuestions.filter(q => q.chapterId === ch.id);
          return (
            <div key={ch.id} className="p-12 space-y-10">
              {/* Chapter Header */}
              <div className="page-break-before border-b-4 border-editorial-charcoal pb-4">
                <span className="font-mono text-xs font-bold text-editorial-accent uppercase tracking-widest">Syllabus Chapter {ch.id}</span>
                <h2 className="text-3xl font-serif font-bold text-editorial-charcoal mt-1">{ch.title}</h2>
                <p className="text-sm text-stone-500 mt-2 italic">{ch.description}</p>
              </div>

              {/* Questions mapping */}
              <div className="space-y-12">
                {chQuestions.map(q => {
                  const fullQ = getQuestionDetails(q.id);
                  return (
                    <div key={q.id} className="page-break-avoid space-y-4 border-b border-editorial-border/20 pb-8 last:border-0 last:pb-0">
                      
                      {/* Q Title */}
                      <div className="flex items-start space-x-3">
                        <span className="font-mono text-base font-bold text-editorial-accent">Q{fullQ.id}.</span>
                        <h3 className="text-base font-serif font-bold text-editorial-charcoal leading-snug">{fullQ.title}</h3>
                      </div>

                      {/* 30s Answer */}
                      <div className="p-4 bg-editorial-bg border-l-4 border-editorial-accent">
                        <span className="text-[9px] font-mono uppercase font-bold text-editorial-accent block mb-1">Verbal Interview Response (30-60 Seconds)</span>
                        <p className="text-xs font-bold italic text-editorial-charcoal leading-relaxed">
                          "{fullQ.answer30s}"
                        </p>
                      </div>

                      {/* Detailed Explanations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
                        <div>
                          <span className="font-bold text-editorial-charcoal block mb-1 font-sans">What It Is & Core Theory</span>
                          <p className="text-editorial-charcoal/80 leading-relaxed font-sans">{fullQ.explanation.what}</p>
                        </div>
                        <div>
                          <span className="font-bold text-editorial-charcoal block mb-1 font-sans">Problem Solved & Real Benefits</span>
                          <p className="text-editorial-charcoal/80 leading-relaxed font-sans">{fullQ.explanation.problemSolved}</p>
                        </div>
                      </div>

                      {/* Mental Model */}
                      <div className="p-3 bg-editorial-bg border border-editorial-border text-xs">
                        <span className="font-bold text-editorial-charcoal font-sans">Concept Analogy: {fullQ.mentalModel.analogy}</span>
                        <p className="text-editorial-charcoal/70 mt-1 font-sans">{fullQ.mentalModel.description}</p>
                      </div>

                      {/* Code Block if key */}
                      <div className="bg-stone-50 border border-stone-200 p-4 font-mono text-[9px] text-stone-800 overflow-hidden leading-relaxed whitespace-pre-wrap">
                        <code>{fullQ.code}</code>
                      </div>

                      {/* Walkthrough */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-stone-400 uppercase font-bold tracking-wider">Execution Step Walkthrough:</span>
                        <ol className="list-decimal list-inside text-xs text-editorial-charcoal/75 space-y-1 pl-1 font-sans">
                          {fullQ.walkthrough.map((step, idx) => (
                            <li key={idx} className="font-sans">{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Mistakes */}
                      <div className="bg-rose-50/40 p-3 border border-rose-200/50 text-[11px] leading-relaxed">
                        <span className="font-bold text-rose-800 block font-sans">Common Pitfalls & Mistakes:</span>
                        <p className="text-stone-700 mt-1 font-sans"><b>Junior level:</b> {fullQ.mistakes.freshers}</p>
                        <p className="text-stone-700 font-sans"><b>Mid-level (1-2 Yr):</b> {fullQ.mistakes.midLevel}</p>
                      </div>

                      {/* Project Application */}
                      <div className="p-3 bg-stone-100 border border-stone-300 text-stone-900 text-[11px]">
                        <span className="font-bold text-editorial-accent uppercase tracking-widest font-mono text-[9px]">Case Study: {fullQ.realProject.name}</span>
                        <p className="text-stone-800 mt-1 italic font-serif">{fullQ.realProject.detail}</p>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

        {/* CHEAT SHEETS APPENDIX IN PRINT */}
        <div className="page-break-before p-12 space-y-8">
          <h2 className="text-3xl font-serif font-bold text-editorial-charcoal border-b-4 border-editorial-charcoal pb-4">Appendix A: Cheat Sheets & High-Yield Lists</h2>
          
          {Object.entries(cheatsheets).map(([key, sheet]) => (
            <div key={key} className="page-break-avoid space-y-3 pb-8">
              <h3 className="text-lg font-serif font-bold text-editorial-charcoal border-b border-editorial-border pb-1">{sheet.title}</h3>
              <p className="text-xs text-stone-500 italic">{sheet.subtitle}</p>
              <div className="whitespace-pre-wrap font-mono text-xs text-editorial-charcoal/90 leading-relaxed">
                {sheet.content}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
