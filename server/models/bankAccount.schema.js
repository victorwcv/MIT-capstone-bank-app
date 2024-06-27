import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bankAccountSchema = new Schema(
  {
    bankAccountNumber: {
      type: String,
      trim: true,
      match: [/^\d{2}-\d{4}-\d{15}$/, "Invalid Format"],
    },
    accountBalance: {
      type: Number,
      default: 0,
      min: [0, "Account balance cannot be negative"],
    },
  },
  { _id: false, timestamps: true }
);

export default bankAccountSchema;
