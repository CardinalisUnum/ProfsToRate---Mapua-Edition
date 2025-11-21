
import React, { useState, useMemo } from 'react';
import { INITIAL_PROFESSORS, POSITIVE_TAGS, NEGATIVE_TAGS, SOIT_LOGO_URL } from './constants';
import { Professor, ProfStats, Review } from './types';
import { ProfessorCard } from './components/ProfessorCard';
import { ProfessorListCard } from './components/ProfessorListCard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ReviewList } from './components/ReviewList';
import { ReviewModal } from './components/ReviewModal';
import { AddProfessorModal } from './components/AddProfessorModal';
import { Search, ArrowLeft, Filter, SlidersHorizontal, ChevronDown, Plus } from 'lucide-react';

// Department Acronym Mapping for smarter search
const DEPARTMENT_ALIASES: Record<string, string> = {
  'cs': 'Computer Science',
  'it': 'Information Technology',
  'is': 'Information Systems',
  'cpe': 'Computer Engineering',
  'netsec': 'Network Security',
  'game': 'Game Development',
  'da': 'Data Analytics',
  'data': 'Data Analytics',
  'qa': 'Quality Assurance',
  'security': 'Network Security'
};

// Helper to calculate stats for any professor
const calculateStats = (reviews: Review[]): ProfStats => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
        return {
            avgQuality: 0,
            avgDifficulty: 0,
            percentTakeAgain: 0,
            totalReviews: 0,
            gradeDistribution: [],
            topTags: []
        };
    }

    const totalQuality = reviews.reduce((acc, r) => acc + r.qualityRating, 0);
    const totalDifficulty = reviews.reduce((acc, r) => acc + r.difficultyRating, 0);
    const takeAgainCount = reviews.filter(r => r.wouldTakeAgain).length;

    // Grade Distribution
    const grades = ['A', 'B', 'C', 'D', 'F', 'Drop'];
    const gradeDistribution = grades.map(g => ({
        name: g,
        count: reviews.filter(r => r.gradeReceived === g).length
    }));

    // Tags Count
    const tagCounts: Record<string, number> = {};
    reviews.forEach(r => {
        r.tags.forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
    });

    const topTags = Object.entries(tagCounts)
        .map(([tag, count]) => {
            let type: 'positive' | 'negative' | 'neutral' = 'neutral';
            if (POSITIVE_TAGS.includes(tag)) type = 'positive';
            if (NEGATIVE_TAGS.includes(tag)) type = 'negative';
            return { tag, count, type };
        })
        .sort((a, b) => b.count - a.count);

    return {
        avgQuality: totalQuality / totalReviews,
        avgDifficulty: totalDifficulty / totalReviews,
        percentTakeAgain: (takeAgainCount / totalReviews) * 100,
        totalReviews,
        gradeDistribution,
        topTags
    };
};

type View = 'list' | 'detail';
type SortOption = 'name' | 'takeAgain' | 'difficulty';

