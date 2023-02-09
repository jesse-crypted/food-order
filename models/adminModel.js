const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'An admin must have a name'],
  },
  phoneNumber: {
    type: Number,
    require: [true, 'An admin must have a name'],
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
