import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const token = useAppSelector(currentToken);

  return token ? children : <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;
