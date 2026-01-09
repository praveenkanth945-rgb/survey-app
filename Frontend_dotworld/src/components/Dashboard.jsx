import React, { useState, useEffect } from 'react';

function Dashboard({ user, onCreateSurvey, onLogout }) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/surveys');
      const data = await response.json();
      if (data.success) {
        setSurveys(data.surveys);
      }
    } catch (error) {
      console.log('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSurveys = () => {
    fetchSurveys();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Survey Dashboard</h1>
            <p style={styles.subtitle}>
              Manage and track your surveys
            </p>
          </div>

          <div style={styles.buttons}>
            <button onClick={onCreateSurvey} style={styles.createButton}>
              + Create Survey
            </button>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        <div style={styles.userInfo}>
          <p>
            Welcome, <strong>{user?.fullName || 'User'}</strong>
          </p>
          <button onClick={refreshSurveys} style={styles.refreshButton}>
            Refresh
          </button>
        </div>

        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3>Total Surveys</h3>
            <p style={styles.statValue}>
              {loading ? '...' : surveys.length}
            </p>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Your Surveys</h2>

        {loading ? (
          <p>Loading surveys...</p>
        ) : surveys.length === 0 ? (
          <div style={styles.empty}>
            <p>No surveys created yet.</p>
            <button onClick={onCreateSurvey} style={styles.createButton}>
              Create Your First Survey
            </button>
          </div>
        ) : (
          <div style={styles.surveyList}>
            {surveys.map((survey) => (
              <div key={survey._id} style={styles.surveyCard}>
                <h3 style={styles.surveyTitle}>{survey.title}</h3>
                <p>Questions: {survey.questions?.length || 0}</p>
                <p>Responses: {survey.responses || 0}</p>
                <p style={styles.date}>
                  Created: {new Date(survey.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },

  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px 20px'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },

  title: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '700'
  },

  subtitle: {
    marginTop: '4px',
    color: '#666',
    fontSize: '14px'
  },

  buttons: {
    display: 'flex',
    gap: '10px'
  },

  createButton: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  logoutButton: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  userInfo: {
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    borderRadius: '8px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },

  refreshButton: {
    backgroundColor: '#0ea5e9',
    color: '#fff',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  stats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px'
  },

  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },

  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    marginTop: '10px'
  },

  sectionTitle: {
    marginBottom: '15px'
  },

  empty: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },

  surveyList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '16px'
  },

  surveyCard: {
    backgroundColor: '#ffffff',
    padding: '18px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #4f46e5'
  },

  surveyTitle: {
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '700'
  },

  date: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#666'
  }
};

export default Dashboard;
