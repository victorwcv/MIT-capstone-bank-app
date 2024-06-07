import mongoose from "mongoose";
import transactionSchema from "./transaction.schema.js";

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
      validate: [
        {
          validator: function (v) {
            if (this.role === "user" && (!v || v.trim().length === 0)) {
              return false;
            }
            return true;
          },
          message: (props) => "Phone number is required",
        },
        {
          validator: function (v) {
            if (this.role === 'user') {
              const phoneRegex = /^[0-9]{8,11}$/;
              return phoneRegex.test(v);
            }
            return true;
          },
          message: (props) => 'Phone number is 8 to 11 digits'
        }
      ],
    },
    address: {
      type: String,
      validate: {
        validator: function (v) {
          if (this.role === 'user' && (!v || v.trim().length === 0)) {
            return false;
          }
          return true;
        },
        message: props => 'Address is required'
      }
    },
    banking: {
      transactions: [transactionSchema],
      balance: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
