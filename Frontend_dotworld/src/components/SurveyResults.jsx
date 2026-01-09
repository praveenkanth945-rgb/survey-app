import React from 'react';

function SurveyResults({ survey, onBack }) {
  if (!survey) {
    return (
      <div style={styles.container}>
        <h2>No survey results available</h2>
        <button onClick={onBack} style={styles.button}>Back to Dashboard</button>
      </div>
    );
  }

  // Mock results data for demonstration
  const mockResults = survey.questions?.map(question => ({
    question: question.text,
    responses: question.options?.map(option => ({
      option,
      count: Math.floor(Math.random() * 20) + 1,
      percentage: Math.floor(Math.random() * 40) + 20
    })) || []
  })) || [];

  const totalResponses = survey.responses || Math.floor(Math.random() * 50) + 10;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1>{survey.title} - Results</h1>
          <p style={styles.subtitle}>Total Responses: {totalResponses}</p>
        </div>
        <button onClick={onBack} style={styles.backButton}>← Back</button>
      </div>

      <div style={styles.summary}>
        <h2>Survey Summary</h2>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryItem}>
            <strong>Survey ID:</strong> {survey._id?.substring(0, 8) || survey.id}
          </div>
          <div style={styles.summaryItem}>
            <strong>Questions:</strong> {survey.questions?.length || 0}
          </div>
          <div style={styles.summaryItem}>
            <strong>Total Responses:</strong> {totalResponses}
          </div>
          <div style={styles.summaryItem}>
            <strong>Status:</strong> Active
          </div>
        </div>
      </div>

      <div style={styles.results}>
        <h2>Question Results</h2>
        {mockResults.map((result, index) => (
          <div key={index} style={styles.resultCard}>
            <h3>Q{index + 1}: {result.question}</h3>
            <div style={styles.charts}>
              {result.responses.map((response, rIndex) => (
                <div key={rIndex} style={styles.barContainer}>
                  <div style={styles.barLabel}>
                    <span>{response.option}</span>
                    <span>{response.count} votes ({response.percentage}%)</span>
                  </div>
                  <div style={styles.barBackground}>
                    <div 
                      style={{
                        ...styles.barFill,
                        width: `${response.percentage}%`,
                        backgroundColor: `hsl(${rIndex * 60}, 70%, 50%)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.actions}>
        <button style={styles.exportButton}>📥 Export as CSV</button>
        <button style={styles.printButton}>🖨️ Print Results</button>
        <button onClick={onBack} style={styles.backButton}>Back to Dashboard</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  subtitle: {
    color: '#666',
    fontSize: '16px',
    marginTop: '5px'
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  summary: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginTop: '15px'
  },
  summaryItem: {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '6px'
  },
  results: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  resultCard: {
    marginBottom: '25px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  },
  charts: {
    marginTop: '15px'
  },
  barContainer: {
    marginBottom: '15px'
  },
  barLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    fontSize: '14px'
  },
  barBackground: {
    height: '25px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    transition: 'width 0.5s ease-in-out'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  exportButton: {
    backgroundColor: '#4cc9f0',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  printButton: {
    backgroundColor: '#7209b7',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  button: {
    backgroundColor: '#4361ee',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default SurveyResults;