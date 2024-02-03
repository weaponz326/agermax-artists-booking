const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "artist", "organizer"],
  },
  profilePhoto: {
    type: String
  },
  contactPhone: { 
    type: String,
    // required: true 
  },
  address: { 
    type: String,
    // required: true 
  },
  nickName: { 
    type: String 
  },
  genre: { 
    type: [String] 
  },
  bio: { 
    type: String 
  },
  organizationNumber: { 
    type: String 
  },
  eventsHosted: { 
    type: [String] 
  },
  socialMediaLinks: { 
    type: [String] 
  },
  availableDates: { 
    type: [Date] 
  },
  gallery: { 
    type: [String] 
  },});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
