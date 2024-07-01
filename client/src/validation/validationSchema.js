import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(20, "Username cannot be longer than 15 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Required")
    .max(20, "Must be 20 characters or less"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  adress: Yup.string()
    .required("Adress is required")
    .min(5, "Adress must be at least 5 characters long")
    .max(20, "Adress cannot be longer than 15 characters"),
  phone: Yup.string()
    .required("Required")
    .max(20, "Must be 11 characters or less"),
  amount: Yup.number()
    .required("Enter the amount")
    .positive("Enter a positive amount"),
  destinationAccount: Yup.string().required("Choose an account"),
  transactionDate: Yup.string(),
  transactionTime: Yup.string(),
  description: Yup.string(),
});

export default validationSchema;