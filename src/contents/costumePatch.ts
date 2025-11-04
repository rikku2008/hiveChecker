import type { PlasmoCSConfig } from "plasmo"

import { getCostumeElements } from "~lib/costume"
import { getTitleElements } from "~lib/hubtitle"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/costumes*"],
  all_frames: true
}

const questCostumes = [
  { month: "October/November 2019", name: "Rubber Ducky", qp: 1000 },
  { month: "December 2019", name: "Gingerbread Man", qp: 999 },
  { month: "January 2020", name: "Winter Ferret", qp: 1000 },
  { month: "February 2020", name: "Toxic", qp: 1000 },
  { month: "March 2020", name: "Neon Tiger", qp: 1000 },
  { month: "April 2020", name: "The Secretary", qp: 1000 },
  { month: "May 2020", name: "Cheeky Monkey", qp: 1000 },
  { month: "June 2020", name: "Hammy the Hamster", qp: 1000 },
  { month: "July 2020", name: "Pinchy", qp: 1000 },
  { month: "August 2020", name: "Sentai", qp: 500 },
  { month: "September 2020", name: "Fish in a Suit", qp: 500 },
  { month: "October 2020", name: "Al The Alien", qp: 500 },
  { month: "November 2020", name: "Ghoul Bandit", qp: 500 },
  { month: "December 2020", name: "Whippy", qp: 501 },
  { month: "January 2021", name: "Minotaur", qp: 500 },
  // Hive support saying Battle Bean, but api saying battle bean**s**
  { month: "February 2021", name: "Battle Beans", qp: 500 },
  { month: "March 2021", name: "Baguette", qp: 1000 },
  { month: "April 2021", name: "Flippy", qp: 1000 },
  { month: "May 2021", name: "Rocky", qp: 500 },
  { month: "June 2021", name: "Pizza Box", qp: 400 },
  { month: "July 2021", name: "Mailbot", qp: 400 },
  { month: "August 2021", name: "Moobloom", qp: 500 },
  { month: "September 2021", name: "Flompa", qp: 500 },
  { month: "October 2021", name: "Business Pumpkin", qp: 500 },
  { month: "November 2021", name: "Buff Doge", qp: 500 },
  { month: "December 2021", name: "Present Head", qp: 500 },
  { month: "January 2022", name: "Soda Can", qp: 500 },
  { month: "February 2022", name: "Heart Teddy", qp: 500 },
  { month: "March 2022", name: "Snailly", qp: 500 },
  { month: "April 2022", name: "Moai", qp: 500 },
  { month: "May 2022", name: "Moss Knight", qp: 500 },
  { month: "June 2022", name: "Toucan", qp: 500 },
  { month: "July 2022", name: "Summer Skelly", qp: 500 },
  { month: "August 2022", name: "The Warden", qp: 500 },
  { month: "September 2022", name: "Treasure Goblin", qp: 500 },
  { month: "October 2022", name: "Pumpkin Farmer", qp: 500 },
  { month: "November 2022", name: "Gobbles", qp: 500 },
  { month: "December 2022", name: "Ugly Sweater Bee", qp: 500 },
  { month: "January 2023", name: "Hot Cocoa", qp: 500 },
  { month: "February 2023", name: "Heart Hoodie", qp: 500 },
  { month: "March 2023", name: "Stinky", qp: 500 },
  { month: "April 2023", name: "Drowned", qp: 500 },
  { month: "May 2023", name: "Sandstorm", qp: 500 },
  { month: "June 2023", name: "Business Monkey", qp: 500 },
  { month: "July 2023", name: "Straw Barry", qp: 500 },
  { month: "August 2023", name: "Robo Hammy", qp: 500 },
  { month: "September 2023", name: "Burrito Buddy", qp: 500 },
  { month: "October 2023", name: "Spectral Seafarer", qp: 500 },
  { month: "November 2023", name: "Enchanter", qp: 500 },
  { month: "December 2023", name: "Rubber Chicken", qp: 500 },
  { month: "January 2024", name: "Red Bot", qp: 500 },
  { month: "February 2024", name: "Runic Golem", qp: 500 },
  { month: "March 2024", name: "Hopper", qp: 500 },
  { month: "April 2024", name: "Richard", qp: 500 },
  { month: "May 2024", name: "Corn Dog", qp: 500 },
  { month: "June 2024", name: "Buff Axolotl", qp: 500 },
  { month: "July 2024", name: "Battle Gnome", qp: 500 },
  { month: "August 2024", name: "Dragon Fruit", qp: 500 },
  { month: "September 2024", name: "Pumpkin Spice", qp: 500 },
  { month: "October 2024", name: "Mimic", qp: 500 },
  { month: "November 2024", name: "Ram", qp: 500 },
  { month: "December 2024", name: "Arctic Fox", qp: 500 },
  { month: "January 2025", name: "Copper Golem", qp: 500 },
  { month: "February 2025", name: "Heartolotl", qp: 500 },
  { month: "March 2025", name: "Bee Plush", qp: 500 },
  { month: "April 2025", name: "Sea Bandit", qp: 500 },
  { month: "May 2025", name: "Luna Spirit", qp: 500 },
  { month: "June 2025", name: "Cat Musketeer", qp: 500 },
  { month: "July 2025", name: "Sandstone", qp: 500 },
  // Hive support saying Spartan Warrior, but api saying spartan wraith
  { month: "August 2025", name: "Spartan Wraith", qp: 500 },
  { month: "September 2025", name: "Toxic Meltdown", qp: 500 },
  { month: "October 2025", name: "Skull Mage", qp: 500 },
  { month: "November 2025", name: "Amethyst", qp: 500 }
]

