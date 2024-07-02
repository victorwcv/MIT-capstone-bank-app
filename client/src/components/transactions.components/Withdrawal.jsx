import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import { useState } from "react";
import TotalUserBalance from "../TotalUserBalance.jsx";
import Alert from "../Alert.jsx";
import FormField from "../FormField.jsx";
import validationSchema from "../../validation/validationSchema.js";

const schema = validationSchema.pick([
  "amount",
  "originAccount",
  "transactionDate",
  "transactionTime",
  "description",
]);

function Withdrawal() {
  const { data } = useSelector((state) => state.userData);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/withdrawal`;
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
    }
  };

  return (
    <div className="relative">
      <h2 className="text-3xl text-center font-bold mb-10">Withdrawal</h2>
      <TotalUserBalance data={data} />
      <Formik
        initialValues={{
          amount: "",
          originAccount: "",
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
              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type="number"
                name="amount"
                label="Amount to Withdraw:"
                textRight
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                as="select"
                name="originAccount"
                label="Origin Account:"
                children={
                  <>
                    <option value="">Select an Account</option>
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
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Loading..." : "Complete Withdrawal"}
              </button>
            </div>
            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Successful withdrawal!" : error}
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

export default Withdrawal;
