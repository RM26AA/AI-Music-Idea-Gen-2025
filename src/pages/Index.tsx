import { useState } from "react";
import { MusicGenerator } from "@/components/MusicGenerator";
import { Music2, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-purple">
              <Music2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Music Idea Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your musical vision into reality. Generate chord progressions, melodies, 
            lyrics, and production ideas powered by AI.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-accent">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <MusicGenerator />
      </main>
    </div>
  );
};

export default Index;