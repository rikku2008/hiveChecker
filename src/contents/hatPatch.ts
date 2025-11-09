import type { PlasmoCSConfig } from "plasmo"

import { getUnlockElements } from "~lib/commonUnlock"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/hats*"],
  all_frames: true
}

type Diff = { old: string; new: string }
const diffs: Diff[] = [
  {
    old: "Dr Zuk's Goggles",
    new: "Dr. Zuk's Goggles"
  },
  {
    old: "Creeper Mascot Head",
    new: "Creeper Mascot Hat"
  },
  {
    old: "Teddy Buddy",
    new: "Teddy Buddy Hat"
  }
]

const applyTitleDiffs = (costumeElements: HTMLElement[]): void => {
  costumeElements.forEach((element) => {
    const diff = diffs.find((d) => element.innerHTML.includes(d.old))
    if (diff) {
      element.innerHTML = element.innerHTML.replace(diff.old, diff.new)
    }
  })
}

const initPatch = (): void => {
  const costumeElements = getUnlockElements()
  applyTitleDiffs(costumeElements)
}

window.addEventListener("load", initPatch)
