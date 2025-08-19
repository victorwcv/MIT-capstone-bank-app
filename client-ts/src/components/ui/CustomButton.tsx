import { cn } from "@/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const CustomButton = ({ variant = "primary", className, ...props }: Props) => {
  return (
    <button
      {...props}
       className={cn(
        "btn w-full",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
        },
        className
      )}
    >
      {props.children}
    </button>
  );
};
