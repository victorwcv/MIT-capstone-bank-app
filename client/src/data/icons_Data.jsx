import { FaLock, FaRegCreditCard, FaUnlock, FaUser } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { LiaPiggyBankSolid } from "react-icons/lia";
import {
  RiAdminFill,
  RiSecurePaymentFill,
  RiHandCoinLine,
} from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

const icons = {
  credit_card: <FaRegCreditCard />,
  money: <HiOutlineBanknotes />,
  piggy: <LiaPiggyBankSolid />,
  user: <FaUser />,
  secure: <RiSecurePaymentFill />,
  service: <RiHandCoinLine />,
  signout: <PiSignOutBold />,
  admin: <RiAdminFill />,
  lock: <FaLock />,
  unlock: <FaUnlock />,
  check: <FaCircleCheck />,
  xMarck: <FaCircleXmark />,
  menu: <GiHamburgerMenu />,
};

export default icons;
