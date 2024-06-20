import { Field } from "formik";
import { useData } from "../hooks/useData";

function AccountsField({ name, formik, balance = true }) {
  const { data } = useData();
  return (
    <>
      <Field
        as="select"
        id={name}
        name={name}
        className={`flex-1${
          formik.errors[name] && formik.touched[name]
            ? " border-2 border-red-500"
            : ""
        }`}
      >
        <option value="">Select an Account</option>
        {data.bankAccounts?.map((acc, index) => {
          return (
            <option key={index} value={acc.bankAccountNumber}>
              {acc.bankAccountNumber} {balance && `- $ ${acc.accountBalance}`}
            </option>
          );
        })}
      </Field>
    </>
  );
}

export default AccountsField;
