import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";
import StoryCopy from "@/components/StoryCopy";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <FilmGrain />
      <Navbar />
      
      {/* 
        This empty div controls the total scrollable height.
        We have doubled this to 1200vh so the "movie" takes longer to scroll 
        and keeps the user deeply engaged.
      */}
      <div className="h-[1200vh] w-full" />
      
      <CanvasSequence />
      <StoryCopy />
      <Footer />
    </main>
  );
}
