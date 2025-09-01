const mongoose = require('mongoose');

const landingPageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide landing page name'],
    trim: true,
    unique: true
  },
  url: {
    type: String,
    required: [true, 'Please provide landing page URL'],
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
landingPageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LandingPage', landingPageSchema); 