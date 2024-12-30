import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      min: [0, "Total price cannot be negative"],
    },
    orderStatus: {
      type: String,
      enum: ["pending", "accepted", "delivered", "returned"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Define a pre-save hook to calculate the total price
orderSchema.pre("save", function (next) {
  if (this.products && this.products.length > 0) {
    this.totalPrice = this.products.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  } else {
    this.totalPrice = 0;
  }

  console.log("Pre-save hook: totalPrice set to", this.totalPrice);
  next();
});

// Create the model from the schema
export const Order = mongoose.model("Order", orderSchema);
