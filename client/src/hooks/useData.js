import { useSelector } from "react-redux";

export const useData = () => {
  const { data, error, loading } = useSelector((state) => state.userData);
  return { data, error, loading };
};
