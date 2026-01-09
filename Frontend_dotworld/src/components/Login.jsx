import React, { useState } from 'react';

function Login({ onLogin, onGoToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Cannot connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px #c7d2fe')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 0 2px #c7d2fe')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = '#4338ca')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = '#4f46e5')
            }
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.signupLink}>
          <p>Don&apos;t have an account?</p>
          <button onClick={onGoToSignup} style={styles.linkButton}>
            Sign up here
          </button>
        </div>

        <div style={styles.testInfo}>
          <p><strong>Test Account</strong></p>
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
    height: '100vh',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },

  box: {
    backgroundColor: '#ffffff',
    padding: '36px',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    width: '360px',
    textAlign: 'center'
  },

  title: {
    marginBottom: '6px',
    fontSize: '22px',
    fontWeight: '700'
  },

  subtitle: {
    marginBottom: '24px',
    fontSize: '14px',
    color: '#666'
  },

  error: {
    backgroundColor: '#ffe5e5',
    color: '#c62828',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px'
  },

  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'box-shadow 0.2s, border-color 0.2s'
  },

  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },

  signupLink: {
    textAlign: 'center',
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid #eee',
    fontSize: '14px'
  },

  linkButton: {
    background: 'none',
    border: 'none',
    color: '#4f46e5',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'underline',
    marginTop: '6px'
  },

  testInfo: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#444'
  }
};

export default Login;
