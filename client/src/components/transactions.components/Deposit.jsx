import { Formik, Form } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import { useDispatch } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import { useState } from "react";
import TotalUserBalance from "../TotalUserBalance.jsx";
import { useData } from "../../hooks/useData.js";
import Alert from "../Alert.jsx";
import FormField from "./FormField.jsx";
import validationSchema from "../../validation/validationSchema.js";

const schema = validationSchema.pick([
  "amount",
  "destinationAccount",
  "transactionDate",
  "transactionTime",
  "description",
]);

function Deposit() {
  const { data } = useData();
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values, setSubmitting) => {
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
      const data = await response.json();
      setSubmitting(false);
      if (!response.ok) {
        setError(data?.message || "An error occured. Please try again later.");
        setShowAlert(true);
        return;
      }
      setShowAlert(true);
      dispatch(fetchSucces(data));
    } catch (error) {
      setSubmitting(false);
      setError("An error occured. Please try again later.");
      setShowAlert(true);
    }
  };

  console.log("rendering deposit");

  return (
    <div className="relative">
      <h2 className="text-3xl text-center font-bold mb-10">Deposit</h2>
      <TotalUserBalance data={data} />
      <Formik
        initialValues={{
          amount: "",
          destinationAccount: "",
          transactionDate: getCurrentDateTime().onlyDate,
          transactionTime: getCurrentDateTime().timeOnly,
          description: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
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
                type="number"
                name="amount"
                label="Amount to Deposit:"
                textRight
              />

              <FormField
                formik={formik}
                as="select"
                name="destinationAccount"
                label="Destination Account:"
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
                type="text"
                name="transactionDate"
                label="Deposit Date:"
                textRight
                readOnly
              />

              <FormField
                formik={formik}
                type="text"
                name="description"
                label="Description or Note:"
              />

            </div>

            <div className="flex justify-center mt-12">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Loading..." : "Complete deposit"}
              </button>
            </div>

            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Deposit successful" : error}
                close={
                  error === null
                    ? () => {
                        setShowAlert(false);
                        setError(null);
                        formik.resetForm();
                      }
                    : () => setShowAlert(false)
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
