import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import logger from "../library/logger";
import Invoice from "../models/Invoice";
// import { counterModel } from "../models/Invoice";

//Create a new Invoice
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

// function sequence() {
//   let num: number | undefined;
//   counterModel.findOneAndUpdate(
//     { id: "autoval" },
//     { $inc: { seq: 1 } },
//     { new: true },
//     (err, cd) => {
//       if (cd == null) {
//         const newval = new counterModel({ id: "autoval", seq: 1 });
//         newval.save();
//         num = 1;
//       } else {
//         num = cd.seq;
//       }
//     }
//   );
//   return num;
// }

export default {
  createInvoice,
  readInvoice,
  readAllInvoice,
  updateInvoice,
  deleteInvoice,
};
