type CanProps = {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: null;
};
import { CanAccess } from "./canAccess";
export function Can({ permission, children, fallback = null }: CanProps) {
  if (!CanAccess(permission)) {
    return fallback;
  }
  return children;
}
