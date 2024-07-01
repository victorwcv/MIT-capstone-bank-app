import { Field, ErrorMessage } from "formik";

function FormField({ type, name, label, formik, ...props }) {
  return (
    <div className="relative flex flex-1 flex-col pb-6 min-w-80">
      <label htmlFor={name}>{label}</label>
      <Field
        as={props.as || "input"}
        type={type}
        id={name}
        name={name}
        className={`${
          formik.errors[name] && formik.touched[name] ? "  border-red-500" : ""
        }
        ${props.textRight ? "text-right" : ""}
        `}
        readOnly={props.readOnly || false}
      >
        {props.children}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="absolute bottom-0 right-2 text-red-500"
      />
    </div>
  );
}

export default FormField;
