import { useState, type ComponentPropsWithRef } from "react"

type Props = ComponentPropsWithRef<"input">

const Input = ({ className, ...props }: Props) => {
  return (
    <input
      className={`block px-2 py-1 bg-[#1a101f] text-white border border-[#36293d] rounded ${className || ""}`}
      {...props}
    />
  )
}

export default Input