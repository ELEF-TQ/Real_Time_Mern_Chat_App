const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  picture: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1691252108~exp=1691252708~hmac=dec79b7a8d914f47b72d5bf64142696891a8abd7148c5c82e12c233bae29db83',
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10); // Use genSalt instead of getSalt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('USER', userSchema);

module.exports = User;
