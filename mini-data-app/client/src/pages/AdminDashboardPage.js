import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    totalWalletBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [dashRes, usersRes] = await Promise.all([
        apiClient.get('/admin/dashboard'),
        apiClient.get('/admin/users'),
      ]);
      setStats(dashRes.data || {});
      setUsers(usersRes.data.users || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 text-center text-white">
          <p className="text-2xl font-bold mb-4">Access Denied</p>
          <p className="text-gray-300">You do not have permission to access this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-6">
      <nav className="glass rounded-lg p-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition border border-red-500/30"
        >
          Logout
        </button>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-dark rounded-xl p-6 border border-blue-500/30">
          <p className="text-gray-300 text-sm font-medium mb-2">Total Users</p>
          <p className="text-4xl font-bold text-blue-400">{stats.totalUsers}</p>
        </div>

        <div className="glass-dark rounded-xl p-6 border border-green-500/30">
          <p className="text-gray-300 text-sm font-medium mb-2">Total Transactions</p>
          <p className="text-4xl font-bold text-green-400">{stats.totalTransactions}</p>
        </div>

        <div className="glass-dark rounded-xl p-6 border border-purple-500/30">
          <p className="text-gray-300 text-sm font-medium mb-2">Total Revenue</p>
          <p className="text-4xl font-bold text-purple-400">₦{stats.totalRevenue?.toLocaleString() || 0}</p>
        </div>

        <div className="glass-dark rounded-xl p-6 border border-accent/30">
          <p className="text-gray-300 text-sm font-medium mb-2">Wallet Balance</p>
          <p className="text-4xl font-bold text-accent">₦{stats.totalWalletBalance?.toLocaleString() || 0}</p>
        </div>
      </div>

      <div className="glass rounded-lg p-4 mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-accent text-slate-900'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'users'
                ? 'bg-accent text-slate-900'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'transactions'
                ? 'bg-accent text-slate-900'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Transactions
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Active Users:</span>
                  <span className="text-accent font-bold">{stats.totalUsers}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Pending Transactions:</span>
                  <span className="text-yellow-400 font-bold">23</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>System Revenue:</span>
                  <span className="text-green-400 font-bold">₦{stats.totalRevenue?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">✓ New user registration</p>
                <p className="text-gray-400">✓ Data purchase completed</p>
                <p className="text-gray-400">✓ Wallet funding initiated</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
          {loading ? (
            <p className="text-gray-400">Loading users...</p>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-300 py-3">Name</th>
                    <th className="text-left text-gray-300 py-3">Email</th>
                    <th className="text-left text-gray-300 py-3">Phone</th>
                    <th className="text-left text-gray-300 py-3">Wallet</th>
                    <th className="text-left text-gray-300 py-3">Status</th>
                    <th className="text-left text-gray-300 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((user) => (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="text-white py-3">{user.name}</td>
                      <td className="text-gray-300 py-3">{user.email}</td>
                      <td className="text-gray-300 py-3">{user.phone}</td>
                      <td className="text-accent py-3">₦{user.walletBalance?.toLocaleString() || 0}</td>
                      <td className="text-white py-3">
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                          {user.accountStatus}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-accent hover:text-accent text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No users found</p>
          )}
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Transaction Management</h2>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <p className="text-gray-400">Transaction monitoring and analytics coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
