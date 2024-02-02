const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const adminSchema = new mongoose.Schema({
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
    // required: true 
  },
  address: { 
    type: String,
    // required: true 
  },
  profilePhoto: { 
    type: String,
  },
  role: { 
    type: String,
    required: true 
  }
});

adminSchema.plugin(AutoIncrement, {inc_field: 'adminID'});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
