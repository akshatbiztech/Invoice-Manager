import mongoose, { Document, Schema } from "mongoose";

//counter table
// const counterSchema = new mongoose.Schema({
//   id: { type: String },
//   seq: { type: Number },
// });

//export const counterModel = mongoose.model("counter", counterSchema);

export interface IInvoice {
  invoice_num: Number;
  customer_name: String;
  mobile_number: Number;
  date: String;
  cart: {
    product: [];
    rate: [];
    qty: [];
  };
  totalAmount: Number;
  if_paid: Boolean;
}

export interface IInvoiceModel extends IInvoice, Document {}

const InvoiceSchema = new mongoose.Schema(
  {
    invoice_num: { type: Number, required: true },
    customer_name: { type: String, required: true },
    mobile_number: { type: Number, required: true },
    date: { type: Date, default: new Date(), required: true }, //{ type: String, required: true }
    cart: {
      product: { type: Array, required: true },
      rate: { type: Array, required: true },
      qty: { type: Array, required: true },
    },
    totalAmount: { type: Number, required: true },
    if_paid: { type: Boolean, required: true, default: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IInvoiceModel>("Invoice", InvoiceSchema);
