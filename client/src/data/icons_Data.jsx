import { FaLock, FaRegCreditCard, FaUnlock, FaUser } from "react-icons/fa";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { LiaPiggyBankSolid } from "react-icons/lia";
import {
  RiAdminFill,
  RiSecurePaymentFill,
  RiHandCoinLine,
  RiShieldUserFill,
} from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

const icons = {
  credit_card: <FaRegCreditCard />,
  money: <HiOutlineBanknotes />,
  piggy: <LiaPiggyBankSolid />,
  user: <FaUser />,
  secure: <RiSecurePaymentFill />,
  service: <RiHandCoinLine />,
  secure: <RiShieldUserFill />,
  signout: <PiSignOutBold />,
  admin: <RiAdminFill />,
  lock: <FaLock />,
  unlock: <FaUnlock /> 
};

export default icons;
