import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";

const createInvoice = (req: Request, res: Response, next: NextFunction) => {
  const {
    invoice_num,
    customer_name,
    mobile_number,
    date,
    cart,
    totalAmount,
    if_paid,
  } = req.body;

  const invoice = new Invoice({
    _id: new mongoose.Types.ObjectId(),
    invoice_num, //:sequence(),
    customer_name,
    mobile_number,
    date,
    cart,
    totalAmount,
    if_paid,
  });

  return invoice
    .save()
    .then((invoice) => {
      res.status(201).json({ invoice });
      logger.info("Invoice Succesfully Added to the Database!");
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error("Invoice could not be added to the Database!");
    });
};

export default { createInvoice };
