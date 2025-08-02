// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/auth/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UsersPage } from './components/admin/UsersPage';
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry } from './registry/componentRegistry';
import { componentLibrary } from './registry/componentLibrary';

function App() {
  return (
    <DevModeApp system={{ registry: componentRegistry, library: componentLibrary }}>
      <AuthProvider>
        <Router>
          <Container componentId="app-root">
            <div className="App">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="audit-logs" element={<div>Audit Logs Page (Coming Soon)</div>} />
                  <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </DevModeApp>
  );
}

export default App;