import React from 'react';

function ViewSurvey({ survey, onBack }) {
  if (!survey) {
    return (
      <div style={styles.container}>
        <h2>No survey selected</h2>
        <button onClick={onBack} style={styles.button}>Back to Dashboard</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/surveys/${survey._id}/response`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('✅ Response submitted!');
      }
    } catch (error) {
      console.log('Could not submit response');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>{survey.title}</h1>
        <button onClick={onBack} style={styles.backButton}>← Back</button>
      </div>

      <div style={styles.info}>
        <p><strong>ID:</strong> {survey._id || survey.id}</p>
        <p><strong>Total Responses:</strong> {survey.responses || 0}</p>
        <p><strong>Questions:</strong> {survey.questions?.length || 0}</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Survey Questions</h2>
        
        {survey.questions?.map((question, qIndex) => (
          <div key={qIndex} style={styles.questionCard}>
            <h3>Q{qIndex + 1}: {question.text}</h3>
            <div style={styles.options}>
              {question.options?.map((option, oIndex) => (
                <div key={oIndex} style={styles.option}>
                  <input 
                    type="radio" 
                    name={`question_${qIndex}`} 
                    id={`q${qIndex}_o${oIndex}`}
                  />
                  <label htmlFor={`q${qIndex}_o${oIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={styles.formActions}>
          <button type="submit" style={styles.submitButton}>
            Submit Response
          </button>
          <button type="button" onClick={onBack} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>

      <button onClick={onBack} style={styles.button}>Back to Dashboard</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  info: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  form: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  questionCard: {
    marginBottom: '25px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  },
  options: {
    marginTop: '10px'
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  submitButton: {
    backgroundColor: '#4361ee',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#4cc9f0',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default ViewSurvey;