import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Marquee from "../components/Marquee";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] overflow-x-hidden bg-noise relative">
      <Navbar />
      <Marquee />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full z-10">
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
