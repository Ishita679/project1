import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { BrainCircuit } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center relative overflow-hidden bg-noise">
      <div className="absolute top-[10%] left-[20%] w-[80vw] h-[80vw] rounded-full border border-[var(--color-accent-gold)]/10 opacity-40 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-bg-tertiary)] blur-[200px] opacity-60 pointer-events-none" />
      
      <div className="glass-card w-full max-w-md p-8 relative z-10 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-500/30 mb-4">
            <BrainCircuit className="text-[var(--color-bg-primary)] w-7 h-7" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[var(--color-text-primary)] tracking-tight">Welcome Back</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-2 font-light">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-gold)] focus:bg-white/10 transition-colors"
              placeholder="you@example.com"
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-secondary)]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-none p-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-gold)] focus:bg-white/10 transition-colors"
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full py-4 rounded-none bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
          Don't have an account? <Link to="/register" className="text-[var(--color-accent-gold)] hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
