import express from "express";
import { getInvoice, createInvoice } from "../controllers/invoice";
const router = express.Router();

router.get("/", getInvoice);
router.post("/", createInvoice);

export default router;
