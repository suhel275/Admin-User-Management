const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('admin', AdminSchema);

const administrator = async AdminModel => {
  let checkAdmin = await AdminModel.findOne({
    email: 'suhelkhan275@gmail.com'
  });
  if (!checkAdmin) {
    const admin = new AdminModel({
      name: 'Suhel',
      email: 'suhelkhan275@gmail.com',
      password: 'suhel123'
    });
    await admin.save();
  }
};

administrator(Admin);

module.exports = Admin;
