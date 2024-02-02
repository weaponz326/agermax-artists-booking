const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const artistSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  nickName: { 
    type: String 
  },
  genre: { 
    type: String 
  },
  bio: { 
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
  profilePhoto: { 
    type: String,
  },
  organizationNumber: { 
    type: String 
  },
  socialMediaLinks: { 
    type: [String] 
  },
  availableDates: { 
    type: [Date] 
  },
  gallery: { 
    type: [String] 
  },
});

artistSchema.plugin(AutoIncrement, {inc_field: 'artistID'});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
