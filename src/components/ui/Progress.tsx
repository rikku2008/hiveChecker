import type { ComponentPropsWithRef } from "react"

type ProgressProps = ComponentPropsWithRef<"div"> & {
  value?: number // 0~1
}

const Progress = ({ className, value = 1, ...props }: ProgressProps) => {
  return (
    <div
      className={`w-full bg-[#5a2f6d] rounded-full dark:bg-gray-700 ${className || ""}`}>
      <div
        className="bg-[#8747a3] text-xs font-medium text-white text-right pr-2 p-0.5 leading-none rounded-full transition-all duration-300"
        style={{ width: `${value * 100}%` }}
        {...props}>
        {(value * 100).toFixed(2)}%
      </div>
    </div>
  )
}

export default Progress
