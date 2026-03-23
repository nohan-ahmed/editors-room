import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className, iconOnly = false, variant = 'light' }) => {
  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:rotate-[360deg] shadow-lg",
        variant === 'light' ? "bg-white" : "bg-zinc-900 border border-white/10"
      )}>
        <img 
          src="/logo.png" 
          alt="ER Agency Logo" 
          className="w-8 h-8 object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if logo.png is missing
            e.currentTarget.src = "https://picsum.photos/seed/er-logo/100/100";
          }}
        />
      </div>
      {!iconOnly && (
        <span className={cn(
          "font-display font-bold text-2xl tracking-tighter transition-colors",
          variant === 'light' ? "text-white group-hover:text-brand" : "text-white group-hover:text-brand"
        )}>
          Editors Room
        </span>
      )}
    </div>
  );
};

export default Logo;
