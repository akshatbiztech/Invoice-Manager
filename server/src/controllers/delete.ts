import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";

//Deleting Invoice
const deleteInvoice = (req: Request, res: Response, next: NextFunction) => {
  const invoiceId = req.params.invoiceId;

  return Invoice.findByIdAndDelete(invoiceId)
    .then((invoice) => {
      if (invoice) {
        res.status(201).json({ invoice, message: "Deleted" });
        logger.warn(`Invoice with id - ${invoiceId} Successfully Deleted!`);
      } else {
        res.status(404).json({ message: "not found" });
        logger.error(`Invoice with id - ${invoiceId} not found`);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error(error);
    });
};

export default { deleteInvoice };
