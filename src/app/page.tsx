import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';
import { WomenInTechGallery } from '@/components/WomenInTechGallery';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#050508] flex flex-col items-center">
      {/* Pinned Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Hero Section: The Mind of a Woman Developer */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10 shrink-0">
        <div className="relative w-full h-full">
          <NeuralConstellation />
        </div>

        {/* Cinematic Overlays relative to hero */}
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

      {/* Gallery Section: The Constellation Continues */}
      <section className="relative w-full z-20 bg-transparent">
        <WomenInTechGallery />
      </section>
    </main>
  );
}
