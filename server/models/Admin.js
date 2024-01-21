const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  contactEmail: { 
    type: String, 
    required: true 
  },
  contactPhone: { 
    type: String,
    required: true 
  },
  address: { 
    type: String,
    required: true 
  },
  role: { 
    type: String,
    required: true 
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
