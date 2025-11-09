import { fetchStats } from "./api"

export const getBackblingElements = () => {
  const els = document.querySelectorAll<HTMLElement>(
    ".description strong:first-of-type"
  )
  return Array.from(els)
}

export const fetchBackbling = async (gamertag: string) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedBackblings: [], error }
  }

  const ownedBackblings = data.player.owned_cosmetics.backbling.map((item) =>
    item.name.toLowerCase().trim()
  )

  return { ownedBackblings, error }
}

export const filterBackbling = (
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