const unlockableCostumes = [
  {
    name: "Anomaly Explorer",
    description: "Secret costume in Murder Mystery Backrooms"
  }
]

const unobtainableCostumes = [
  {
    name: "Lunar Snake",
    description: "Awarded for completing the Lunar New Year 2025 hub hunt."
  }
]

const diffs = [
  {
    old: "Sorceror",
    new: "Sorcerer"
  },
  {
    old: "Winter Owl",
    new: "Winter Owl (Forest Animals)"
  },
  {
    old: "Ice Golem",
    new: "Ice Golem (Grumpus Tale)"
  },
  {
    old: "Creeper Gladiator",
    new: "Gladiator Creeper"
  },
  {
    old: "Meerkat Ranger",
    new: "Meerket Ranger"
  }
]

const addQuestCostumes = () => {
  const qpCostumeHeader = document.querySelectorAll("#quest-store-costumes")[0]
  const currentCostumeElement =
    qpCostumeHeader.nextElementSibling.nextElementSibling
  currentCostumeElement.nextElementSibling.remove()
  currentCostumeElement.remove()

  const ul = document.createElement("ul")

  for (let item of questCostumes) {
    const li = document.createElement("li")
    li.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.month} (${item.qp} QP)</span>`
    ul.appendChild(li)
  }
  qpCostumeHeader.nextElementSibling.appendChild(ul)
}

const addUnlockableCostumes = () => {
  const uCostumeHeader = document.querySelectorAll("#unlockable-costumes")[0]
  const ul = uCostumeHeader.nextElementSibling.nextSibling

  for (let item of unlockableCostumes) {
    const li = document.createElement("li")
    li.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.description}</span>`
    ul.appendChild(li)
  }
}

const addUnObtainableCostumes = () => {
  const uoCostumeHeader = document.querySelectorAll("#unobtainable-costumes")[0]
  const ul = uoCostumeHeader.nextElementSibling.nextSibling

  for (let item of unobtainableCostumes) {
    const li = document.createElement("li")
    li.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.description}</span>`
    ul.appendChild(li)
  }
}

const applyTitleDiffs = (costumeElements: HTMLElement[]): void => {
  costumeElements.forEach((element) => {
    const diff = diffs.find((d) => element.innerHTML.includes(d.old))
    if (diff) {
      element.innerHTML = element.innerHTML.replace(diff.old, diff.new)
    }
  })
}

const initPatch = (): void => {
  const costumeElements = getCostumeElements()
  addQuestCostumes()
  addUnlockableCostumes()
  addUnObtainableCostumes()
  applyTitleDiffs(costumeElements)
}

window.addEventListener("load", initPatch)
