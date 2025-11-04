import type { PlasmoCSConfig } from "plasmo"

import { getTitleElements } from "~lib/hubtitle"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/hub-titles*"],
  all_frames: true
}

const unListed = [
  {
    display:
      '<span style="background-color: #222222"><font color="55FFFF">New Year </font><font color="FFAA00">New Golem</font></span>',
    description:
      "Obtained by purchasing the Copper Golem costume from the Quest Store (January 2025)."
  }
]

const diffs = [
  {
    // The Sorceror -> The Sorcerer
    old: `The Sorceror`,
    new: `The Sorcerer`
  },
  {
    // Eat. Play. Sleep. -> Eat. Sleep. Play.
    old: `<font color="D460FF">Eat. </font><font color="50ABFF">Play. </font><font color="FFFFFF">Sleep.</font>`,
    new: `<font color="D460FF">Eat. </font><font color="FFFFFF">Sleep. </font><font color="50ABFF">Play. </font>`
  },
  {
    // Void is a Myth -> The Void is a Myth
    old: `<font color="AAAAAA">Void </font><font color="D4D4D4">is </font><font color="AAAAAA">a </font><font color="D4D4D4">Myth</font>`,
    new: `<font color="AAAAAA">The </font><font color="D4D4D4">Void </font><font color="AAAAAA">is a </font><font color="D4D4D4">Myth</font>`
  },
  {
    // FROM THE FLAME -> FROM THE FLAMES!
    old: `<font color="FF5555">FROM </font><font color="FFAA00">THE </font><font color="FFFF55">FLAMES</font>`,
    new: `<font color="FF5555">FROM </font><font color="FFAA00">THE </font><font color="FFFF55">FLAMES!</font>`
  },
  {
    // 100 Pure Gold -> 100% Pure Gold
    old: "100 Pure Gold",
    new: "100% Pure Gold"
  },
  {
    // YEET! -> YEET
    old: `<font color="5555FF">YEET!</font>`,
    new: `<font color="5555FF">YEET</font>`
  }
]

const applyTitleDiffs = (titleElements: HTMLSpanElement[]): void => {
  titleElements.forEach((element) => {
    const diff = diffs.find((d) => element.innerHTML.includes(d.old))
    if (diff) {
      element.innerHTML = element.innerHTML.replace(diff.old, diff.new)
    }
  })
}

/**
 * 未掲載のタイトルを追加
 */
const addUnlistedTitles = (): void => {
  const hrElements = document.querySelectorAll(".post-content hr")
  const parent = hrElements[hrElements.length - 1]

  if (!parent) {
    console.warn("Unable to add unlisted titles: parent element not found.")
    return
  }

  for (const title of unListed) {
    const p = document.createElement("p")
    p.innerHTML = `${title.display} - ${title.description}<br>`
    p.style.display = "inline"
    parent.before(p)
  }
}

const initPatch = (): void => {
  const titleElements = getTitleElements()
  applyTitleDiffs(titleElements)
  addUnlistedTitles()
}

window.addEventListener("load", initPatch)
