import type { ComponentPropsWithRef } from "react"

type Props = ComponentPropsWithRef<"button"> & {
  children?: React.ReactNode
  variant: "primary" | "secondary"
}

const variantClasses = {
  primary: "bg-[#964fb5] hover:bg-[#964fb5] text-white",
  // TODO
  secondary: ""
}

const Button = ({ children, className, variant, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${variantClasses[variant]} ${className || ""} p-1 rounded hover:brightness-90 transition-all duration-100`}>
      {children}
    </button>
  )
}

export default Button
