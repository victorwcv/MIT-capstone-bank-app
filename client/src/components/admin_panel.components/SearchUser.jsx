import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../validation/validationSchema";
import { useState } from "react";
import { totalUserBalance } from "../../utils/totalUserBalance";

const schema = validationSchema.pick(["email"]);

function SearchUser() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleSubmit = async (values, setSubmitting) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const link = `${apiUrl}/api/admin/search-user/${values.email}`;
    const options = {
      method: "GET",
      credentials: "include",
    };
    try {
      const response = await fetch(link, options);
      const data = await response.json();
      if (response.status !== 200) {
        setError(data);
        return;
      }
      setData(data);
      console.log(data);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">
        Search User Information
      </h2>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setData(null);
          setError(null);
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="relative flex flex-col w-1/2 min-w-80">
                <Field
                  name="email"
                  type="text"
                  className={`${
                    formik.errors.email && formik.touched.email
                      ? "  border-red-500"
                      : ""
                  }`}
                  placeholder="Enter user's email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 absolute bottom-[-25px] right-0"
                />
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <br />
      <hr />
      <div className="h-[500px] overflow-auto mt-6">
        {data && (
          <>
            <h3 className="text-center text-xl font-semibold">
              Personal Information
            </h3>
            <ul className="text-lg mx-12 font-medium mt-6">
              <li>
                ID: <p className="font-normal ml-6">{data?._id}</p>
              </li>
              <li>
                Email: <p className="font-normal ml-6">{data?.email}</p>
              </li>
              <li>
                Name: <p className="font-normal ml-6">{data?.username}</p>
              </li>
              <li>
                Phone: <p className="font-normal ml-6">{data?.phone}</p>
              </li>
              <li>
                Address: <p className="font-normal ml-6">{data?.address}</p>
              </li>
              <li>
                Created at:{" "}
                <p className="font-normal ml-6">
                  {data?.createdAt.slice(0, 10)}
                </p>
              </li>
            </ul>
            <h3 className="text-center text-xl mt-12 font-semibold">
              Bank Information
            </h3>
            <p className="text-lg mx-12 font-medium">Bank Accounts:</p>
            <section className="my-12">
              {data?.banking?.bankAccounts?.map((acc, index) => {
                return (
                  <article
                    key={index}
                    className="flex justify-between border-b-2 mx-12 my-6"
                  >
                    <p>{acc.bankAccountNumber}</p>
                    <p>$ {acc.accountBalance}</p>
                  </article>
                );
              })}
            </section>
          </>
        )}
        {error && (
          <div className="text-neutral-500 text-xl text-center mt-20">
            {error.message || "Something went wrong"}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchUser;
