// backend/models/Survey.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String }]
});

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  questions: [questionSchema],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  responses: { type: Number, default: 0 }
}, { 
  timestamps: true 
});

export default mongoose.model("Survey", surveySchema);