import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const AuthButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login());
    navigate("/dashboard");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return { handleLogin, handleLogout };
};

export default AuthButton;
