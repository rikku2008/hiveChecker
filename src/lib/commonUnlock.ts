// For hat, backbling, pet, mount

import { fetchStats } from "./api"

export const getUnlockElements = () => {
  const els = document.querySelectorAll<HTMLElement>(
    ".description strong:first-of-type"
  )
  return Array.from(els)
}

export const fetchUnlock = async (
  gamertag: string,
  mode: "hat" | "backbling" | "pet" | "mount"
) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedUnlocks: [], error }
  }

  const ownedHats = data.player.owned_cosmetics.hat.map((item) =>
    item.name.toLowerCase().trim()
  )

  const ownedBackblings = data.player.owned_cosmetics.backbling.map((item) =>
    item.name.toLowerCase().trim()
  )

  const ownedPets = data.player.owned_cosmetics.pet.map((item) =>
    item.toLowerCase().trim()
  )

  const ownedMounts = data.player.owned_cosmetics.mount.map((item) =>
    item.toLowerCase().trim()
  )

  switch (mode) {
    case "hat":
      return { ownedUnlocks: ownedHats, error }
    case "backbling":
      return { ownedUnlocks: ownedBackblings, error }
    case "pet":
      return { ownedUnlocks: ownedPets, error }
    case "mount":
      return { ownedUnlocks: ownedMounts, error }
  }
}

export const filterUnlock = (
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
