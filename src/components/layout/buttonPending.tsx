import { Spinner } from "../ui/spinner";
import Button from "./button";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "add" | "delete" | "primary";
  disabled?: boolean;
  isPending?: boolean;
}

export default function ButtonPending({
  onClick,
  variant,
  disabled = false,
  children,
  isPending,
}: Props) {
  return (
    <Button onClick={onClick} variant={variant} disabled={disabled}  >
      {isPending ? (<>
          <Spinner data-icon="inline-start" />
          {children}</>
      ) : (
        children
      )}
    </Button>
  );
}