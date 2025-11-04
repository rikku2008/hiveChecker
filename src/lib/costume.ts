import { fetchStats } from "./api"

export const getCostumeElements = () => {
  const listParent = document.querySelector(".post-content")
  const liQuerySelector = listParent.querySelectorAll<HTMLLIElement>("li")
  const costumeElements = []
  for (let li of liQuerySelector) {
    const strongEl = li.querySelector<HTMLElement>("strong")
    costumeElements.push(strongEl || li)
  }
  return costumeElements
}

export const fetchCostumes = async (gamertag: string) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedCostumes: [], error }
  }

  const ownedCostumes = data.player.owned_cosmetics.costume.map((costume) =>
    costume.toLowerCase().replaceAll(":", "").trim()
  )

  return { ownedCostumes, error }
}

export const filterCostume = (
  els: HTMLElement[],
  type: "All" | "Owned" | "Unowned"
) => {
  for (const el of els) {
    const parent = el.closest("li")
    const isOwned = parent.innerHTML.includes("✅")

    switch (type) {
      case "All":
        parent.style.display = "list-item"
        break
      case "Owned":
        parent.style.display = isOwned ? "list-item" : "none"
        break
      case "Unowned":
        parent.style.display = !isOwned ? "list-item" : "none"
        break
    }
  }
}
