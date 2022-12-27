import mongoose, { Document, Schema } from "mongoose";

// function getValueForNextSequence(sequenceOfName) {
//   var sequenceDoc = db.sample.findAndModify({
//     query: { _id: sequenceOfName },
//     update: { $inc: { sequence_value: 1 } },
//     new: true,
//   });

//   return sequenceDoc.sequence_value;
// }

export interface ICounter {
  id_invoice: String;
  seq: Number;
}

export interface ICounterModel extends ICounter, Document {}

const counterSchema = new mongoose.Schema(
  {
    id_invoice: { type: String },
    seq: { type: Number },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ICounterModel>("counter", counterSchema);
