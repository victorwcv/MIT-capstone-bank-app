import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transactionId: {
    type: String,
  },
  type: {
    type: String,
    require: true,
    enum: ["deposit", "withdrawal", "transfer"],
  },
  amount: {
    type: Number,
    required: true,
  },
  destinationAccount: {
    type: String,
    default:"-",
  },
  originAccount: {
    type: String,
    default: "-",
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
