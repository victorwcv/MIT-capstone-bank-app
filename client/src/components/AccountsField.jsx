import { Field } from "formik";
import { useData } from "../hooks/useData";

function AccountsField({ name, formik }) {
  const { data } = useData();
  return (
    <>
      <Field
        as="select"
        id={name}
        name={name}
        className={`${
          formik.errors.service && formik.touched.service
            ? " border-2 border-red-500"
            : ""
        }`}
      >
        <option value="">Select an Account</option>
        {data.bankAccounts?.map((acc, index) => {
          return (
            <option key={index} value={acc.bankAccountNumber}>
              {`${acc.bankAccountNumber} - $ ${acc.accountBalance}`}
            </option>
          );
        })}
      </Field>
    </>
  );
}

export default AccountsField;
