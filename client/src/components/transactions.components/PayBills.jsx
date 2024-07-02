import TotalUserBalance from "../TotalUserBalance";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSucces } from "../../store/slices/userDataSlice";
import getCurrentDateTime from "../../utils/dates";
import { useData } from "../../hooks/useData";
import Alert from "../Alert.jsx";
import FormField from "../FormField.jsx";
import validationSchema from "../../validation/validationSchema.js";

const schema = validationSchema.pick([
  "provider",
  "originAccount",
  "amount",
  "transactionDate",
  "transactionTime",
  "invoiceNumber",
  "description",
]);

function PayBills() {
  const { data } = useData();
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      setError(null);
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/pay-bill`;
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
      setShowAlert(true);
      dispatch(fetchSucces(data));
    } catch (error) {
      setError("An error occured. Please try again later.");
      setShowAlert(true);
    }
  };

  return (
    <div className="relative">
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
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form>
            <div
              className={`flex items-center justify-center gap-x-10 flex-wrap max-h-[450px] ${
                formik.isSubmitting ? "opacity-50" : ""
              }`}
            >
              <FormField
                formik={formik}
                as={"select"}
                name={"provider"}
                label={"Provider:"}
                children={
                  <>
                    <option value="">Select a provider</option>
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                    <option value="gas">Gas</option>
                    <option value="internet">Internet</option>
                    <option value="phone">Phone</option>
                    <option value="cable">Cable</option>
                    <option value="tv">TV</option>
                    <option value="other">Other</option>
                  </>
                }
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type={"text"}
                name={"invoiceNumber"}
                label={"Invoce Number:"}
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type={"number"}
                name={"amount"}
                label={"Amount to pay:"}
              />

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                as="select"
                name="originAccount"
                label="Account for payment:"
                children={
                  <>
                    <option value="">Select an Account</option>
                    {/* Render options for destination account */}
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

              <FormField
                formik={formik}
                disabled={formik.isSubmitting}
                type="text"
                name="description"
                label="Description or Note:"
              />
            </div>
            <div className="flex justify-center mt-8">
              {/* Render submit button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Loading..." : "Complete Payment"}
              </button>
            </div>

            {showAlert && (
              <Alert
                success={error === null}
                message={error === null ? "Successful payment!" : error}
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

export default PayBills;
