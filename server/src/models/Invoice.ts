import mongoose, { Document, Schema } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import { config } from "../config/config";

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
    invoice_num: { type: Number, unique: true },
    customer_name: { type: String, required: true, trim: true },
    mobile_number: { type: Number, required: true },
    date: { type: Date, default: new Date(), required: true }, //{ type: String, required: true }
    cart: {
      product: { type: Array, required: true, unique: true },
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

const connection = mongoose.createConnection(config.mongo.url);
autoIncrement.initialize(connection);

InvoiceSchema.plugin(autoIncrement.plugin, {
  model: "Invoice",
  field: "invoice_num",
  startAt: 1,
});

export default mongoose.model<IInvoiceModel>("Invoice", InvoiceSchema);
