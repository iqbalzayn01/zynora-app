const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      required: [true, 'Firebase UID is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 3,
      maxlength: 100,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: 3,
      maxlength: 200,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    phone_number: {
      type: String,
      require: [true, 'Phone Number is required'],
      unique: true,
      maxlength: 15,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },
    bio: {
      type: String,
      default: 'My Bio',
      maxlength: 400,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', userSchema);
