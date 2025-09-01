interface Props {
  children?: React.ReactNode;
}

export const CustomBlock: React.FC<Props> = ({ children }) => {
  return <div className="bg-white p-4 sm:p-6  rounded-sm shadow-md m-2">{children}</div>;
};
