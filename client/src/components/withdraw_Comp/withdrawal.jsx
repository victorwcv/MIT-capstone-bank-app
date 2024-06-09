import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fetchData } from "../../utils/fetchData.js";
import { fetchSucces } from "../../store/slices/userDataSlice";
import Loading from "../loading_Comp/loading.jsx";

function Withdrawal({ data }) {
  console.log("rendering withdrawal");
  const dispatch = useDispatch();

  if (!data) return <Loading />;

  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-10">Withdrawal</h2>
      <div className="mb-6 text-xl">
        <h3 className="mb-4">User Balance</h3>
        {data.bankAccounts.map((acc, index) => {
          return (
            <div key={index} className="flex justify-between border-b-2">
              <p>{acc.bankAccountNumber}</p>
              <p>{acc.AccountBalance}</p>
            </div>
          );
        })}
      </div>
      <Formik
        initialValues={{
          amount: "",
          originAccount: "",
          transactionDate: getCurrentDateTime().onlyDate,
          transactionTime: getCurrentDateTime().timeOnly,
          description: "",
        }}
        validationSchema={Yup.object({
          amount: Yup.number()
            .positive("Enter a positive amount")
            .required("Required"),
          originAccount: Yup.string().required("Required"),
          transactionDate: Yup.string(),
          transactionTime: Yup.string(),
          description: Yup.string(),
        })}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);

          try {
            const data = await fetchData(
              "http://localhost:3000/api/user/transactions/withdrawal",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
              }
            );
            console.log("Rendering response", data);
            dispatch(fetchSucces(data));
            resetForm();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formik) => (
          <Form className="grid grid-cols-2 gap-10">
            <div>
              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="amount" className="my-2">
                  Amount to Withdraw
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
                <label htmlFor="originAccount" className="my-2">
                  Origin Account
                </label>

                <Field
                  as="select"
                  id="originAccount"
                  name="originAccount"
                  className="px-4 py-1 outline-none text-right"
                >
                  <option value="">Select an Account</option>
                  {data.bankAccounts.map((acc, index) => {
                    return (
                      <option key={index} value={acc.bankAccountNumber}>
                        {acc.bankAccountNumber}
                      </option>
                    );
                  })}
                </Field>

                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="originAccount" />
                </div>
              </div>

              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="transactionDate" className="my-2">
                  Withdrawal Date
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
                  className="w-96 h-32 px-4 py-1 outline-none rounded-lg resize-none"
                />
                <ErrorMessage name="description" />
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="mx-10 mt-10 py-4 rounded-lg text-white font-medium text-2xl bg-blue-500"
              >
                Withdraw
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Withdrawal;
