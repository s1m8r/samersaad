import React from "react";
type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "add" | "delete" | "primary" | "editTable" | "outline";
  disabled?: boolean;
  type?: "normal" | "table";
  width: "w-full" | "w-fit";
  isPending?: boolean;
};

export default function Button({
  onClick,
  variant,
  disabled = false,
  children,
  type = "normal",
  width,
  isPending,
}: Props) {
  const base =
    " flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";
  const select = {
    normal: "h-9 px-4 py-2 rounded-xl",
    table: "p-2 py-1 rounded-md",
  };

  const style = {
    add: "bg-blue-600 text-white hover:bg-blue-700",
    delete: "bg-red-600 text-white hover:bg-red-700 text-sm",
    editTable: "bg-green-600 text-white hover:bg-green-700 text-sm",
    primary: "bg-black text-white hover:bg-gray-850 text-sm",
    outline: "bg-transparent text-gray-800 hover:bg-gray-100 text-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${style[variant]} ${select[type]} ${width}`}
      disabled={disabled || isPending}
    >
      {children}
    </button>
  );
}
