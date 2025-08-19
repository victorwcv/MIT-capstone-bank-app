import { cn } from "@/utils/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
  label?: string;
  error?: string;
}

export const CustomInput = ({ variant = "primary", className, ...props }: Props) => {
  return (
    <div className="relative flex flex-col pb-5">
      <label className="floating-label">
        <span>{props.label} </span>
        <input
          {...props}
          className={cn(
            "input w-full",
            {
              "input-primary": variant === "primary" && !props.error,
              "input-secondary": variant === "secondary" && !props.error,
              "input-error": props.error,
            },
            className
          )}
        />
      </label>
      {props.error && (
        <span className="text-[var(--color-error)] text-xs absolute bottom-0 right-2">
          {props.error}
        </span>
      )}
    </div>
  );
};
