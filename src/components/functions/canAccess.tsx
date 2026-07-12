import { useAuthStore } from "@/stores/userStore";

const data = useAuthStore.getState().user;

export const CanAccess = (permission: string | string[]) => {
  if (data?.role === "admin") {
    return true;
  }

  if (!data?.permissions) {
    return false;
  }

  if (Array.isArray(permission)) {
    return permission.some((p) => data.permissions.includes(p));
  }
  return data.permissions.includes(permission);
};
