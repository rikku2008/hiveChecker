import { fetchStats } from "./api"

export const getAvatarElements = () => {
  const els = document.querySelectorAll<HTMLLIElement>(
    ".extension-avatar-description-wrapper strong"
  )
  return Array.from(els)
}

const correctNamePatch = [
  { imgName: "wars-crown.png", correctName: "crown" },
  { imgName: "ctf-crown.png", correctName: "the crown" },
  { imgName: "costume-royal.png", correctName: "royal crown" },
  { imgName: "bed-magical-merchant.png", correctName: "magical merchant" },
  { imgName: "costume-snowy-dragon.png", correctName: "snowy dragon" },
  { imgName: "costume-pumpkin-paladin.png", correctName: "cursed pumpkin" },
  { imgName: "costume-trader-llama.png", correctName: "trader llama" }
]

export const fetchAvatar = async (gamertag: string) => {
  const { data, error } = await fetchStats(gamertag)
  if (error) {
    return { ownedAvatars: [], error }
  }

  const ownedAvatars = data.player.owned_cosmetics.avatar
    .map((avatar: { name: string; url: string }) => {
      let name = avatar.name.toLowerCase().trim()
      const patch = correctNamePatch.find((c) => avatar.url.includes(c.imgName))
      if (patch) name = patch.correctName
      return name
    })
    .filter((name) => {
      const anotherTypeUnlocks = [
        "red panda buddy",
        "sculk wings",
        "galaxy wings (backbling)"
      ]
      return !anotherTypeUnlocks.includes(name)
    })

  return { ownedAvatars, error }
}

export const filterAvatar = (
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
