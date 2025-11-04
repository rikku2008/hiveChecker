import type { ComponentPropsWithRef } from "react"

type ButtonVariant = "primary" | "secondary"

type ButtonProps = ComponentPropsWithRef<"button"> & {
  children?: React.ReactNode
  variant: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#964fb5] hover:brightness-90",
  secondary: "bg-[#221827] hover:bg-[#36293d]"
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${variantClasses[variant]} p-1 rounded transition-all duration-100 text-white ${className || ""}`}>
      {children}
    </button>
  )
}

export default Button
