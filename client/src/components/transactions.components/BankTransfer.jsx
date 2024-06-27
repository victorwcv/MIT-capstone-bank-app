import { Formik, Form, Field, ErrorMessage } from "formik";
import { useData } from "../../hooks/useData";
import * as Yup from "yup";
import getCurrentDateTime from "../../utils/dates";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TotalUserBalance from "../TotalUserBalance.jsx";

function BankTransfer() {
  const { data, loading } = useData();
  const dispatch = useDispatch();
  const [transactionError, setTransactionError] = useState(null);
  const [accountBalances, setAccountBalances] = useState({});

  useEffect(() => {
    const balances = {};
    data.bankAccounts?.forEach((acc) => {
      balances[acc.bankAccountNumber] = acc.accountBalance;
    });
    setAccountBalances(balances);
  }, [data]);

  console.log("Rendering Bank Transfer!");
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Bank transfer</h2>
      <TotalUserBalance data={data} />
      <div>
        <Formik
          initialValues={{
            originAccount: "",
            destinationAccount: "",
            typeAccount: "own",
            amount: "",
            transactionDate: getCurrentDateTime().onlyDate,
            transactionTime: getCurrentDateTime().timeOnly,
            description: "",
          }}
          validate={(values) => {
            const errors = {};
            const originAccountBalance =
              accountBalances[values.originAccount] || 0;
            if (
              values.originAccount === values.destinationAccount &&
              values.originAccount
            ) {
              errors.destinationAccount = "Cannot transfer to same account";
            }
            if (values.amount && values.amount > originAccountBalance) {
              errors.amount = `Insufficient funds`;
            }

            return errors;
          }}
          validationSchema={Yup.object({
            originAccount: Yup.string().required("Required"),
            destinationAccount: Yup.string().required("Required"),
            typeAccount: Yup.string().required("Required"),
            amount: Yup.number()
              .required("Required")
              .positive("Cannot be negative"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              dispatch(fetchStart());
              const link =
                "http://localhost:3000/api/transaction/bank-transfer";
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
              console.log(data);
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
          }}
        >
          {(formik) => (
            <Form>
              <div className="flex justify-around my-6 text-lg">
                <div className="flex gap-4">
                  <Field type="radio" name="typeAccount" id="own" value="own" />
                  <label htmlFor="own">To own Account</label>
                </div>
                <div className="flex gap-4">
                  <Field
                    type="radio"
                    name="typeAccount"
                    id="other"
                    value="other"
                  />
                  <label htmlFor="other">To other Account</label>
                </div>
              </div>
              <div className="flex  gap-12">
                <div className="flex flex-col gap-2 text-lg flex-1">
                  <label htmlFor="originAccount">Choose Origin Account</label>
                  <Field
                    as="select"
                    id="originAccount"
                    name="originAccount"
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

                  <div className="text-red-500 text-sm h-3 text-end">
                    <ErrorMessage name="originAccount" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-lg flex-1">
                  {formik.values.typeAccount === "own" ? (
                    <>
                      <label htmlFor="destinationAccount">
                        Choose Destination Account
                      </label>
                      <Field
                        as="select"
                        id="destinationAccount"
                        name="destinationAccount"
                        className="px-4 py-1 outline-none text-right"
                      >
                        <option>Select an Account</option>
                        {data.bankAccounts?.map((acc, index) => {
                          return (
                            <option key={index} value={acc.bankAccountNumber}>
                              {`$ ${acc.accountBalance} / ${acc.bankAccountNumber}`}
                            </option>
                          );
                        })}
                      </Field>
                    </>
                  ) : (
                    <>
                      <label htmlFor="destinationAccount">
                        Enter the destination account number
                      </label>
                      <Field
                        type="text"
                        id="destinationAccount"
                        name="destinationAccount"
                        className="px-4 py-1 outline-none text-right"
                      />
                    </>
                  )}
                  <div className="text-red-500  text-sm h-3 text-end">
                    <ErrorMessage name="destinationAccount" />
                  </div>
                </div>
              </div>
              <div className="flex gap-12">
                <div className="flex flex-col  text-lg flex-1">
                  <label htmlFor="amount" className="my-2">
                    Transfer Amount
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    className="px-4 py-1 outline-none text-right"
                  />
                  <div className="text-red-500 text-sm h-3">
                    <ErrorMessage name="amount" />
                  </div>
                </div>
                <div className="flex flex-col text-lg flex-1">
                  <label htmlFor="transactionDate" className="my-2">
                    Transfer Date
                  </label>
                  <Field
                    type="text"
                    id="transactionDate"
                    name="transactionDate"
                    className="px-4 py-1 outline-none text-right"
                    readOnly
                  />
                  <div className="text-red-500 text-sm h-3 text-end">
                    <ErrorMessage name="transactionDate" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-lg">
                <label htmlFor="description" className="my-2">
                  Description or Note
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full h-20 px-4 py-1 outline-none rounded-lg resize-none"
                />
                <div className="text-red-500 text-sm h-3 text-end">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  Complete Transfer
                </button>
                <p className="text-red-500 text-right mt-4">
                {transactionError && transactionError.message}
              </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default BankTransfer;