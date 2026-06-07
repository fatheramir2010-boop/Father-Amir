import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-900 to-secondary flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Mini Data</h1>
            <p className="text-gray-300">Welcome back</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/20 transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/20 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-accent to-green-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-accent/50 transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">New user?</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="w-full block text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg border border-white/20 transition"
          >
            Create Account
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2024 Mini Data App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
