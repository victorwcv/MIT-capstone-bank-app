import { Formik, Form, Field, ErrorMessage } from "formik";
import { useData } from "../../hooks/useData";
import { useUserBalance } from "../../hooks/useUserBalance";
import * as Yup from "yup";
import getCurrentDateTime from "../../utils/dates";

function BankTransfer() {
  const { data } = useData();
  const userBalance = useUserBalance();

  console.log("Rendering Bank Transfer!");
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Bank transfer</h2>
      <div className="mb-6 mx-12 font-medium flex justify-between text-xl border-b-2">
        <h3>Current balance:</h3>
        <p>$ {userBalance}</p>
      </div>
      <div>
        <Formik
          initialValues={{
            originAccount: "",
            originAccountBalance: 0,
            destinationAccount: "",
            typeAccount: "own",
            amount: "",
            transactionDate: getCurrentDateTime().onlyDate,
            transactionTime: getCurrentDateTime().timeOnly,
            description: "",
          }}
          validate={(values) => {
            const errors = {};
            if (
              values.originAccount === values.destinationAccount &&
              values.originAccount
            ) {
              errors.destinationAccount = "Cannot transfer to same account";
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
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <Form>
              <div className="flex flex-col gap-2 mb-6 text-lg">
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
                <ErrorMessage
                  name="originAccount"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex justify-around mb-6 text-lg">
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
              <div className="flex flex-col gap-2 mb-4 text-lg">
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
                <div className="text-red-500">
                  <ErrorMessage name="destinationAccount" />
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
                  <div className="text-red-500 mt-1 text-sm font-light h-3">
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
                  <div className="text-red-500 mt-1 text-sm font-light h-3">
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
                <ErrorMessage name="description" />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-8 py-4 mt-6 rounded-lg text-white font-medium text-xl bg-blue-500"
                >
                  Transfer
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default BankTransfer;
