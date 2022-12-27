import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";

//Reading All Ivoices
const readAllInvoice = (req: Request, res: Response, next: NextFunction) => {
  return Invoice.find()
    .then((invoices) => {
      res.status(200).json({ invoices });
      logger.info("Getting All Invoices!");
    })
    .catch((error) => {
      res.status(500).json({ error });
      logger.error(error);
    });
};

export default {readAllInvoice};