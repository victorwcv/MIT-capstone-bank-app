import { useUser } from "../../hooks/useUser.js";
import { useData } from "../../hooks/useData.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice.js";
import AccountsField from "../AccountsField.jsx";

function CloseAccount() {
  const [opError, setOpError] = useState(null);
  const { currentUser } = useUser();
  const { loading } = useData();
  const dispatch = useDispatch();
  const handleSubmit = async (values, reset) => {
    try {
      // dispatch(fetchStart());
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/close-account`;
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      };
      const response = await fetch(link, options);
      const data = await response.json();
      if (data.success === false) {
        // dispatch(fetchFailure(data));
        setOpError(data);
        return;
      }
      setOpError(null);
      dispatch(fetchSucces(data));
      reset();
    } catch (error) {
      setOpError("Something went wrong");
      // dispatch(fetchFailure(error));
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">
        Close Bank Account
      </h2>
      <p className="text-lg ml-6">
        Dear: <span className="font-semibold">{currentUser?.username}</span>
      </p>
      <br />
      <p className="text-lg text-center">
        Closing a bank account requires ensuring the account balance is zero.
        This involves transferring any remaining funds, canceling automatic
        payments, and confirming no pending transactions. Only then can you
        proceed with the account closure. It's important to follow these steps
        to avoid any complications or fees.
      </p>
      <Formik
        initialValues={{
          bankAccountNumber: "",
          agreeTerms: false,
          balanceZero: false,
        }}
        validationSchema={Yup.object({
          agreeTerms: Yup.boolean()
            .oneOf([true], "You must agree")
            .required("You must agree"),
          balanceZero: Yup.boolean()
            .oneOf([true], "Confirm that your balance is zero")
            .required("Confirm that your balance is zero"),
          bankAccountNumber: Yup.string().required("Select an account"),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <Form>
            <div className="relative flex flex-wrap justify-center items-center p-6 w-full gap-6 min-w-80">
              <label htmlFor="agreeTerms">Account Number to be closed:</label>
              <AccountsField
                name="bankAccountNumber"
                formik={formik}
                balance={false}
              />
              <ErrorMessage
                name="bankAccountNumber"
                component="div"
                className="absolute bottom-0 right-10 text-red-500"
              />
            </div>
            <div className="flex items-center justify-center gap-x-10  flex-wrap max-h-[450px]">
              <div className="relative flex gap-6 pb-6 w-5/12 min-w-80">
                <Field type="checkbox" name="balanceZero" id="balanceZero" />
                <label htmlFor="balanceZero">
                  {" "}
                  I confirm that my account balance is zero.
                </label>
                <ErrorMessage
                  name="balanceZero"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex gap-6 pb-6 w-5/12 min-w-80">
                <Field type="checkbox" name="agreeTerms" id="agreeTerms" />
                <label htmlFor="agreeTerms">
                  {" "}
                  I agree to close this account permanently.
                </label>
                <ErrorMessage
                  name="agreeTerms"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-6"
              >
                {loading ? "Loading..." : "Close Bank Account"}
              </button>
            </div>
            <div className="h-6 text-red-500 text-right">
              {opError && opError.message}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CloseAccount;
