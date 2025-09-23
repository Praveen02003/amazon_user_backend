import mongoose from "mongoose";

const orderconfirmationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cartitems: {
    type: String,
    required:true
  },
  cartquantity: {
    type: String,
    required: true
  },
  wishlist: {
    type: String,
    default:""
  },
  total: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const Orders = mongoose.model("Order", orderconfirmationSchema);


