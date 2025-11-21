
import React, { useMemo } from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  
  const initials = useMemo(() => {
    // Remove titles
    const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Engr\.|Atty\.|Sir)\s*/, '');
    // Handle "Lastname, Firstname" format
    let parts = cleanName.trim().split(',');
    
    if (parts.length > 1) {
        // Format: "Balan, Ariel" -> AB
        const lastName = parts[0].trim();
        const firstName = parts[1].trim();
        return (firstName[0] + lastName[0]).toUpperCase();
    }

    // Handle "Firstname Lastname" format
    parts = cleanName.trim().split(' ');
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }, [name]);

  const colorClass = useMemo(() => {
    // Mapúa Brand Palette
    // Cardinal Red: #C0262E
    // Gold: #F3C623
    // Black: #1e293b (slate-900)
    // Gray: #475569 (slate-600)
    
    const colors = [
      'bg-[#C0262E] text-white',     // Cardinal Red
      'bg-[#F3C623] text-slate-900', // Gold (Dark text for contrast)
      'bg-slate-900 text-white',     // Black
      'bg-slate-600 text-white',     // Gray
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }, [name]);

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-base', // Adjusted for better fit in list view
    lg: 'w-24 h-24 text-3xl',
    xl: 'w-32 h-32 text-4xl'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClass} ${className} rounded-full flex items-center justify-center font-serif font-bold tracking-wider shadow-sm shrink-0 border-2 border-white select-none`}>
      {initials}
    </div>
  );
};
