import { useSelector } from "react-redux";
import { selectEmail, selectLoggedIn } from "../redux/slice/authSlice";

export const Login = ({ children }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
}
export const Logout = ({ children }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
}

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "abc@hotmail.com") {
    return children;
  }
  return null;
}