import mongoose from "mongoose";

const orderconfirmationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cartitems: {
    type: Object,
    required:true
  },
  cartquantity: {
    type: Object,
    required: true
  },
  wishlist: {
    type: Object,
    default:""
  },
  total: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const Orders = mongoose.model("Order", orderconfirmationSchema);


