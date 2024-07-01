import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../../hooks/useUser";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchSucces,
} from "../../store/slices/userDataSlice.js";
import { useData } from "../../hooks/useData.js";

function NewBankAccount() {
  const { currentUser } = useUser();
  const { loading } = useData();
  const dispatch = useDispatch();
  const [newAccount, setNewAccount] = useState(null);

  const handleSubmit = async (values) => {
    try {
      dispatch(fetchStart());
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/transaction/new-account/`;
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
      dispatch(fetchSucces(data?.banking));
      setNewAccount(data?.newAccount);
    } catch (error) {
      console.log("error,hapening", error);
    }
  };

  return (
    <>
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
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {loading ? "Loading..." : "Create Account"}
              </button>
            </div>
            <div className="h-6 text-red-500 text-right">
              <ErrorMessage
                name="agreeTerms"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="h-7">
        {newAccount && (
          <div className="text-lg flex items-center justify-evenly">
            <p className="font-medium">Your New Account Number is: </p>
            <p>{newAccount}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default NewBankAccount;
