const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.name
        )}&background=random`;
      },
    },
    role: {
      type: String,
      enum: ['user', 'useradmin'],
      default: 'user',
      required: [true, 'Role is required'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
