import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  invoice_num: Number,
  name: String,
  mobile_number: Number,
  date: { type: Date, default: new Date() },
  cart: {
    product: [],
    rate: [],
    qty: [],
  },
  totalAmount: Number,
});

const InvoiceMessage = mongoose.model("InvoiceMessage", postSchema);

export default InvoiceMessage;
