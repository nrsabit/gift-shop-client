import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { currentToken, logOut } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(currentToken);

  const dispatch = useAppDispatch();
  let user;

  if (token) {
    user = verifyToken(token) as Record<string, any>;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return token ? children : <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;
