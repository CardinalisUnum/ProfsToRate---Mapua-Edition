
import React, { useState } from 'react';
import { Professor } from '../types';
import { UNIVERSITIES } from '../constants';
import { X, UserPlus, School, Building2, User } from 'lucide-react';

interface AddProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profData: Partial<Professor>) => void;
}

export const AddProfessorModal: React.FC<AddProfessorModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [university, setUniversity] = useState('');
  const [customUniversity, setCustomUniversity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUniversity = university === 'Other' ? customUniversity : university;

    if (!name || !department || !finalUniversity) {
        alert("Please fill out all fields.");
        return;
    }

    const newProf: Partial<Professor> = {
      name,
      department,
      university: finalUniversity,
      reviews: [] // Start with no reviews
    };

    onSubmit(newProf);
    onClose();
    // Reset form
    setName('');
    setDepartment('');
    setUniversity('');
    setCustomUniversity('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#C0262E] rounded-lg">
                <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 serif">Add Faculty</h2>
                <p className="text-slate-500 text-sm">Help grow our directory.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                Faculty Name
              </label>
              <input 
                type="text" 
                placeholder="e.g., Engr. Juan Dela Cruz"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" />
                Department
              </label>
              <input 
                type="text" 
                placeholder="e.g., Network Security"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <School className="w-4 h-4 text-slate-400" />
                Campus
              </label>
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all bg-white"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                <option value="" disabled>Select Campus</option>
                {UNIVERSITIES.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {university === 'Other' && (
                 <div className="animate-in fade-in slide-in-from-top-2">
                    <input 
                        type="text" 
                        placeholder="Enter Campus Name"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#C0262E] focus:border-[#C0262E] outline-none transition-all"
                        value={customUniversity}
                        onChange={(e) => setCustomUniversity(e.target.value)}
                    />
                 </div>
            )}

            <div className="pt-4 flex gap-3">
                <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#C0262E] text-white font-bold shadow-lg shadow-red-900/10 hover:bg-[#a01f26] transition-all active:scale-95"
                >
                    Submit
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};
