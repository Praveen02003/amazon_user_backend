import mongoose from "mongoose";

const keyboardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  multipleimage: {
    type: [String],
    default: []
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  offer: {
    type: Number, 
    default: 0
  },
  defaultprice: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

export const Keyboards = mongoose.model("Keyboard", keyboardSchema);


