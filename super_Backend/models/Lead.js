const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },+9
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  landingPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LandingPage',
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'landing_page'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
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
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
leadSchema.index({ landingPage: 1, createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });

module.exports = mongoose.model('Lead', leadSchema); 