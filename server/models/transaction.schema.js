import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transactionId: {
    type: String,
  },
  type: {
    type: String,
    require: true,
    enum: ["deposit", "withdrawal"],
  },
  amount: {
    type: Number,
    required: true,
  },
  destinationAccount: {
    type: String,
  },
  originAccount: {
    type: String,
  },
  transactionDate: {
    type: String,
    require: true,
  },
  transactionTime: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    max: 20,
  },
});

export default transactionSchema;
