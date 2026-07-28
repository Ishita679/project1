import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#e53935] flex items-center justify-center text-white font-bold font-serif text-lg">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-wide leading-none mb-1">TubeMind</span>
            <span className="text-[#e53935] text-[10px] uppercase tracking-widest font-semibold leading-none">
              Watch less - Learn more
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-[#9ca3af]">
        <Link to="/dashboard" className="hover:text-white transition-colors">Home</Link>
        <Link to="/dashboard/history" className="hover:text-white transition-colors">Library</Link>
        <Link to="/dashboard/favorites" className="hover:text-white transition-colors">Favorites</Link>
        <Link to="/dashboard/settings" className="hover:text-white transition-colors">Settings</Link>
        
        <button onClick={handleLogout} className="text-[#e53935] hover:text-[#ff4d4d] transition-colors ml-4 flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
