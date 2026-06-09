import React from "react";

type Props = {
    children: React.ReactNode

}

export default function ErrorMessage({
    children,
}: Props) {

    const base = "mt-1 text-sm text-red-500"
    return (
        <p className={`${base}`}>{children}</p>)
}