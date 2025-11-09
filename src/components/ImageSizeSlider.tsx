import { useEffect, useState, type ChangeEvent } from "react"

const ImageSizeSlider = () => {
  const [size, setSize] = useState(128)

  const updateAvatarSize = (size: number) => {
    const AVATAR_CLASSNAME = ".extension-avatar-wrapper"
    const els = document.querySelectorAll<HTMLDivElement>(AVATAR_CLASSNAME)
    els.forEach((wrapper) => {
      wrapper.style.height = `${size}px`
    })
  }

  useEffect(() => {
    updateAvatarSize(size)
  }, [size])

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value))
  }

  return (
    <div className="mt-1">
      <h2 className="font-bold text-sm">Image Size</h2>
      <label htmlFor="image-size-slider" className="sr-only">
        Image Size
      </label>
      <input
        id="image-size-slider"
        type="range"
        min="50"
        max="500"
        value={size}
        className="w-full accent-[#8747a3]"
        onChange={handleSliderChange}
      />
      <div className="text-xs text-right text-gray-400 mt-1">{size}px</div>
    </div>
  )
}

export default ImageSizeSlider
