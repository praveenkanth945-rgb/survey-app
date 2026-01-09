// In-memory storage for surveys
let surveys = [];

// Create new survey
export const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    
    if (!title || !questions) {
      return res.status(400).json({ 
        success: false,
        message: "Title and questions are required" 
      });
    }

    const newSurvey = {
      _id: Date.now().toString(),
      title,
      questions,
      responses: 0,
      createdAt: new Date().toISOString(),
      createdBy: req.body.createdBy || "user123"
    };

    surveys.push(newSurvey);

    res.status(201).json({
      success: true,
      message: "Survey created successfully",
      survey: newSurvey
    });

  } catch (error) {
    console.error("Error creating survey:", error);
    res.status(500).json({
      success: false,
      message: "Error creating survey"
    });
  }
};

// Get all surveys
export const getSurveys = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: surveys.length,
      surveys: surveys
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching surveys"
    });
  }
};

// Get single survey
export const getSurvey = async (req, res) => {
  try {
    const survey = surveys.find(s => s._id === req.params.id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found"
      });
    }

    res.status(200).json({
      success: true,
      survey
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching survey"
    });
  }
};

// Submit response
export const submitResponse = async (req, res) => {
  try {
    const survey = surveys.find(s => s._id === req.params.id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found"
      });
    }

    survey.responses += 1;

    res.status(200).json({
      success: true,
      message: "Response submitted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting response"
    });
  }
};