
import React, { useState } from 'react';
import { Grade, Review } from '../types';
import { POSITIVE_TAGS, NEGATIVE_TAGS, NEUTRAL_TAGS } from '../constants';
import { X, Star } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: Partial<Review>) => void;
  professorName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, professorName }) => {
  const [courseCode, setCourseCode] = useState('');
  const [semester, setSemester] = useState('');
  const [qualityRating, setQualityRating] = useState(0);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [gradeReceived, setGradeReceived] = useState<Grade | ''>('');
  const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode || !semester || !gradeReceived || qualityRating === 0 || difficultyRating === 0 || wouldTakeAgain === null) {
        alert("Please fill out all required fields.");
        return;
    }

    const newReview: Partial<Review> = {
      courseCode,
      semester,
      year: new Date().getFullYear(), // Could parse this from semester input if needed
      gradeReceived: gradeReceived as Grade,
      qualityRating,
      difficultyRating,
      wouldTakeAgain,
      tags: selectedTags,
      comment,
      helpfulCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmit(newReview);
    onClose();
    // Reset form
    setCourseCode('');
    setSemester('');
    setQualityRating(0);
    setDifficultyRating(0);
    setComment('');
    setSelectedTags([]);
    setWouldTakeAgain(null);
    setGradeReceived('');
  };

  const StarRating = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`w-8 h-8 transition-transform hover:scale-110 ${star <= value ? 'text-[#F3C623] fill-[#F3C623]' : 'text-slate-300'}`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm overflow-y-auto py-10">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative m-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Rate {professorName}</h2>
        <p className="text-slate-500 text-sm mb-6">Share your experience to help other students.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Course Code</label>
              <input 
                type="text" 
                placeholder="e.g., CSS123"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Quarter/Term</label>
              <input 
                type="text" 
                placeholder="e.g., 1st Quarter 2023"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Grade Received</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] outline-none"
                value={gradeReceived}
                onChange={(e) => setGradeReceived(e.target.value as Grade)}
              >
                <option value="" disabled>Select Grade</option>
                {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <StarRating value={qualityRating} onChange={setQualityRating} label="Quality Rating" />
            <StarRating value={difficultyRating} onChange={setDifficultyRating} label="Difficulty Rating" />
          </div>

          <div className="mb-6">
             <label className="block text-sm font-semibold text-slate-700 mb-2">Would you take this professor again?</label>
             <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setWouldTakeAgain(true)}
                  className={`flex-1 py-2 rounded-lg border font-medium transition-all ${wouldTakeAgain === true ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setWouldTakeAgain(false)}
                  className={`flex-1 py-2 rounded-lg border font-medium transition-all ${wouldTakeAgain === false ? 'bg-red-50 border-red-500 text-red-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  No
                </button>
             </div>
          </div>

          <div className="mb-6">
             <label className="block text-sm font-semibold text-slate-700 mb-2">Select Tags (Max 3)</label>
             <div className="flex flex-wrap gap-2">
                {[...POSITIVE_TAGS, ...NEGATIVE_TAGS, ...NEUTRAL_TAGS].map(tag => (
                   <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedTags.includes(tag) ? 'bg-[#C0262E] border-[#C0262E] text-white' : 'bg-white border-slate-300 text-slate-600 hover:border-[#C0262E]'}`}
                   >
                    {tag}
                   </button>
                ))}
             </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Review</label>
            <textarea 
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] outline-none resize-none"
              placeholder="Be honest about teaching style, exams, and projects..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4">
             <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#C0262E] text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:bg-[#a01f26] transition-all active:scale-95"
            >
              Submit Review
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
