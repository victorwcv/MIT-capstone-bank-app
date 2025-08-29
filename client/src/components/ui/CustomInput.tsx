import { cn } from "@/utils/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const CustomInput = ({ className, ...props }: Props) => {
  return (
    <div className="relative flex flex-col">
      <span>{props.label} </span>
      <input
        {...props}
        className={cn(
          "w-full p-3 border-2 border-zinc-300 focus:border-accent-500 outline-0 rounded-sm",
          {
            "border-red-400": !!props.error,
          },
          className
        )}
      />

      {props.error && (
        <span className="text-red-400 text-xs absolute -bottom-4 right-2">{props.error}</span>
      )}
    </div>
  );
};
