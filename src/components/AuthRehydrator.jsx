import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/Features/authSlice";

const AuthRehydrator = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    }
  }, []);

  return children;
};

export default AuthRehydrator;
