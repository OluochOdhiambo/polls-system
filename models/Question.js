const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionnaireRef: { type: String, required: true },
    name: { type: String },
    question: { type: String, required: true },
    questionType: { type: String, required: true },
    responses: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
