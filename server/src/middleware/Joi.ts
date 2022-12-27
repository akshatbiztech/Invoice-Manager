import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IInvoice } from "../models/Invoice";
import logger from "../library/logger";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  invoice: {
    create: Joi.object<IInvoice>({
      invoice_num: Joi.number(),
      customer_name: Joi.string().required(),
      mobile_number: Joi.number().required().min(6000000000).max(9999999999),
      date: Joi.date().max("now"),
      cart: Joi.object({
        product: Joi.array().items(Joi.string().required()),
        rate: Joi.array().items(Joi.number().required()),
        qty: Joi.array().items(Joi.number().required()),
      }),
      totalAmount: Joi.number().required(),
      if_paid: Joi.boolean().required(),
    }),
    update: Joi.object<IInvoice>({
      invoice_num: Joi.number(),
      customer_name: Joi.string().required(),
      mobile_number: Joi.number().required().min(6000000000).max(9999999999),
      date: Joi.date().max("now"),
      cart: Joi.object({
        product: Joi.array().items(
          Joi.string().valid("not allowed").forbidden().required(),
          Joi.string()
        ),
        rate: Joi.array().items(
          Joi.number().valid("not allowed").forbidden().required(),
          Joi.number()
        ),
        qty: Joi.array().items(
          Joi.number().valid("not allowed").forbidden().required(),
          Joi.number()
        ),
      }),
      totalAmount: Joi.number().required(),
      if_paid: Joi.boolean().required(),
    }),
  },
};
