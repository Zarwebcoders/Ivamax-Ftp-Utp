import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Network from './pages/Network';
import Stake from './pages/Stake';
import BuyIMX from './pages/BuyIMX';
import Hierarchy from './pages/Hierarchy';
import Business from './pages/Business';
import AllRewards from './pages/AllRewards';
import DRP from './pages/DRP';
import UTP from './pages/UTP';

import Withdraw from './pages/Withdraw';

import Company from './pages/Company';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import DepositRequests from './pages/admin/DepositRequests';
import SupportAdmin from './pages/admin/SupportAdmin';
import AdminWithdrawals from './pages/admin/AdminWithdrawals';
import AllStakes from './pages/admin/AllStakes';
import Layout from './components/Layout';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    loadUser(); // Try to load user from token on app start
  }, [loadUser]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {user?.role !== 'admin' ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/network" element={<Network />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/buy-imx" element={<BuyIMX />} />
              <Route path="/hierarchy" element={<Hierarchy />} />
              <Route path="/business" element={<Business />} />

              <Route path="/drp" element={<DRP />} />
              <Route path="/utp" element={<UTP />} />
              <Route path="/all-rewards" element={<AllRewards />} />
              <Route path="/withdraw" element={<Withdraw />} />

              <Route path="/company" element={<Company />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          )}

          {/* Admin Routes */}
          {user?.role === 'admin' && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/deposits" element={<DepositRequests />} />
              <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
              <Route path="/admin/stakes" element={<AllStakes />} />
              <Route path="/admin/support" element={<SupportAdmin />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
