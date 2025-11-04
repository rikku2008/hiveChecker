import type { ComponentPropsWithRef } from "react"

type InputProps = ComponentPropsWithRef<"input">

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`block px-2 py-1 bg-[#1a101f] text-white border border-[#36293d] rounded ${className || ""}`}
      {...props}
    />
  )
}

export default Input
