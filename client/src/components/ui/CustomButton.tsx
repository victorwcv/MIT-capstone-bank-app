import { cn } from "@/utils/utils";

type Variant = "primary" | "secondary";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent-500 hover:bg-accent-600 active:bg-accent-400",
  secondary:
    "bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-800",
};

export const CustomButton = ({
  variant = "primary",
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full text-white/90 p-4 rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-200 transition-colors duration-300",
        variantClasses[variant],
        className
      )}
    >
      {props.children}
    </button>
  );
};
