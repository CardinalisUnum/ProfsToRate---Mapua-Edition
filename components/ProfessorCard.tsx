
import React from 'react';
import { Professor, ProfStats } from '../types';
import { Avatar } from './Avatar';
import { GraduationCap, Star, MapPin } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor;
  stats: ProfStats;
  onWriteReview: () => void;
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor, stats, onWriteReview }) => {
  
  const getQualityColor = (score: number) => {
    if (score >= 4.0) return 'text-emerald-700';
    if (score >= 3.0) return 'text-[#F3C623]'; // Gold
    return 'text-[#C0262E]'; // Cardinal Red
  };

  const getTakeAgainColor = (percent: number) => {
    if (percent >= 70) return 'text-emerald-700';
    if (percent >= 40) return 'text-[#F3C623]'; // Gold
    return 'text-[#C0262E]'; // Cardinal Red
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-200 p-8 mb-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
        
        {/* Identity Section */}
        <div className="flex gap-6 items-center">
          <Avatar name={professor.name} size="lg" className="shadow-lg" />
          
          <div>
            <h1 className="text-4xl font-bold text-slate-900 serif mb-2">{professor.name}</h1>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-center text-slate-600 font-medium text-sm">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#C0262E]" />
                <span>{professor.department}</span>
              </div>
              <span className="hidden sm:block text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C0262E]" />
                <span>{professor.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="w-full lg:w-auto mt-4 lg:mt-0">
           <button 
            onClick={onWriteReview}
            className="w-full lg:w-auto bg-[#C0262E] hover:bg-[#a01f26] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-red-900/10 flex items-center justify-center gap-2 active:scale-95"
           >
             <Star className="w-4 h-4 fill-white" />
             <span>Rate Professor</span>
           </button>
        </div>
      </div>

      <hr className="my-8 border-slate-100" />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Overall Quality */}
        <div className="flex flex-col p-5 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors group">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Overall Quality</div>
          <div className="flex items-baseline gap-2">
            <div className={`text-5xl font-black serif ${getQualityColor(stats.avgQuality)}`}>
              {stats.avgQuality.toFixed(1)}
            </div>
            <div className="text-slate-400 font-medium">/ 5.0</div>
          </div>
        </div>

        {/* Take Again */}
        <div className="flex flex-col p-5 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
           <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Would Take Again</div>
           <div className={`text-5xl font-black serif ${getTakeAgainColor(stats.percentTakeAgain)}`}>
              {stats.percentTakeAgain.toFixed(0)}%
            </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col p-5 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
           <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Level of Difficulty</div>
           <div className="flex items-baseline gap-2">
            <div className="text-5xl font-black serif text-slate-700">
              {stats.avgDifficulty.toFixed(1)}
            </div>
            <div className="text-slate-400 font-medium">/ 5.0</div>
          </div>
        </div>

      </div>
    </div>
  );
};
