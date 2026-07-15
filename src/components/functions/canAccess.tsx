import { useAuthStore } from "@/stores/userStore";

export const CanAccess = (permission: string | string[]) => {
  const user = useAuthStore.getState().user;
  if (user?.role === "admin" || permission === "any") {
    return true;
  }

  if (!user?.permissions) {
    return false;
  }

  if (Array.isArray(permission)) {
    return permission.some((p) => user.permissions.includes(p));
  }
  return user.permissions.includes(permission);
};
