import { Formik, Form, Field } from "formik";
import { useData } from "../../hooks/useData";
import getCurrentDateTime from "../../utils/dates";
import { fetchSucces } from "../../store/slices/userDataSlice.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TotalUserBalance from "../TotalUserBalance.jsx";
import Alert from "../Alert.jsx";
import FormField from "../FormField.jsx";
import validationSchema from "../../validation/validationSchema.js";

const schema = validationSchema.pick([
  "amount",
  "originAccount",
  "destinationAccount",
  "transactionDate",
  "transactionTime",
  "description",
  "typeAccount",
]);

function BankTransfer() {
  const { data } = useData();
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const [accountBalances, setAccountBalances] = useState({});

  useEffect(() => {
    const balances = {};
    data.bankAccounts?.forEach((acc) => {
      balances[acc.bankAccountNumber] = acc.accountBalance;
    });
    setAccountBalances(balances);
  }, [data]);

  const handleSubmit = async (values) => {
    try {
      setError(null);
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/bank-transfer`;
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
      <h2 className="text-3xl text-center font-bold mb-10">Bank transfer</h2>
      <TotalUserBalance data={data} />

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
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form>
            <div
              className={`flex items-center overflow-auto justify-center gap-x-10 flex-wrap max-h-[450px] ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-around my-4 w-full">
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
              <FormField
                formik={formik}
                as="select"
                name="originAccount"
                label="Origin account number"
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

              {formik.values.typeAccount === "own" ? (
                <FormField
                  formik={formik}
                  as="select"
                  name="destinationAccount"
                  label="Destination account number"
                  children={
                    <>
                      <option>Select an Account</option>
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
              ) : (
                <FormField
                  formik={formik}
                  type={"text"}
                  name={"destinationAccount"}
                  label={"Destination account number"}
                />
              )}

              <FormField
                formik={formik}
                type={"number"}
                name={"amount"}
                label={"Transfer Amount:"}
                textRight
              />

              <FormField
                formik={formik}
                type={"text"}
                name={"transactionDate"}
                label={"Transfer Date:"}
                textRight
                readOnly
              />

              <FormField
                formik={formik}
                type={"text"}
                name={"description"}
                label={"Description or Note:"}
                textRight
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Loading..." : "Complete transfer"}
              </button>
            </div>
            {/* Render alert if showAlert is true */}
            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Successful transfer!" : error}
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

export default BankTransfer;
