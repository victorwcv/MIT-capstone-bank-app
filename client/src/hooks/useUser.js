import { useSelector } from "react-redux";

export const useUser = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return { currentUser, loading, error };
};
