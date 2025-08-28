import { cn } from "@/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const CustomButton = ({ className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full p-4 bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-400 rounded-md cursor-pointer disabled:bg-zinc-200 disabled:cursor-not-allowed",
        className
      )}
    >
      {props.children}
    </button>
  );
};
