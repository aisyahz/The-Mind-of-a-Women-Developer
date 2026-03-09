
import { CosmicBackground } from '@/components/CosmicBackground';
import { NeuralConstellation } from '@/components/NeuralConstellation';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <CosmicBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        <NeuralConstellation />
      </div>

      {/* Persistent Footer Credit */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
          Interconnected Thinking &bull; Future of Innovation
        </p>
      </div>
      
      <div className="absolute top-6 right-6 z-20 pointer-events-none text-right">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
          Conceptual Visualization 01
        </p>
      </div>

      {/* Subtle vignettes */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-5" />
    </main>
  );
}
