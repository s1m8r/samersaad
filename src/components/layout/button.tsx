import React from "react";
type Props = {
    children: React.ReactNode,
    onClick?: () => void
    variant?: "add" | "delete";
    disabled?: boolean;
}

export default function Button({
    onClick,
    variant = "add",
    disabled = false,
    children,
}: Props) {
    const base =
        " h-9 w-full px-4 py-2 rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50";
    const style = {
        add: "bg-blue-600 text-white hover:bg-blue-700",
        delete: "bg-red-600 text-white hover:bg-red-700 text-sm",
    }

    return <button onClick={onClick} className={`${base} ${style[variant]}`} disabled={disabled}>
        {children}
    </button>
}