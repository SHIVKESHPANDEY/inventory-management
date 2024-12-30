import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for the Inventory
const inventorySchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["low", "high"],
      default: "high",
      // This can be computed dynamically if needed, as shown later
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Define a pre-save hook to set the stock status based on the stock quantity
inventorySchema.pre("save", function (next) {
  if (this.stock <= 10) {
    this.stockStatus = "low";
  } else {
    this.stockStatus = "high";
  }
  next();
});

// Create the model from the schema
export const Inventory = mongoose.model("Inventory", inventorySchema);
