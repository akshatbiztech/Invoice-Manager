import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";

//Updating Invoice
const updateInvoice = (req: Request, res: Response, next: NextFunction) => {
  const invoiceId = req.params.invoiceId;

  return Invoice.findById(invoiceId)
    .then((invoice) => {
      if (invoice) {
        invoice.set(req.body);
        return invoice
          .save()
          .then((invoice) => {
            res.status(201).json({ invoice });
            logger.warn(`Updated Invoice with id - ${invoiceId}!`);
          })
          .catch((error) => {
            res.status(500).json({ error });
            logger.error(error);
          });
      } else {
        res.status(404).json({ message: "NotFound" });
        logger.error(`Could not Update Invoice with id - ${invoiceId}!`);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error(error);
    });
};

export default { updateInvoice };
