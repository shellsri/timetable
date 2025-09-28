import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import DataEntry from '@/pages/DataEntry';
import TimetableGenerator from '@/pages/TimetableGenerator';
import TimetableViewer from '@/pages/TimetableViewer';
import ApprovalWorkflow from '@/pages/ApprovalWorkflow';
import Layout from '@/components/Layout';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/data-entry" element={
        <ProtectedRoute>
          <Layout><DataEntry /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/generate" element={
        <ProtectedRoute>
          <Layout><TimetableGenerator /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/timetable" element={
        <ProtectedRoute>
          <Layout><TimetableViewer /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/approval" element={
        <ProtectedRoute>
          <Layout><ApprovalWorkflow /></Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Helmet>
            <title>College Timetable Management System</title>
            <meta name="description" content="Advanced timetable management system for colleges with constraint-based scheduling and approval workflows" />
          </Helmet>
          <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
            <AppRoutes />
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
