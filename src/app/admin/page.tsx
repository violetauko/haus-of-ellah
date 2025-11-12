'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple password check - in production use proper authentication
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full">
            <Lock className="text-amber-900" size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-amber-900 mb-2 text-center">Admin Login</h1>
        <p className="text-gray-600 mb-6 text-center">Enter your password to access the admin panel</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-amber-900 text-white py-3 rounded-lg font-bold hover:bg-amber-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}