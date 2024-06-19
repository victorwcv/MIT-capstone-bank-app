import TotalUserBalance from "../TotalUserBalance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AccountsField from "../AccountsField";

function PayBills() {
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Pay Bills</h2>
      <TotalUserBalance />
      <Formik
        initialValues={{
          service: "",
          amount: "",
          originAccount: "",
          invoiceNumber: "",
          description: "",
        }}
        validationSchema={Yup.object({
          service: Yup.string().required("Required field"),
          amount: Yup.number().positive().required("Enter the amount"),
          originAccount: Yup.string().required("Required field"),
          invoiceNumber: Yup.string().required("Required field"),
          description: Yup.string(),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex items-center justify-center gap-x-10 flex-wrap max-h-[450px]">
              <div className="relative flex flex-col pb-6 w-5/12 min-w-80">
                <label htmlFor="service">Service:</label>
                <Field
                  as="select"
                  id="service"
                  name="service"
                  className={`${
                    formik.errors.service && formik.touched.service
                      ? " border-2 border-red-500"
                      : ""
                  }`}
                >
                  <option value="">Select a service</option>
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
                  name="service"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-col pb-6 w-5/12 min-w-80">
                <label htmlFor="invoiceNumber">Invoce Number:</label>
                <Field
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  className={`${
                    formik.errors.service && formik.touched.service
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

              <div className="relative flex flex-col pb-6 w-5/12 min-w-80">
                <label htmlFor="amount">Amount:</label>
                <Field
                  type="text"
                  name="amount"
                  id="amount"
                  className={`${
                    formik.errors.service && formik.touched.service
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
              <div className="relative flex flex-col pb-6 w-5/12 min-w-80">
                <label htmlFor="originAccount">Account for payment:</label>
                <AccountsField name={"originAccount"} formik={formik} />
                <ErrorMessage
                  name="originAccount"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-col pb-6 w-5/12 min-w-80">
                <label htmlFor="invoiceNumber">Description:</label>
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
