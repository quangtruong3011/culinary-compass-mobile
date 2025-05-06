import { RootState } from "@/store/store";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const { user, is_authenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined. Ensure AuthProvider is correctly set up."
    );
  }

  const { logout } = authContext;

  return {
    user,
    is_authenticated,
    logout,
  };
};
