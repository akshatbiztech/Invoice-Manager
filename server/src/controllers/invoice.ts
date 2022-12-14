import express from "express";
import logger from "../library/logger";
import InvoiceMessage from "../models/invoiceContent";

export const getInvoice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getInvoices = await InvoiceMessage.find();
    logger.info("Finding Invoices");
    logger.info(getInvoices);
    res.status(200).json(getInvoices);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
    logger.error(error);
  }
};

export const createInvoice = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("Invoice creation");
  const invoice = req.body;
  const newInvoice = new InvoiceMessage(invoice);
  try {
    await newInvoice.save();
    res.status(201).json(newInvoice);
    logger.info("New Invoice Created");
    logger.info(newInvoice);
  } catch (error) {
    res.status(409).json({ message: (error as Error).message });
    logger.error(error);
  }
};
