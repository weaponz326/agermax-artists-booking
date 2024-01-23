const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const organizerSchema = new mongoose.Schema({
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
    // required: true 
  },
  address: { 
    type: String,
    // required: true 
  },
  organizationNumber: { 
    type: String 
  },
  eventsHosted: { 
    type: [String] 
  },
});

organizerSchema.plugin(AutoIncrement, {inc_field: 'organizerID'});

const EventOrganizer = mongoose.model('EventOrganizer', organizerSchema);

module.exports = EventOrganizer;
