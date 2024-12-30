import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the User
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  totalOrdersByUser: {
    type: Number,
    default: 0,
    min: [0, 'Total orders cannot be negative'],
  },
  totalReturnedByUser: {
    type: Number,
    default: 0,
    min: [0, 'Total returns cannot be negative'],
  },
  address: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  userCategory: {
    type: String,
    enum: ['regular', 'gold', 'iron'],
    default: 'regular',
  },
}, {
  timestamps: true,
});

// Define a method to update user category based on orders and returns
userSchema.methods.updateUserCategory = function () {
  if (this.totalOrdersByUser > 50) { // Example threshold for 'gold'
    this.userCategory = 'gold';
  } else if (this.totalReturnedByUser > 20) { // Example threshold for 'iron'
    this.userCategory = 'iron';
  } else {
    this.userCategory = 'regular';
  }
};

// Define a pre-save hook to update the user category before saving
userSchema.pre('save', function (next) {
  this.updateUserCategory();
  next();
});

// Create the model from the schema
export const User = mongoose.model('User', userSchema);


