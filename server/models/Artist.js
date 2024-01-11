const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistID: { 
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
    required: true 
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

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
