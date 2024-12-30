import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the Category
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
}, {
  timestamps: true,
});

// Create the model from the schema
export const Category = mongoose.model('Category', categorySchema);


