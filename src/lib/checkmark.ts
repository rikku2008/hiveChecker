export const checkmarkClass = "hub-title-checkmark"
export const checkmarkStyle = `color: inherit; font-size: 16px; font-weight: bold;`

export const resetCheckmarks = () => {
  document
    .querySelectorAll(`.${checkmarkClass}`)
    .forEach((mark) => mark.remove())
}

export const createCheckmark = (isOwned: boolean) => {
  const mark = document.createElement("span")
  mark.className = checkmarkClass
  mark.style.cssText = checkmarkStyle
  mark.innerHTML = isOwned ? " ✅" : " ❌"
  return mark
}

export const addCheckmarks = (
  els: HTMLElement[],
  ownedItems: string[],
  transformItemName?: (itemName: string) => string
) => {
  const remainTitles = [...ownedItems]

  for (const el of els) {
    let itemName = el.textContent?.toLowerCase().replace(/\s+/g, " ").trim()
    if (!itemName) continue

    if (transformItemName) {
      itemName = transformItemName(itemName)
    }

    const findIndex = remainTitles.indexOf(itemName)
    const isOwned = findIndex !== -1

    if (isOwned) {
      remainTitles.splice(findIndex, 1)
    }

    const mark = createCheckmark(isOwned)
    el.appendChild(mark)
  }

  if (remainTitles.length > 0) {
    console.log("NotFound items:", remainTitles)
  }
}
