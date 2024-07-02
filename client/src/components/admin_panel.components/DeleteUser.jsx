import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../validation/validationSchema";
import { useState } from "react";

const schema = validationSchema.pick(["email"]);

function DeleteUser() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, setSubmitting) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const link = `${apiUrl}/api/admin/search-user/${values.email}`;
    const options = {
      method: "GET",
      credentials: "include",
    };
    try {
      setError(null);
      setUserDetails(null);
      const response = await fetch(link, options);
      if (!response.ok) {
        const error = await response.json();
        setError(error.message || "An error occured. Please try again later.");
        return;
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const link = `${apiUrl}/api/admin/delete-user/${userDetails?._id}/`;
    const options = {
      method: "DELETE",
      credentials: "include",
    };
    try {
      const response = await fetch(link, options);
      if (!response.ok) {
        const error = await response.json();
        setError(error);
        return;
      }
      setUserDetails(null);
      const data = await response.json();
      alert(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-3xl text-center font-bold mb-10">Delete User</h2>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {(formik) => (
          <Form>
            <div className="flex items-center justify-center gap-x-10 flex-wrap max-h-[500px]">
              <Field
                type="email"
                name="email"
                placeholder="Enter user email"
                className="w-80"
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={formik.isSubmitting}
              >
                Find User
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="h-[400px]">
        {userDetails && (
          <div className="flex flex-col items-center justify-center h-full gap-5">
            <ul className="text-lg">
              <li>
                <strong>User ID:</strong> {userDetails?._id}
              </li>
              <li>
                <strong>Name:</strong> {userDetails?.username}
              </li>
              <li>
                <strong>Email:</strong> {userDetails?.email}
              </li>
              <li>
                <strong>Role:</strong> {userDetails?.role}
              </li>
            </ul>

            <button className="btn-primary" onClick={handleDelete}>
              Delete User
            </button>
            <button className="btn-primary" onClick={() => setUserDetails(null)}>
              Cancel
            </button>

          </div>
        )}
      </div>
        <p className="text-red-500 w-full text-right h-6">{error}</p>
    </div>
  );
}

export default DeleteUser;
