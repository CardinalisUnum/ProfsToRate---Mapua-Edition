import React, { useMemo } from 'react';
import { ProfStats } from '../types';

interface AnalyticsDashboardProps {
  stats: ProfStats;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ stats }) => {
  
  const positiveTags = stats.topTags.filter(t => t.type === 'positive');
  const negativeTags = stats.topTags.filter(t => t.type === 'negative');
  const neutralTags = stats.topTags.filter(t => t.type === 'neutral');

  // Process Grade Distribution to match "5 Bars" requirement (Merging F and Drop)
  const chartData = useMemo(() => {
    const raw = stats.gradeDistribution;
    
    // Helper to safely get count
    const getCount = (key: string) => raw.find(r => r.name === key)?.count || 0;

    const processed = [
      { label: 'A', count: getCount('A') },
      { label: 'B', count: getCount('B') },
      { label: 'C', count: getCount('C') },
      { label: 'D', count: getCount('D') },
      { label: 'F/Drop', count: getCount('F') + getCount('Drop') }
    ];

    // Recalculate max for this view
    const max = Math.max(...processed.map(d => d.count), 1);

    return { data: processed, max };
  }, [stats.gradeDistribution]);

  const getBarColor = (label: string) => {
    if (['A', 'B'].includes(label)) return 'bg-green-500'; 
    if (['C'].includes(label)) return 'bg-yellow-500'; 
    return 'bg-red-400'; 
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Grade Distribution Chart (Pure CSS Histogram) */}
      <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 serif">
            Grade Distribution
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wide">
            {stats.totalReviews} Submissions
          </span>
        </div>
        
        <div className="relative h-48 w-full pt-6">
           {/* Background Grid Lines */}
           <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pl-2">
              <div className="w-full h-px bg-slate-100"></div>
              <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200"></div>
              <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200"></div>
              <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200"></div>
              <div className="w-full h-px bg-slate-200"></div>
           </div>

           {/* Bars */}
           <div className="absolute inset-0 flex items-end justify-between gap-4 pb-6 px-2 sm:px-8">
              {chartData.data.map((entry) => {
                const heightPercentage = (entry.count / chartData.max) * 100;
                const isZero = entry.count === 0;
                
                return (
                  <div key={entry.label} className="flex-1 flex flex-col items-center justify-end h-full group">
                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-slate-800 text-white text-xs py-1 px-2 rounded mb-2 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {entry.count} students ({Math.round((entry.count / stats.totalReviews) * 100)}%)
                    </div>

                    <div 
                      className={`w-full max-w-[48px] rounded-t-sm transition-all duration-500 ease-out relative ${getBarColor(entry.label)} ${isZero ? 'h-0.5 opacity-20' : 'hover:opacity-90'}`}
                      style={{ height: isZero ? '4px' : `${heightPercentage}%` }}
                    >
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-500">{entry.label}</span>
                  </div>
                );
              })}
           </div>
        </div>
      </div>

      {/* Attribute Cloud */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-6">
        
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Top Pros</h3>
          <div className="flex flex-wrap gap-2">
            {positiveTags.length > 0 ? positiveTags.map(tag => (
              <span key={tag.tag} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
                {tag.tag} <span className="opacity-60 ml-0.5">({tag.count})</span>
              </span>
            )) : <span className="text-slate-400 text-sm italic">No data yet.</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Common Cons</h3>
          <div className="flex flex-wrap gap-2">
            {negativeTags.length > 0 ? negativeTags.map(tag => (
              <span key={tag.tag} className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-100">
                {tag.tag} <span className="opacity-60 ml-0.5">({tag.count})</span>
              </span>
            )) : <span className="text-slate-400 text-sm italic">No data yet.</span>}
          </div>
        </div>

         <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Class Vibe</h3>
          <div className="flex flex-wrap gap-2">
            {neutralTags.length > 0 ? neutralTags.map(tag => (
              <span key={tag.tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                {tag.tag}
              </span>
            )) : <span className="text-slate-400 text-sm italic">No data yet.</span>}
          </div>
        </div>

      </div>
    </div>
  );
};