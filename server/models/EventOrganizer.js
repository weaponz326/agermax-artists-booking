const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  organizerID: { 
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
  companyName: { 
    type: String 
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
  organizationNumber: { 
    type: String 
  },
  eventsHosted: { 
    type: [String] 
  },
});

const organizer = mongoose.model('organizer', organizerSchema);

module.exports = organizer;
