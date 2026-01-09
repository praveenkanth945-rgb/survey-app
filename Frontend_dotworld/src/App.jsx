import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateSurvey from './components/CreateSurvey';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPage('dashboard');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setPage('dashboard');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPage('login');
  };

  // Show login page
  if (page === 'login') {
    return <Login onLogin={handleLogin} onGoToSignup={() => setPage('signup')} />;
  }

  // Show signup page
  if (page === 'signup') {
    return <Signup onSignup={handleSignup} onGoToLogin={() => setPage('login')} />;
  }

  // Show dashboard page
  if (page === 'dashboard') {
    return (
      <Dashboard 
        user={user}
        onCreateSurvey={() => setPage('create')} 
        onLogout={handleLogout}
      />
    );
  }

  // Show create survey page
  if (page === 'create') {
    return <CreateSurvey user={user} onBack={() => setPage('dashboard')} />;
  }

  return null;
}

export default App;