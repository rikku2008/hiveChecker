import { fetchStats } from "./api"

export const getTitleElements = () => {
  const titleElements = document.querySelectorAll(
    'span[style="background-color: #222222"]'
  )

  return Array.from(titleElements) as HTMLSpanElement[]
}

export const fetchTitles = async (gamertag: string) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedTitles: [], error }
  }
  const ownedTitles = data.player.owned_cosmetics.hub_title.map((t) =>
    t
      .replace(/[\u{E000}-\u{F8FF}]/gu, "") // emoji
      .replace(/&([0-9a-z])/g, "") // colorcodes
      .replace(/\(\)/g, "x") // replace ()
      .replace(/\(\?\)/g, "x") // replace (?)
      .replace(/#\d+/g, "#x") // replace #number
      .toLowerCase()
      .replace(/lvl \d+/g, "lvl x") // replace lvl x
      .replace(/x winrate/g, "x% winrate") // replace x winrate
      .replace(/\d+ year/g, "x year") // replace x year
      .trim()
  )
  return { ownedTitles, error }
}

const checkmarkClass = "hub-title-checkmark"
const checkmarkStyle = `color: inherit; font-size: 16px; margin-left: 8px; font-weight: bold;`
export const resetCheckmarks = () => {
  document
    .querySelectorAll(`.${checkmarkClass}`)
    .forEach((mark) => mark.remove())
}

export const addCheckmarks = (
  els: HTMLSpanElement[],
  ownedTitles: string[]
) => {
  const remainTitles = [...ownedTitles]

  for (const el of els) {
    const titleName = el.textContent?.toLowerCase().replace(/\s+/g, " ").trim()
    if (!titleName) continue

    const findIndex = remainTitles.indexOf(titleName)
    const isOwned = findIndex !== -1

    if (isOwned) {
      remainTitles.splice(findIndex, 1)
    }

    const mark = document.createElement("span")
    mark.className = checkmarkClass
    mark.style.cssText = checkmarkStyle
    mark.innerHTML = isOwned ? " ✅" : " ❌"
    el.appendChild(mark)
  }

  if (remainTitles.length > 0) {
    console.log("NotFound titles:", remainTitles)
  }
}

export const filterCheckmarks = (
  els: HTMLSpanElement[],
  type: "All" | "Owned" | "Unowned"
) => {
  els.forEach((element) => {
    const parentP = element.closest("p")
    if (!parentP) return

    const nextElement = parentP.nextElementSibling as HTMLBRElement
    const isBr = nextElement && nextElement.tagName.toLowerCase() === "br"

    const checkmark = element.querySelector(".hub-title-checkmark")
    const isOwned = checkmark && checkmark.innerHTML.includes("✅")

    switch (type) {
      case "All":
        parentP.style.display = "inline"
        if (isBr) nextElement.style.display = "inline"
        break
      case "Owned":
        if (isOwned) {
          parentP.style.display = "inline"
          if (isBr) nextElement.style.display = "inline"
        } else {
          parentP.style.display = "none"
          if (isBr) nextElement.style.display = "none"
        }
        break
      case "Unowned":
        if (!isOwned) {
          parentP.style.display = "inline"
          if (isBr) nextElement.style.display = "inline"
        } else {
          parentP.style.display = "none"
          if (isBr) nextElement.style.display = "none"
        }
        break
    }
  })
}
