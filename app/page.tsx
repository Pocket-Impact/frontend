import Image from "next/image";
import Navbar from "./components/root/Navbar";
import HeroSection from "./components/sections/HeroSection";


export default function Home() {
  return (
    <main className="px-4">
      <Navbar />
      <HeroSection />
    </main>
  );
}
