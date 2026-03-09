import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#050508] flex flex-col items-center overflow-x-hidden">
      {/* Pinned Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Hero Section: The Mind of a Woman Developer */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10 shrink-0">
        <div className="relative w-full h-full">
          <NeuralConstellation />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-light">
              Cognitive Core // Ver. 2.5
            </p>
            <div className="w-8 h-[1px] bg-white/10" />
          </div>
        </div>
        
        <div className="absolute bottom-12 right-12 z-20 pointer-events-none text-right">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-light">
            Neural Constellation Projection
          </p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/10 mt-1">
            Galleria Digital Installation 2024
          </p>
        </div>

        {/* Global Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-5" />
      </section>

      {/* Gallery Section: Women Who Shaped the Code */}
      <section className="relative w-full z-20 bg-transparent">
        <WomenInTechGallery />
      </section>

      {/* Poetic Ending Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center z-20 bg-transparent py-32">
        <div className="text-center space-y-8 max-w-2xl px-6">
          <div className="flex justify-center gap-4 mb-12">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className="w-1 h-1 rounded-full bg-white/40 animate-pulse" 
                style={{ animationDelay: `${i * 0.8}s` }}
              />
            ))}
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic">
            The Constellation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-rose-400">
              Continues
            </span>
          </h2>
          
          <p className="text-xs uppercase tracking-[1.5em] text-white/20 font-medium leading-loose pt-4">
            Every line of code <br className="md:hidden" /> writes the future.
          </p>

          <div className="pt-24 opacity-10">
            <div className="w-px h-32 bg-gradient-to-b from-white to-transparent mx-auto" />
          </div>
        </div>

        {/* Floating background nodes for the ending */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.1 + Math.random() * 0.2
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
