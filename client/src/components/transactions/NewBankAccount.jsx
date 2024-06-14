import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../hooks/useUser";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSucces,
  fetchFailure,
} from "../../store/slices/userDataSlice.js";
import { useData } from "../../hooks/useData.js";

function NewBankAccount() {
  const { currentUser } = useUser();
  const { loading } = useData();
  const dispatch = useDispatch();
  const [newAccount, setNewAccount] = useState('XX-XXXX-XXXXXXXXXXXXXXX');

  const handleSubmit = async (values) => {
    try {
      dispatch(fetchStart());
      const link = "http://localhost:3000/api/user/transactions/new-account";
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      }
      const response = await fetch(link, options);
      const data = await response.json();
      console.log(data);
      dispatch(fetchSucces(data?.banking));
      setNewAccount(data?.newAccount);
    } catch (error) {
      console.log("error,hapening", error);
    }
  }

  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-3xl text-center font-bold mb-10">
        Create a New Bank Account
      </h2>
      <p className="text-lg text-center">
        Creating a new bank account involves providing personal information,
        agreeing to the bank’s terms, and understanding associated fees. It
        offers secure money management, access to various banking services, and
        the ability to build financial history. Ensure you meet the bank’s
        requirements and consider the benefits and responsibilities before
        proceeding.
      </p>
      <Formik
        initialValues={{
          userId: currentUser._id,
          agreeTerms: false,
        }}
        validationSchema={Yup.object({
          agreeTerms: Yup.boolean()
            .oneOf([true], "You must agree to the terms and conditions")
            .required("You must agree to the terms and conditions"),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values);
          resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <div className="text-lg flex items-center justify-evenly">
              <div className="my-10">
                <Field type="checkbox" name="agreeTerms" id="agreeTerms" />
                <label htmlFor="agreeTerms"> I agree to the terms.</label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-8 py-3 active:scale-95 transition-transform"
              >
                {loading ? 'Loading...' : 'Create Account'}
              </button>
            </div>
            <div className="h-6">
              <ErrorMessage
                name="agreeTerms"
                component="p"
                className="text-red-500 text-right"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-between text-lg border-b-2 mt-10">
        <p>Your New Account Number is: </p>
        <p>{newAccount}</p>
      </div>
    </div>
  );
}

export default NewBankAccount;