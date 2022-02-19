const mongoose = require("mongoose");

const RespondentSchema = new mongoose.Schema(
  {
    county: { type: String, required: true },
    subCounty: { type: String, required: true },
    ward: { type: String, required: true },
    subLocation: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    responses: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Respondent", RespondentSchema);
