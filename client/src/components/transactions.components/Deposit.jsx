import { Formik, Form } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import { useDispatch } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import { useState } from "react";
import TotalUserBalance from "../TotalUserBalance.jsx";
import { useData } from "../../hooks/useData.js";
import Alert from "../Alert.jsx";
import FormField from "../FormField.jsx";
import validationSchema from "../../validation/validationSchema.js";

const schema = validationSchema.pick([
  "amount",
  "destinationAccount",
  "transactionDate",
  "transactionTime",
  "description",
]);

/**
 * Deposit component for depositing funds into a bank account
 * @returns {JSX.Element} Deposit component
 */
function Deposit() {
  const { data } = useData();
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  /**
   * Handles form submission for deposit
   * @param {Object} values - form values
   */
  const handleSubmit = async (values) => {
    try {
      setError(null);
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/deposit`;
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
      setShowAlert(true);
      dispatch(fetchSucces(data));
    } catch (error) {
      setError("An error occured. Please try again later.");
      setShowAlert(true);
    }
  };

  // Render Deposit component
  return (
    <div className="relative">
      <h2 className="text-3xl text-center font-bold mb-10">Deposit</h2>
      {/* Render total user balance */}
      <TotalUserBalance data={data} />
      {/* Render formik form for deposit */}
      <Formik
        initialValues={{
          amount: "",
          destinationAccount: "",
          transactionDate: getCurrentDateTime().onlyDate,
          transactionTime: getCurrentDateTime().timeOnly,
          description: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form>
            <div
              className={`flex items-center justify-center gap-x-10 flex-wrap max-h-[450px] ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              {/* Render form fields for deposit */}
              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type="number"
                name="amount"
                label="Amount to Deposit:"
                textRight
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                as="select"
                name="destinationAccount"
                label="Destination Account:"
                children={
                  <>
                    <option value="">Select an Account</option>
                    {/* Render options for destination account */}
                    {data.bankAccounts?.map((acc, index) => {
                      return (
                        <option key={index} value={acc.bankAccountNumber}>
                          {`$ ${acc.accountBalance} / ${acc.bankAccountNumber}`}
                        </option>
                      );
                    })}
                  </>
                }
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type="text"
                name="transactionDate"
                label="Deposit Date:"
                textRight
                readOnly
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type="text"
                name="description"
                label="Description or Note:"
              />
            </div>

            <div className="flex justify-center mt-8">
              {/* Render submit button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Loading..." : "Complete deposit"}
              </button>
            </div>

            {/* Render alert if showAlert is true */}
            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Successful deposit!" : error}
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

export default Deposit;
