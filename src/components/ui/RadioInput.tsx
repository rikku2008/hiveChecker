import type { ComponentPropsWithRef } from "react"

type RadioInputProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  children?: React.ReactNode
}

const RadioInput = ({ className, children, ...props }: RadioInputProps) => {
  return (
    <label
      className={`border border-[#36293d] bg-[#160d1b] has-[input:checked]:bg-[#5a2f6d] px-2 py-2 text-sm rounded transition-colors duration-200 ${className || ""}`}>
      <input type="radio" {...props} className="hidden" />
      <span className="text-white select-none">{children}</span>
    </label>
  )
}

type RadioOption = {
  label: string
  value: string
}

type RadioInputGroupProps = Omit<
  RadioInputProps,
  "children" | "value" | "checked" | "onChange"
> & {
  options: RadioOption[]
  selected: string
  onChange: (value: string) => void
}

const RadioInputGroup = ({
  options,
  selected,
  onChange,
  className,
  ...props
}: RadioInputGroupProps) => {
  return (
    <div className={`flex gap-1 ${className || ""}`}>
      {options.map((option) => (
        <RadioInput
          key={option.value}
          {...props}
          value={option.value}
          checked={selected === option.value}
          onChange={() => onChange(option.value)}>
          {option.label}
        </RadioInput>
      ))}
    </div>
  )
}

export { RadioInput, RadioInputGroup }
