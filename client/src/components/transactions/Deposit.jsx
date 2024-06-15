import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice.js";
import { useUserBalance } from "../../hooks/useUserBalance.js";
import { useState } from "react";

function Deposit() {
  const { loading, error, data } = useSelector((state) => state.userData);
  const [transactionError, setTransactionError] = useState(null);

  const userBalance = useUserBalance();

  console.log("rendering deposit");
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(fetchStart());
      const link = "http://localhost:3000/api/user/transactions/deposit";
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

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Deposit</h2>
      <div className="mb-6 font-medium flex justify-around text-xl border-b-2">
        <h3>Current balance:</h3>
        <p>$ {userBalance}</p>
      </div>
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
                disabled={formik.isSubmitting}
                className="mx-10 mt-10 py-4 rounded-lg text-white font-medium text-2xl bg-blue-500"
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
