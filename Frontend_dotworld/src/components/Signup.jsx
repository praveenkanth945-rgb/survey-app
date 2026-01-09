import React, { useState } from 'react';

function Signup({ onSignup, onGoToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!fullName || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onSignup(data.user);
        }, 1000);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('Cannot connect to server. Please try again later.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Create Account</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              style={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password (min 6 characters)"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div style={styles.footer}>
          <p>Already have an account?</p>
          <button 
            onClick={onGoToLogin}
            style={styles.linkButton}
            disabled={loading}
          >
            Login here
          </button>
        </div>
        
        <div style={styles.testInfo}>
          <p><strong>Note:</strong> You can also use the test account:</p>
          <p>Email: praveenkanth945@gmail.com</p>
          <p>Password: Praveen@24</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px'
  },
  box: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center'
  },
  success: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center'
  },
  form: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  footer: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    marginBottom: '20px'
  },
  linkButton: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
    marginLeft: '5px',
    textDecoration: 'underline'
  },
  testInfo: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#666',
    marginTop: '20px'
  }
};

export default Signup;