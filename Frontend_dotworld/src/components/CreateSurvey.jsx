import React, { useState } from 'react';

function CreateSurvey({ user, onBack }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['Option 1', 'Option 2']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addQuestion = () => {
    if (questionText.trim()) {
      const newQuestion = {
        text: questionText,
        options: [...options]
      };
      setQuestions([...questions, newQuestion]);
      setQuestionText('');
      setOptions(['Option 1', 'Option 2']);
      setError('');
    }
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const createSurvey = async () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (questions.length === 0) {
      setError('Please add at least one question');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          questions,
          createdBy: user?.id || 'user123'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Survey created successfully!');
        setTimeout(() => {
          onBack();
        }, 1000);
      } else {
        setError(data.message || 'Failed to create survey');
      }
    } catch (error) {
      setError('Cannot connect to server');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Create New Survey</h1>
        <button onClick={onBack} style={styles.backButton}>← Back</button>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <div style={styles.section}>
        <label>Survey Title:</label>
        <input
          type="text"
          placeholder="Enter survey title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <label>Add Question:</label>
        <input
          type="text"
          placeholder="Enter question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={styles.input}
        />
        
        <div style={styles.optionsSection}>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              style={styles.optionInput}
            />
          ))}
          <button onClick={addOption} style={styles.smallButton}>
            + Add Option
          </button>
        </div>

        <button 
          onClick={addQuestion} 
          style={styles.addButton}
          disabled={!questionText.trim()}
        >
          Add Question to Survey
        </button>
      </div>

      {questions.length > 0 && (
        <div style={styles.section}>
          <h3>Questions ({questions.length})</h3>
          {questions.map((q, index) => (
            <div key={index} style={styles.questionCard}>
              <p><strong>Q{index + 1}:</strong> {q.text}</p>
              <p><strong>Options:</strong> {q.options.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.actions}>
        <button onClick={onBack} style={styles.cancelButton}>
          Cancel
        </button>
        <button 
          onClick={createSurvey} 
          style={styles.createButton}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Survey'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto'
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
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  optionsSection: {
    margin: '15px 0'
  },
  optionInput: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  smallButton: {
    backgroundColor: '#17a2b8',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '10px',
    borderLeft: '4px solid #007bff'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  createButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default CreateSurvey;