import { Sparkles } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

import React from "react";

const Auth_header = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-8">
      {/* Decorative floating icons */}
      <div className="relative h-16 w-full flex justify-center mb-4">
        <span className="absolute top-10 left-[42%] text-2xl opacity-50 animate-bounce select-none">
          🧹
        </span>
        <span className="absolute top-14 left-45 text-xl opacity-40 select-none">
          🧴
        </span>
        <Sparkles className="absolute top-3 left-[54%] w-6 h-6 text-violet-400 opacity-50" />
        <Sparkles className="absolute top-18 left-[62%] w-4 h-4 text-violet-300 opacity-70" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
};

export default Auth_header;
