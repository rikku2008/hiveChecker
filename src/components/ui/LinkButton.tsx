import type { ComponentPropsWithRef } from "react"

type LinkButtonProps = ComponentPropsWithRef<"a"> & {
  children?: React.ReactNode
}

const LinkButton = ({ children, className, ...props }: LinkButtonProps) => {
  return (
    <a
      className={`block px-3 py-2 bg-[#160d1b] hover:bg-[#5a2f6d] text-white border border-[#36293d] text-sm font-bold rounded transition-colors duration-200 ${className || ""}`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}>
      {children}
    </a>
  )
}

export default LinkButton
