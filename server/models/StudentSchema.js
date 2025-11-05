const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch: {      // ✅ lowercase to match frontend
    type: String,
    required: true,
  },
  cgpa: {        // ✅ lowercase to match frontend
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);