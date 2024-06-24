import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
import { useDispatch} from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice.js";
import { useState } from "react";
import TotalUserBalance from "../TotalUserBalance.jsx";
import { useData } from "../../hooks/useData.js";

function Deposit() {
  const { loading, error, data } = useData();
  const [transactionError, setTransactionError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(fetchStart());
      const link = "http://localhost:3000/api/transaction/deposit";
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
        dispatch(fetchFailure(data));
        setTransactionError(data);
        return;
      }
      dispatch(fetchSucces(data));
    } catch (error) {
      setTransactionError(error);
      dispatch(fetchFailure(error));
    }
  };

  console.log("rendering deposit");

  return (
    <>
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
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values);
          resetForm();
        }}
      >
        {(formik) => (
          <Form className="grid grid-cols-2 gap-20">
            <div>
              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="amount" className="my-2">
                  Amount to Deposit
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  className="px-4 py-1 outline-none text-right"
                />
                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="amount" />
                </div>
              </div>

              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="destinationAccount" className="my-2">
                  Destination Account
                </label>

                <Field
                  as="select"
                  id="destinationAccount"
                  name="destinationAccount"
                  className="px-4 py-1 outline-none text-right"
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

                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="destinationAccount" />
                </div>
              </div>

              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="transactionDate" className="my-2">
                  Deposit Date
                </label>
                <Field
                  type="text"
                  id="transactionDate"
                  name="transactionDate"
                  className="px-4 py-1 outline-none text-right"
                  readOnly
                />
                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="transactionDate" />
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="description" className="my-2">
                  Description or Note
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full h-32 px-4 py-1 outline-none rounded-lg resize-none"
                />
                <ErrorMessage name="description" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Loading..." : "Deposit"}
              </button>
              <p className="text-red-500 text-right mt-4">
                {transactionError && transactionError.message}
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Deposit;
