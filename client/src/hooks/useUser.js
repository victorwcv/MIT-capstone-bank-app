import { useSelector } from "react-redux";

export const useUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser;
};
