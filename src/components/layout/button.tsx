import React from "react";
type Props = {
    children: React.ReactNode,
    onClick?: () => void
    variant: "add" | "delete" | "primary" |"editTable";
    disabled?: boolean;
    type?: "normal" | "table"
}

export default function Button({
    onClick,
    variant ,
    disabled = false,
    children,
    type="normal"
}: Props) {
    const base =
        " flex items-center justify-center font-medium transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";
    const select = {
        normal: "w-full h-9 px-4 py-2 rounded-xl",
        table:"p-2 py-1 rounded-md"
    }
    
    const style = {
        add: "bg-blue-600 text-white hover:bg-blue-700",
        delete: "bg-red-600 text-white hover:bg-red-700 text-sm",
        editTable: "bg-green-600 text-white hover:bg-green-700 text-sm",
        primary: "bg-black text-white hover:bg-gray-850 text-sm",
    }

    return <button onClick={onClick} className={`${base} ${style[variant]} ${select[type]} `} disabled={disabled}>
        {children}
    </button>
}