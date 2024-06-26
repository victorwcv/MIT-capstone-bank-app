import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../validation/validationSchema";

const schema = validationSchema.pick(["username", "email", "password", "confirmPassword"]);

const handleSubmit = async (values, setSubmitting) => {
  const link = "http://localhost:3000/api/admin/create-new-admin";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  };
  try {
    const response = await fetch(link, options);
    const data = await response.json();
    console.log(data);  
  } catch (error) {
    console.log(error);
  }
  setSubmitting(false);
};


function CreateNewAdmin() {
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">Create New Admin</h2>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex items-center justify-center gap-x-10 flex-wrap max-h-[500px]">
              <div className="relative flex flex-col w-1/2 pb-6  min-w-80">
                <label htmlFor="username">Username:</label>
                <Field
                  name="username"
                  type="text"
                  className={`${
                    formik.errors.username && formik.touched.username
                      ? "  border-red-500"
                      : ""
                  }`}
                />

                <ErrorMessage
                  name="username"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex  flex-col w-1/2 pb-6  min-w-80">
                <label htmlFor="email">Email:</label>
                <Field
                  name="email"
                  type="email"
                  className={`${
                    formik.errors.email && formik.touched.email
                      ? "  border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-col w-1/2 pb-6  min-w-80">
                <label htmlFor="password">Password:</label>
                <Field
                  name="password"
                  type="password"
                  className={`${
                    formik.errors.password && formik.touched.password
                      ? "  border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
              <div className="relative flex flex-col w-1/2 pb-6  min-w-80">
                <label htmlFor="password">Confirm Password:</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`${
                    formik.errors.confirmPassword && formik.touched.confirmPassword
                      ? "  border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="absolute bottom-0 right-2 text-red-500"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                Create Admin
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateNewAdmin;
