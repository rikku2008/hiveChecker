import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/avatars*"],
  all_frames: true
}

// Also fix available in ./lib/avatar.ts
type Diff = { old: string; new: string }
const diffs: Diff[] = [
  { old: "Shocked Pumpkin", new: "Shocked Pumpkin (H19)" },
  { old: "Dabbing Witch", new: "Dabbing Witch (H19)" },
  { old: "Dabbing Zombie", new: "Dabbing Zombie (H19)" },
  { old: "Boo!", new: "Boo! (H20)" },
  { old: "Night Bird", new: "Night Bird (H20)" },
  { old: "Mr. Pumpkin", new: "Mr Pumpkin (H20)" },
  { old: "Trick or Dog Treat?", new: "Trick or Dog Treat? (H20)" },
  { old: "Oinky", new: "Oinky (Hive+)" },
  { old: "Hopper", new: "Hopper (Hive+)" },
  { old: "Quackers", new: "Quackers (Hive+)" },
  { old: "Moorisson", new: "Moorisson (Hive+)" },
  { old: "Spirit's Treat", new: "Sprit's Treat" },
  { old: "Axolotl", new: "Axolotl Mount" },
  { old: "Found You", new: "Found You!" },
  { old: "Frozen Banana", new: "Frozen Fruit" },
  { old: "Supply Drop", new: "Supply Drop!" },
  { old: "Game Over", new: "Game Over!" },
  { old: "Bridge", new: "The Bridge" },
  { old: "Halloween Witch", new: "Witch" },
  { old: "Captain Blackbeard", new: "Blackbeard" },
  { old: "Vibing Axolotl Mount", new: "Vibing Axolotl" },
  { old: "Magic Axolotl Mount", new: "Magic Axolotl" },
  { old: "The Doomsday Monster", new: "Doomsday Monster" },
  { old: "Gold Medal", new: "Strongman" },
  { old: "Parkour Runner", new: "Runner" },
  { old: "Widdle Bwanana", new: "Wittle Bwanana" },
  { old: "Widdle Pwiggy", new: "Wittle Pwiggy" },
  { old: "Capybara", new: "Capybara Pet" },
  { old: "Ghosty", new: "Ghosty Pet" },
  { old: "Baby Unicorn", new: "Baby Unicorn (Pet)" },
  { old: "Starship", new: "Starship Mount" },
  { old: "Happy Ghast", new: "Happy Ghast (Pet)" },
  { old: "Dragon Eye", new: "Dragon" },
  { old: "Knight", new: "The Knight" },
  { old: "Pink Bear", new: "Cupids Bear" },
  { old: "Wolf", new: "The Wolf" },
  { old: "Cute Donut", new: "Donut" },
  { old: "Reindeer", new: "Xmas 2018 - Reindeer" },
  { old: "Snowman", new: "Xmas 2018 - Snowman" },
  { old: "Cute Dolphin", new: "Dolphin" },
  { old: "Adorable Cactus", new: "Cute Cactus" }
]

const missingAvatars: string[] = [
  `<img style="padding: 0 15px; float: left;" src="https://cdn.playhive.com/avatars/winters-wrath.png" alt="Winter's Wrath" class="medium-zoom-image"><div class="extension-avatar-description-wrapper"><strong>Winter's Wrath</strong><br>Obtained by purchasing the Winter Ticket 2024.</div>`,
  `<img style="padding: 0 15px; float: left;" src="https://cdn.playhive.com/avatars/mjolnir.png" alt="mjölnir" class="medium-zoom-image"><div class="extension-avatar-description-wrapper"><strong>Mjölnir</strong><br>Obtained by purchasing the Winter Ticket 2024.</div>`
]

const fixAvatarDisplay = (): void => {
  document.querySelectorAll("br").forEach((br) => br.remove())

  const parent = document.querySelector(".post-content")
  if (!parent) return

  const images = document.querySelectorAll<HTMLImageElement>(
    ".single-post-wrap .post-content img"
  )
  images.forEach((img) => {
    img.style.float = "none"

    const next1 = img.nextElementSibling
    const next2 = next1?.nextSibling
    const next3 = next2?.nextSibling
    const next4 = next3?.nextSibling

    const wrapper = document.createElement("div")
    const descriptionWrapper = document.createElement("div")
    wrapper.classList.add("extension-avatar-wrapper")
    descriptionWrapper.classList.add("extension-avatar-description-wrapper")
    parent.insertBefore(wrapper, img)

    wrapper.appendChild(img)
    wrapper.appendChild(descriptionWrapper)
    if (next1) {
      const diff = diffs.find((d) => next1.textContent === d.old)
      if (diff) {
        next1.textContent = diff.new
      }
      if (img.src.includes("ctf-crown.png")) {
        next1.textContent = "The Crown"
      }
      if (img.src.includes("wars-crown.png")) {
        next1.textContent = "Crown"
      }
      if (img.src.includes("costume-royal.png")) {
        next1.textContent = "Royal Crown"
      }
      if (img.src.includes("pet-chicken-jockey.png")) {
        next1.textContent = "Chicken Jockey (Pet)"
      }
      if (img.src.includes("mount-chicken-jockey.png")) {
        next1.textContent = "Chicken Jockey (Mount)"
      }
      if (img.src.includes("halloween-dab-skeleton.png")) {
        next1.textContent = "Dabbing Skeleton (H19)"
      }

      descriptionWrapper.appendChild(next1)
      descriptionWrapper.appendChild(document.createElement("br"))
    }
    if (next2) descriptionWrapper.appendChild(next2)
    if (next3 instanceof HTMLAnchorElement) {
      descriptionWrapper.appendChild(next3)
      if (next4) descriptionWrapper.appendChild(next4)
    }
  })

  const style = document.createElement("style")
  style.textContent = `
    .extension-avatar-wrapper {
      display: flex;
      margin-top: 14px;
      margin-bottom: 2px;
    }
    .medium-zoom--opened .extension-avatar-wrapper img {
      visibility: hidden;
    }
    .extension-avatar-wrapper img {
      width: auto;
      height: 100% !important;
    }
    .extension-avatar-description-wrapper {
      overflow: hidden;
      line-height: 1.5;
    }
  `
  document.head.appendChild(style)
}

const addMissingAvatars = (): void => {
  const hrElements = document.querySelectorAll(".post-content hr")
  const parent = hrElements[hrElements.length - 1]
  if (!parent) {
    console.warn("Unable to add unlisted titles: parent element not found.")
    return
  }

  for (const avatarHTML of missingAvatars) {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = avatarHTML
    wrapper.classList.add("extension-avatar-wrapper")
    parent.before(wrapper)
  }
}

const initPatch = (): void => {
  fixAvatarDisplay()
  addMissingAvatars()
}

window.addEventListener("load", initPatch)
