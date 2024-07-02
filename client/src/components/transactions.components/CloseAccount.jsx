import { useUser } from "../../hooks/useUser.js";
import { useData } from "../../hooks/useData.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import AccountsField from "../AccountsField.jsx";
import Alert from "../Alert.jsx";

function CloseAccount() {
  const [error, setError] = useState(null);
  const { currentUser } = useUser();
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      setError(null);
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
      if (!response.ok) {
        const error = await response.json();
        setError(error?.message || "An error occured. Please try again later.");
        setShowAlert(true);
        return;
      }
      const data = await response.json();
      dispatch(fetchSucces(data));
      setShowAlert(true);
    } catch (error) {
      setError("An error occured. Please try again later.");
      setShowAlert(true);
      console.log(error);
    }
  };

  return (
    <div  className="relative">
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
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form >
            <div  className={`flex items-center justify-center gap-x-10 flex-wrap max-h-[450px] ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}>
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
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary mt-6"
              >
                {formik.isSubmitting ? "Loading..." : "Close Bank Account"}
              </button>
            </div>
            <div className="h-6 text-red-500 text-right">
              {error}
            </div>
            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Account closed successfully!" : error}
                close={
                  error === null
                    ? () => {
                        setShowAlert(false);
                        setError(null);
                        formik.resetForm();
                      }
                    : () => {
                        setShowAlert(false);
                        setError(null);
                        formik.setSubmitting(false);
                      }
                }
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CloseAccount;
