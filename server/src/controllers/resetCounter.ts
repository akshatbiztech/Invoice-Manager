import { NextFunction, Request, Response } from "express";
import mongoose, { DocTypeFromGeneric } from "mongoose";
import { config } from "../config/config";
import logger from "../library/logger";
import Invoice, { IInvoiceModel } from "../models/Invoice";
import nextCount, { resetCount } from "mongoose-auto-increment";

//reset counter
function resetCounter() {
  const connection = mongoose.createConnection(config.mongo.url);
  const Model = connection.model("Invoice", Invoice.schema);
  var model = new Model();
  //   model.save(function(err){
  //     model.nextCount(function(err,count){
  //         model.resetCount(function(err,nextCount){

  //         })
  //     })
  //   })
  return 0;
}