const App: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>(INITIAL_PROFESSORS);
  const [view, setView] = useState<View>('list');
  const [selectedProfessorId, setSelectedProfessorId] = useState<string | null>(null);
  
  // Modals
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAddProfModalOpen, setIsAddProfModalOpen] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Derived Data
  const departments = ['All', ...Array.from(new Set(professors.map(p => p.department))).sort()];

  const filteredProfessors = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Check if search term matches a known alias (e.g. "cs" -> "Computer Science")
    const aliasMatch = DEPARTMENT_ALIASES[normalizedSearch];

    let result = professors.filter(p => {
        const nameMatches = p.name.toLowerCase().includes(normalizedSearch);
        const deptMatches = p.department.toLowerCase().includes(normalizedSearch);
        const uniMatches = p.university.toLowerCase().includes(normalizedSearch);
        const aliasMatches = aliasMatch ? p.department.toLowerCase().includes(aliasMatch.toLowerCase()) : false;

        const matchesSearch = nameMatches || deptMatches || uniMatches || aliasMatches;
        const matchesDropdown = selectedDepartment === 'All' || p.department === selectedDepartment;

        return matchesSearch && matchesDropdown;
    });

    // Attach stats for sorting
    const withStats = result.map(p => ({
        professor: p,
        stats: calculateStats(p.reviews)
    }));

    // Sort
    withStats.sort((a, b) => {
        if (sortOption === 'name') return a.professor.name.localeCompare(b.professor.name);
        if (sortOption === 'takeAgain') return b.stats.percentTakeAgain - a.stats.percentTakeAgain;
        if (sortOption === 'difficulty') return a.stats.avgDifficulty - b.stats.avgDifficulty; 
        return 0;
    });

    return withStats;
  }, [professors, searchTerm, selectedDepartment, sortOption]);

  const selectedProfessor = professors.find(p => p.id === selectedProfessorId);
  const selectedStats = selectedProfessor ? calculateStats(selectedProfessor.reviews) : null;

  const handleAddReview = (reviewData: Partial<Review>) => {
    const newReview = {
        ...reviewData,
        id: Math.random().toString(36).substr(2, 9)
    } as Review;

    const updatedProfessors = professors.map(p => {
        if (p.id === selectedProfessorId) {
            return { ...p, reviews: [...p.reviews, newReview] };
        }
        return p;
    });

    setProfessors(updatedProfessors);
  };

  const handleAddProfessor = (profData: Partial<Professor>) => {
      const newProf: Professor = {
          id: Math.random().toString(36).substr(2, 9),
          name: profData.name || 'Unknown',
          department: profData.department || 'General',
          university: profData.university || 'Unknown',
          avatarUrl: '',
          reviews: []
      };

      setProfessors([...professors, newProf]);
      // Optionally automatically view the new prof
      setSelectedProfessorId(newProf.id);
      setView('detail');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if (view === 'detail' && e.target.value.length > 0) {
          setView('list');
      }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 text-slate-800 font-sans">
      
      {/* Navigation / Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center gap-4 cursor-pointer group self-start md:self-auto"
            onClick={() => {
                setView('list');
                setSearchTerm('');
                setSelectedDepartment('All');
            }}
          >
            {/* Official SOIT Logo Asset (Loaded via Data URI to prevent 404) */}
            <img 
              src={SOIT_LOGO_URL} 
              alt="SOIT Logo" 
              className="h-14 w-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
            />

            <div className="flex flex-col">
                 <span className="text-2xl font-bold text-[#C0262E] serif tracking-tight leading-none">ProfRate: SOIT</span>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-0.5">Mapúa - Makati Campus</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text"
                    placeholder="Search faculty, or type 'CS', 'IT'..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-700 placeholder-slate-400 shadow-inner focus:bg-white focus:border-[#C0262E] focus:ring-1 focus:ring-[#C0262E] transition-all"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <button 
                onClick={() => setIsAddProfModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-white border border-slate-300 text-slate-700 font-bold px-4 py-3 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm whitespace-nowrap"
                title="Submit a Professor"
            >
                <Plus className="w-5 h-5" />
                <span>Add Faculty</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Add Button (Floating) */}
      <button 
            onClick={() => setIsAddProfModalOpen(true)}
            className="md:hidden fixed bottom-6 right-6 z-50 bg-[#C0262E] text-white p-4 rounded-full shadow-xl shadow-red-900/20 hover:bg-[#a01f26] active:scale-95 transition-all"
        >
            <Plus className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {view === 'list' && (
            <div className="animate-fade-in">
                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-6 mb-10 items-start lg:items-end justify-between">
                    
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 serif mb-2">Faculty Directory</h1>
                        <p className="text-slate-500">SOIT Professor ratings for CS, IT, and IS students.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        
                        <div className="relative group">
                           <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Filter className="w-4 h-4 text-slate-400 group-hover:text-[#C0262E] transition-colors" />
                           </div>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select 
                                value={selectedDepartment} 
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full sm:w-auto pl-10 pr-10 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none shadow-sm appearance-none cursor-pointer min-w-[180px] hover:border-slate-400 transition-colors"
                            >
                                {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
                            </select>
                        </div>

                        <div className="relative group">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <SlidersHorizontal className="w-4 h-4 text-slate-400 group-hover:text-[#C0262E] transition-colors" />
                             </div>
                             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                             <select 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="w-full sm:w-auto pl-10 pr-10 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none shadow-sm appearance-none cursor-pointer min-w-[200px] hover:border-slate-400 transition-colors"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="takeAgain">Sort by Rating (High)</option>
                                <option value="difficulty">Sort by Difficulty (Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProfessors.map(({ professor, stats }) => (
                        <ProfessorListCard 
                            key={professor.id}
                            professor={professor}
                            stats={stats}
                            onClick={() => {
                                setSelectedProfessorId(professor.id);
                                setView('detail');
                                window.scrollTo(0, 0);
                            }}
                        />
                    ))}
                </div>

                {filteredProfessors.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm mt-6">
                        <div className="text-slate-200 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No faculty found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your search criteria.</p>
                        <button 
                            onClick={() => setIsAddProfModalOpen(true)}
                            className="bg-[#C0262E] text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-[#a01f26] transition-colors"
                        >
                            Add Faculty Member
                        </button>
                    </div>
                )}
            </div>
        )}

        {view === 'detail' && selectedProfessor && selectedStats && (
            <div className="animate-fade-in">
                <button 
                    onClick={() => setView('list')}
                    className="group flex items-center gap-2 text-slate-500 hover:text-[#C0262E] font-medium mb-8 transition-colors px-1"
                >
                    <div className="p-1 rounded-full group-hover:bg-red-50 transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                    </div>
                    Back to Directory
                </button>

                <ProfessorCard 
                    professor={selectedProfessor} 
                    stats={selectedStats} 
                    onWriteReview={() => setIsReviewModalOpen(true)} 
                />

                <div className="mt-8">
                  <AnalyticsDashboard stats={selectedStats} />
                </div>

                <div className="mt-8">
                  <ReviewList reviews={selectedProfessor.reviews} />
                </div>
                
                <ReviewModal 
                    isOpen={isReviewModalOpen} 
                    onClose={() => setIsReviewModalOpen(false)}
                    onSubmit={handleAddReview}
                    professorName={selectedProfessor.name}
                />
            </div>
        )}

      </main>

      {/* Global Modals */}
      <AddProfessorModal 
        isOpen={isAddProfModalOpen}
        onClose={() => setIsAddProfModalOpen(false)}
        onSubmit={handleAddProfessor}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="opacity-80 grayscale hover:grayscale-0 transition-all">
                <img 
                  src={SOIT_LOGO_URL} 
                  alt="SOIT Logo" 
                  className="h-10 w-auto" 
                />
             </div>
             <span className="font-bold text-slate-800 serif">ProfRate: SOIT</span>
          </div>
          <p className="text-slate-400 text-sm">&copy; 2024 Mapúa SOIT Student Council. Built for academic transparency.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
