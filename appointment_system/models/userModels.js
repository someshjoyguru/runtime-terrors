const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  healthcareRecords: {
    type: Array,
    default: [],
    validate: {
      validator: function(records) {
        return records.every(record => 
          typeof record === 'string' && 
          (record.endsWith('.pdf') || record.endsWith('.jpg') || record.endsWith('.png'))
        );
      },
      message: 'Each record must be a string ending with .pdf, .jpg, or .png',
    },
  },

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;