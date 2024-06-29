import mongoose from "mongoose";
import transactionSchema from "./transaction.schema.js";
import bankAccountSchema from "./bankAccount.schema.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [5, "Username must be at least 5 characters long"],
      maxlength: [30, "Username cannot be longer than 30 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    banking: {
      transactions: [transactionSchema],
      bankAccounts: [bankAccountSchema],
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('validate', function (next) {
  if (this.role === 'admin') {
    // Remove the banking property if the role is admin
    this.banking = undefined;
  } else if (this.role === 'user') {
    // Validate required fields for user
    if (!this.phone || this.phone.trim().length === 0) {
      return next(new Error('Phone number is required for regular users'));
    }
    if (!this.address || this.address.trim().length === 0) {
      return next(new Error('Address is required for regular users'));
    }
    // Validate bankAccountNumber format
    if (this.banking.bankAccounts.some(account => !account.bankAccountNumber || !/^\d{2}-\d{4}-\d{15}$/.test(account.bankAccountNumber))) {
      return next(new Error('Valid bank account number is required for regular users'));
    }
  }
  next();
});

userSchema.pre('save', function (next) {
  if (this.role === 'admin') {
    // Ensure banking is not saved for admin
    this.banking = undefined;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
