import express from "express";
//import controller from "../controllers/Invoice";
import createNew from "../controllers/create";
import readOne from "../controllers/readOne";
import readAll from "../controllers/readAll";
import update from "../controllers/update";
import deleteInvoice from "../controllers/delete";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(Schemas.invoice.create),
  createNew.createInvoice
);
router.get("/get/:invoiceId", readOne.readInvoice);
router.get("/get/", readAll.readAllInvoice);
router.patch(
  "/update/:invoiceId",
  ValidateJoi(Schemas.invoice.update),
  update.updateInvoice
);
router.delete("/delete/:invoiceId", deleteInvoice.deleteInvoice);

export = router;
