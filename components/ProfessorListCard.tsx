
import React from 'react';
import { Professor, ProfStats } from '../types';
import { Avatar } from './Avatar';
import { GraduationCap, MapPin, ArrowRight } from 'lucide-react';

interface ProfessorListCardProps {
  professor: Professor;
  stats: ProfStats;
  onClick: () => void;
}

export const ProfessorListCard: React.FC<ProfessorListCardProps> = ({ professor, stats, onClick }) => {
  
  // Get top 2 significant tags for the preview
  const previewTags = stats.topTags.slice(0, 2);

  const getScoreColor = (score: number) => {
    // Show gray if no reviews
    if (stats.totalReviews === 0) return 'text-slate-300 bg-slate-50 border-slate-100';

    if (score >= 4.0) return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    if (score >= 3.0) return 'text-[#F3C623] bg-yellow-50 border-yellow-100'; // Gold tint
    return 'text-[#C0262E] bg-red-50 border-red-100'; // Cardinal Red context
  };

  const getTakeAgainColor = (percent: number) => {
    if (stats.totalReviews === 0) return 'text-slate-300';
    if (percent >= 70) return 'text-emerald-700';
    if (percent >= 40) return 'text-[#F3C623]'; // Gold
    return 'text-[#C0262E]';
  };

  const qualityStyle = getScoreColor(stats.avgQuality);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-[#C0262E] transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden"
    >
      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Identity Section */}
        <div className="flex-1 flex gap-4 items-start min-w-0">
          <div className="shrink-0 pt-1">
             <Avatar name={professor.name} size="md" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-slate-900 serif group-hover:text-[#C0262E] transition-colors leading-tight mb-2 truncate pr-2">
              {professor.name}
            </h3>
            
            <div className="flex flex-col gap-1.5 mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{professor.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{professor.university}</span>
              </div>
            </div>

            {/* Top Tags Preview */}
            {previewTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {previewTags.map(t => (
                        <span key={t.tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">
                            {t.tag}
                        </span>
                    ))}
                </div>
            )}
          </div>
        </div>

        {/* Metrics Divider (Mobile Only) */}
        <div className="md:hidden h-px w-full bg-slate-100 my-2"></div>

        {/* Performance Metrics Section */}
        <div className="flex gap-5 md:border-l md:border-slate-100 md:pl-6 items-center justify-between md:justify-end shrink-0 md:w-auto w-full">
          
          {/* Hero Metric: Quality */}
          <div className="flex flex-col items-center justify-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black border ${qualityStyle} mb-1 shadow-sm`}>
              {stats.avgQuality.toFixed(1)}
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Quality</span>
          </div>

          {/* Secondary Metrics Stack */}
          <div className="flex flex-col gap-3 justify-center min-w-[90px]">
            
            {/* Take Again */}
            <div className="text-right">
              <div className={`text-lg font-bold leading-none mb-1 ${getTakeAgainColor(stats.percentTakeAgain)}`}>
                {stats.totalReviews > 0 ? `${stats.percentTakeAgain.toFixed(0)}%` : 'N/A'}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-slate-400 font-medium whitespace-nowrap">
                Take Again
              </div>
            </div>

            {/* Difficulty */}
            <div className="text-right">
              <div className="text-lg font-bold text-slate-700 leading-none mb-1">
                {stats.avgDifficulty.toFixed(1)}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-slate-400 font-medium whitespace-nowrap">
                Difficulty
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          {stats.totalReviews} student reviews
        </span>
        
        <div className="text-sm font-bold text-[#C0262E] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
          View Profile 
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
