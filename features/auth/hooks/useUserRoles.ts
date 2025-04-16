import { USER_ROLES } from "@/constants/constants";
import { useAuth } from "./useAuth";

export const useUserRoles = () => {
  const { user } = useAuth();
  const roles: string[] = user?.roles || [];

  return {
    isAdmin: roles.includes(USER_ROLES.ADMIN) ?? false,
    isUser: roles.includes(USER_ROLES.USER) ?? false,
    roles,
  };
};
