const mongoose = require('mongoose');

// Define the schema for team members
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  }
}, {
  // Add timestamps for when the document was created and last updated
  timestamps: true
});

// Create and export the Member model
const Member = mongoose.model('Member', memberSchema);
module.exports = Member;