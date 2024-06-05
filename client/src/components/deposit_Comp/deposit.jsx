import { Formik, Form, Field, ErrorMessage } from "formik";
import getCurrentDateTime from "../../utils/dates.js";
import * as Yup from "yup";
function Deposit() {
  
  
  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-10">Deposit</h2>
      <div className="mb-6 text-xl">
        <h3>User Balance</h3>
        <div className="flex justify-between border-b-2">
          <p>Account xxxx-xxxx-xxxxxxxxxxx</p>
          <p>3000</p>
        </div>
      </div>
      <Formik
        initialValues={{
          amount: "",
          destinationAccount: "",
          depositDate: getCurrentDateTime().onlyDate,
          depositHour: getCurrentDateTime().timeOnly,
          description: "",
        }}
        validationSchema={Yup.object({
          amount: Yup.number().positive("Enter a positive amount").required("Required"),
          destinationAccount: Yup.string().required("Required").length(11,"Enter 11 digits"),
          depositDate: Yup.string(),
          description: Yup.string(),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form className="grid grid-cols-2 gap-10">
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
                  type="text"
                  id="destinationAccount"
                  name="destinationAccount"
                  className="px-4 py-1 outline-none text-right"
                />
                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="destinationAccount" />
                </div>
              </div>

              <div className="flex flex-col my-4 text-xl">
                <label htmlFor="depositDate" className="my-2">
                  Deposit Date
                </label>
                <Field
                  type="text"
                  id="depositDate"
                  name="depositDate"
                  className="px-4 py-1 outline-none text-right"
                  readOnly
                />
                <div className="text-red-500 mt-1 text-sm font-light h-3">
                  <ErrorMessage name="depositDate" />
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
            <button type="submit" disabled={formik.isSubmitting} className="mx-10 mt-10 py-4 rounded-lg text-white font-medium text-2xl bg-blue-500">
              Submit
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Deposit;
