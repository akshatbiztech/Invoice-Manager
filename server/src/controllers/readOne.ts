import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";

//Read specific Invoice
const readInvoice = (req: Request, res: Response, next: NextFunction) => {
  const invoiceId = req.params.invoiceId;

  return Invoice.findById(invoiceId)
    .then((invoice) => {
      if (invoice) {
        res.status(200).json({ invoice });
        logger.info(`Getting Invoice id - ${invoiceId}!`);
      } else {
        res.status(404).json({ message: "NotFound" });
        logger.error(`Invoice id - ${invoiceId} Not Found`);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error(error);
    });
};

export default {readInvoice};
