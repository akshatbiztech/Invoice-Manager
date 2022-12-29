import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import { config } from "../config/config";
import logger from "../library/logger";
import Invoice, { IInvoiceModel } from "../models/Invoice";

//Getting Last Invoice
const getCounter = async (req: Request, res: Response, next: NextFunction) => {
  const connection = mongoose.createConnection(config.mongo.url);
  const curr_invoice = connection.model("Invoice", Invoice.schema);
  const invoice = await curr_invoice.findOne().sort({ invoice_num: -1 });
  const num = invoice?.invoice_num;
  res.status(200).json({ number: num });
  return num;
};

export default { getCounter };
