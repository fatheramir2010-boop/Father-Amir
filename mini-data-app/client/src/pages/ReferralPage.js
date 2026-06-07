import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const ReferralPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [referralStats, setReferralStats] = useState({
    referrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    referralCommission: 100, // ₦100 per referral
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch referral stats from backend
    // For now, using placeholder data
    setReferralStats({
      referrals: 5,
      totalEarnings: 500,
      pendingEarnings: 150,
      referralCommission: 100,
    });
  }, []);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralLink = `${window.location.origin}?ref=${user?.referralCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 text-gray-300 hover:text-white transition flex items-center gap-2"
      >
        ← Back to Dashboard
      </button>

      <div className="glass rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Referral Program 🎁</h1>
        <p className="text-gray-300">Earn money by inviting friends to Mini Data</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark rounded-xl p-6 border border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-medium">Total Referrals</h3>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-4xl font-bold text-accent">{referralStats.referrals}</p>
            <p className="text-gray-400 text-sm mt-2">Friends invited</p>
          </div>

          <div className="glass-dark rounded-xl p-6 border border-secondary/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-medium">Total Earnings</h3>
              <div className="text-2xl">💰</div>
            </div>
            <p className="text-4xl font-bold text-secondary">₦{referralStats.totalEarnings.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Lifetime earnings</p>
          </div>

          <div className="glass-dark rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-medium">Pending Earnings</h3>
              <div className="text-2xl">⏳</div>
            </div>
            <p className="text-4xl font-bold text-purple-400">₦{referralStats.pendingEarnings.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Awaiting withdrawal</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="glass rounded-xl p-8 mb-8">
          <h3 className="text-white text-xl font-bold mb-6">Your Referral Code</h3>

          {/* Code Display */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-6">
            <p className="text-gray-400 text-sm mb-2">Share this code with your friends:</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={user?.referralCode || ''}
                readOnly
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyReferralCode}
                className="bg-accent/20 hover:bg-accent/30 text-accent border border-accent rounded-lg px-4 py-3 transition font-semibold"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-6">
            <p className="text-gray-400 text-sm mb-2">Or share your referral link:</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none truncate"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="bg-accent/20 hover:bg-accent/30 text-accent border border-accent rounded-lg px-4 py-3 transition font-semibold whitespace-nowrap"
              >
                {copied ? '✓ Copied' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button className="glass rounded-lg p-4 text-center hover:scale-105 transition">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-white text-sm font-semibold">WhatsApp</p>
            </button>
            <button className="glass rounded-lg p-4 text-center hover:scale-105 transition">
              <div className="text-3xl mb-2">📘</div>
              <p className="text-white text-sm font-semibold">Facebook</p>
            </button>
            <button className="glass rounded-lg p-4 text-center hover:scale-105 transition">
              <div className="text-3xl mb-2">𝕏</div>
              <p className="text-white text-sm font-semibold">Twitter</p>
            </button>
            <button className="glass rounded-lg p-4 text-center hover:scale-105 transition">
              <div className="text-3xl mb-2">💌</div>
              <p className="text-white text-sm font-semibold">Email</p>
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="glass rounded-xl p-8">
          <h3 className="text-white text-xl font-bold mb-6">How It Works</h3>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                1
              </div>
              <div>
                <p className="text-white font-semibold">Share Your Referral Code</p>
                <p className="text-gray-400 text-sm">Send your unique referral code to friends</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                2
              </div>
              <div>
                <p className="text-white font-semibold">Friend Signs Up</p>
                <p className="text-gray-400 text-sm">Your friend registers using your referral code</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                3
              </div>
              <div>
                <p className="text-white font-semibold">Earn Commission</p>
                <p className="text-gray-400 text-sm">Get ₦{referralStats.referralCommission} for each successful referral</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                4
              </div>
              <div>
                <p className="text-white font-semibold">Withdraw Earnings</p>
                <p className="text-gray-400 text-sm">Withdraw your earnings to your bank account anytime</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-gradient-to-r from-accent to-green-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-accent/50 transition">
            Withdraw Earnings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
