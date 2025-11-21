import React from 'react';
import { Review } from '../types';
import { ThumbsUp, ThumbsDown, Calendar, BookOpen } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  // Sort by date descending
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Student Reviews</h2>
      {sortedReviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200 transition hover:border-indigo-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            
            {/* Review Header Info */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded text-sm flex items-center gap-2 border border-indigo-100">
                <BookOpen className="w-3 h-3" />
                {review.courseCode}
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-sm bg-slate-50 px-2 py-1 rounded border border-slate-100">
                <Calendar className="w-3 h-3" />
                <span>{review.semester} {review.year}</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold border ${review.gradeReceived === 'A' || review.gradeReceived === 'B' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                Grade: {review.gradeReceived}
              </div>
            </div>

            {/* Review Meta */}
            <div className="text-xs text-slate-400 font-medium">
              {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Ratings Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm border-b border-slate-50 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Quality:</span>
              <span className={`font-black ${review.qualityRating >= 4 ? 'text-emerald-600' : 'text-slate-900'}`}>
                {review.qualityRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Difficulty:</span>
              <span className="font-black text-slate-900">{review.difficultyRating.toFixed(1)}</span>
            </div>
            <div>
                {review.wouldTakeAgain ? (
                    <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">✓ Would take again</span>
                ) : (
                    <span className="text-rose-600 font-bold text-xs bg-rose-50 px-2 py-1 rounded-full border border-rose-100">✗ Would not take again</span>
                )}
            </div>
          </div>

          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {review.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comment */}
          <p className="text-slate-700 leading-relaxed mb-6 font-normal">
            {review.comment}
          </p>

          {/* Helpful Actions */}
          <div className="flex items-center gap-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Helpful?</div>
            <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group">
              <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{review.helpfulCount}</span>
            </button>
             <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-600 transition-colors group">
              <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};