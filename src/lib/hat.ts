import { fetchStats } from "./api"

export const getHatElements = () => {
  const els = document.querySelectorAll<HTMLElement>(
    ".description strong:first-of-type"
  )
  return Array.from(els)
}

export const fetchHat = async (gamertag: string) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedHats: [], error }
  }

  const ownedHats = data.player.owned_cosmetics.hat.map((item) =>
    item.name.toLowerCase().trim()
  )

  return { ownedHats, error }
}

export const filterHat = (
  els: HTMLElement[],
  type: "All" | "Owned" | "Unowned"
) => {
  for (const el of els) {
    const parent = el.parentElement?.parentElement
    if (!parent) continue
    const isOwned = parent.innerHTML.includes("✅")

    switch (type) {
      case "All":
        parent.style.display = "flex"
        break
      case "Owned":
        parent.style.display = isOwned ? "flex" : "none"
        break
      case "Unowned":
        parent.style.display = !isOwned ? "flex" : "none"
        break
    }
  }
}
