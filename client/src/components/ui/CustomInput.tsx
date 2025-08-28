import { cn } from "@/utils/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const CustomInput = ({ className, ...props }: Props) => {
  return (
    <div className="relative flex flex-col pb-5">
      <span>{props.label} </span>
      <input
        {...props}
        className={cn(
          "w-full p-3 border-2 border-zinc-400 focus:border-accent-500 outline-0 rounded-md",
          {
            "border-red-400": !!props.error,
          },
          className
        )}
      />

      {props.error && (
        <span className="text-red-400 text-xs absolute bottom-0 right-2">{props.error}</span>
      )}
    </div>
  );
};
