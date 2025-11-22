import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Hero />

      <footer className="bg-white text-center py-4 border-t mt-auto">
        <p className="text-gray-500 text-sm">
          © 2025 Mitra Trophy – Semua Hak Dilindungi
        </p>
      </footer>
    </div>
  );
}
