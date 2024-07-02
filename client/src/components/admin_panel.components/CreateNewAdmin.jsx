import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../validation/validationSchema";
import FormField from "../FormField";

const schema = validationSchema.pick([
  "username",
  "email",
  "password",
  "confirmPassword",
]);

const handleSubmit = async (values, setSubmitting) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const link = `${apiUrl}/api/admin/create-new-admin/`;
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
              <FormField
                formik={formik}
                type="text"
                name="username"
                label="Username:"
              />
              <FormField
                formik={formik}
                type="email"
                name="email"
                label="Email:"
              />
              <FormField
                formik={formik}
                type="password"
                name="password"
                label="Password:"
              />
              <FormField
                formik={formik}
                type="password"
                name="confirmPassword"
                label="Confirm Password:"
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-primary"
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateNewAdmin;
