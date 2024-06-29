import TotalUserBalance from "../TotalUserBalance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountsField from "../AccountsField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice";
import getCurrentDateTime from "../../utils/dates";
import { useData } from "../../hooks/useData";

function PayBills() {
  const { data } = useData();
  const [errorPayBills, setErrorPayBills] = useState(null);
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Pay Bills</h2>
      <TotalUserBalance data={data} />
      <Formik
        initialValues={{
          provider: "",
          amount: "",
          originAccount: "",
          transactionDate: getCurrentDateTime().onlyDate,
          transactionTime: getCurrentDateTime().timeOnly,
          invoiceNumber: "",
          description: "",
        }}
        validationSchema={Yup.object({
          provider: Yup.string().required("Required field"),
          amount: Yup.number().positive().required("Enter the amount"),
          originAccount: Yup.string().required("Required field"),
          invoiceNumber: Yup.string().required("Required field"),
          description: Yup.string(),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const link = `${apiUrl}/api/transaction/pay-bills/`;
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
              setErrorPayBills(data);
              return;
            }
            setErrorPayBills(null);
            dispatch(fetchSucces(data));
            resetForm();
          } catch (error) {
            setErrorPayBills(error);
            console.log(error);
          }
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex items-center justify-center gap-x-10 flex-wrap max-h-[450px]">
              <div className="relative flex flex-1 flex-col pb-6  min-w-80">
                <label htmlFor="provider">Provider:</label>
                <Field
                  as="select"
                  id="provider"
                  name="provider"
                  className={`${
                    formik.errors.provider && formik.touched.provider
                      ? " border-2 border-red-500"
                      : ""
                  }`}
                >
                  <option value="">Select a provider</option>
                  <option value="electricity">Electricity</option>
                  <option value="water">Water</option>
                  <option value="gas">Gas</option>
                  <option value="internet">Internet</option>
                  <option value="phone">Phone</option>
                  <option value="cable">Cable</option>
                  <option value="tv">TV</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="provider"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-1 flex-col pb-6  min-w-80">
                <label htmlFor="invoiceNumber">Invoce Number:</label>
                <Field
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  className={`${
                    formik.errors.invoiceNumber && formik.touched.invoiceNumber
                      ? " border-2 border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="invoiceNumber"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>

              <div className="relative flex flex-1 flex-col pb-6  min-w-80">
                <label htmlFor="amount">Amount:</label>
                <Field
                  type="text"
                  name="amount"
                  id="amount"
                  className={`${
                    formik.errors.amount && formik.touched.amount
                      ? " border-2 border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-1 flex-col pb-6  min-w-80">
                <label htmlFor="originAccount">Account for payment:</label>
                <AccountsField name={"originAccount"} formik={formik} />
                <ErrorMessage
                  name="originAccount"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-1 flex-col pb-6 min-w-80">
                <label htmlFor="description">Description:</label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="h-20 px-4 py-1 outline-none resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                Complete Payment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PayBills;
