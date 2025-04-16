import { AppDispatch, RootState } from "@/store/store";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api/auth.api";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { access_token, user, is_authenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined. Ensure AuthProvider is correctly set up."
    );
  }

  const { logout } = authContext;

  useEffect(() => {
    if (access_token && !user) {
      dispatch(authApi.endpoints.getMe.initiate()).unwrap();
    } else if (!access_token && user) {
      dispatch(authApi.util.resetApiState());
    }
  }, [access_token, user, dispatch]);

  return {
    user,
    is_authenticated,
    logout,
  };
};
