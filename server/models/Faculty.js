const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    qualification: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);