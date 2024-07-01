import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import { useState } from "react";
import TotalUserBalance from "../TotalUserBalance.jsx";
import { useData } from "../../hooks/useData.js";
import Alert from "../Alert.jsx";

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
        validationSchema={Yup.object({
          amount: Yup.number()
            .positive("Enter a positive amount")
            .required("Required"),
          destinationAccount: Yup.string().required("Required"),
          transactionDate: Yup.string(),
          transactionTime: Yup.string(),
          description: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formik) => (
          <Form>
            <div
              className={`flex items-center justify-center gap-x-10 flex-wrap max-h-[450px] ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <div className="relative flex flex-1 flex-col pb-6  min-w-80">
                <label htmlFor="amount">Amount to Deposit:</label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className={`${
                    formik.errors.amount && formik.touched.amount
                      ? "  border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>

              <div className="relative flex flex-1 flex-col pb-6 min-w-80">
                <label htmlFor="destinationAccount">Destination Account:</label>

                <Field
                  as="select"
                  id="destinationAccount"
                  name="destinationAccount"
                  className={`${
                    formik.errors.destinationAccount &&
                    formik.touched.destinationAccount
                      ? "  border-red-500"
                      : ""
                  }`}
                >
                  <option value="">Select an Account</option>
                  {data.bankAccounts?.map((acc, index) => {
                    return (
                      <option key={index} value={acc.bankAccountNumber}>
                        {`$ ${acc.accountBalance} / ${acc.bankAccountNumber}`}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="destinationAccount"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>

              <div className="relative flex flex-1 flex-col   min-w-80">
                <label htmlFor="transactionDate">Deposit Date:</label>
                <Field
                  type="text"
                  id="transactionDate"
                  name="transactionDate"
                  className="text-right"
                  readOnly
                />
                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="transactionDate" />
                </div>
              </div>
              <div className="relative flex flex-1 flex-col   min-w-80">
                <label htmlFor="description">Description or Note:</label>
                <Field type="text" id="description" name="description" />
                <ErrorMessage name="description" />
              </div>
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
