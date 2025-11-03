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
  { month: "October 2025", name: "Skull Mage", qp: 500 }
]

const overlayCostume = (costumeElements, costumes) => {
  // style
  const style = document.createElement("style")
  style.textContent = `
    .checkerOverlay {
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 350px;
      height: 300px;
      padding: 20px;
      border-radius: 12px;
      color: white;
      font-size: 14px;
      line-height: 1.5;
      background: #000;
      color: white;
      z-index: 9999;
    }
    #checkBtn {
      padding: 0 16px;
      border: none;
      border-radius: 6px;
      background: ${Colors.success};
      color: #333;
      cursor: pointer;        
    }
    .filterBtn {
      padding: 6px 16px;
      border: none;
      border-radius: 6px;
      background: ${Colors.white};
      color: #333;
      cursor: pointer;
    }
  `
  document.head.appendChild(style)

  const overlayDiv = document.createElement("div")
  overlayDiv.className = "checkerOverlay"

  overlayDiv.innerHTML = `
    <div style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">🎮 Costume Checker</div>
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 13px;">👤 Player Name:</label>
      <div style="display: flex; gap: 8px;">
        <input 
          type="text" 
          id="playerInput" 
          placeholder="Enter player name..." 
          style="
            background: rgba(255, 255, 255, 0.9);
            margin-bottom: 0;
          "
        />
        <button id="checkBtn">Check</button>
      </div>
    </div>
    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px; font-size: 13px;">🔍 Filter:</label>
      <div style="display: flex; gap: 8px;">
        <button id="filter1" class="filterBtn">All</button>
        <button id="filter2" class="filterBtn">Owned</button>
        <button id="filter3" class="filterBtn">Unowned</button>
      </div>
    </div>
    <div id="statusText"></div>
  `

  document.body.appendChild(overlayDiv)

  const playerInput = document.getElementById("playerInput")
  const checkButton = document.getElementById("checkBtn")
  const statusText = document.getElementById("statusText")
  const filter1Button = document.getElementById("filter1")
  const filter2Button = document.getElementById("filter2")
  const filter3Button = document.getElementById("filter3")

  const checkPlayer = async () => {
    const playerName = playerInput.value.trim()
    if (!playerName) {
      statusText.innerHTML = `<span style="color: ${Colors.error};">Please enter a player name</span>`
      return
    }

    // reset
    document
      .querySelectorAll(".costume-checkmark")
      .forEach((mark) => mark.remove())

    statusText.innerHTML = `<span style="color: ${Colors.warning};">Checking...</span>`

    try {
      const ownedCostumes = await fetchCostumes(playerName)
      addCheckmarksToOwnedCostumes(costumeElements, costumes, ownedCostumes)
      statusText.innerHTML = `<span style="color: ${Colors.success};">Complete</span>`
      filter1Button.innerText = `All (${costumes.length})`
      filter2Button.innerText = `Owned (${ownedCostumes.length})`
      filter3Button.innerText = `Unowned (${
        costumes.length - ownedCostumes.length
      })`
    } catch (error) {
      statusText.innerHTML = `<span style="color: ${Colors.error};">Unable to fetch ${playerName}'s costume.</span>`
    }
    filterCostumes("all")
  }

  const filterCostumes = (filterType) => {
    costumeElements.forEach((element, index) => {
      const parent = element.closest("li")
      const isOwned = parent.innerHTML.includes("✅")

      switch (filterType) {
        case "all":
          parent.style.display = "list-item"
          break
        case "owned":
          parent.style.display = isOwned ? "list-item" : "none"
          break
        case "unowned":
          parent.style.display = !isOwned ? "list-item" : "none"
          break
      }
    })
  }

  checkButton.addEventListener("click", checkPlayer)
  filter1Button.addEventListener("click", () => filterCostumes("all"))
  filter2Button.addEventListener("click", () => filterCostumes("owned"))
  filter3Button.addEventListener("click", () => filterCostumes("unowned"))
}

const cPatch = () => {
  // QP Costumes
  const qpCostumeHeader = document.querySelectorAll("#quest-store-costumes")[0]
  const currentCostumeElement =
    qpCostumeHeader.nextElementSibling.nextElementSibling
  currentCostumeElement.nextElementSibling.remove()
  currentCostumeElement.remove()

  const ulElement = document.createElement("ul")

  for (let item of questCostumes) {
    const liElement = document.createElement("li")
    liElement.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.month} (${item.qp} QP)</span>`
    ulElement.appendChild(liElement)
  }
  qpCostumeHeader.nextElementSibling.appendChild(ulElement)

  // Unlockable Costumes

  const unlockableCostumes = [
    {
      name: "Anomaly Explorer",
      description: "Secret costume in Murder Mystery Backrooms"
    }
  ]

  const uCostumeHeader = document.querySelectorAll("#unlockable-costumes")[0]
  const ulElement2 = uCostumeHeader.nextElementSibling.nextSibling

  for (let item of unlockableCostumes) {
    const liElement = document.createElement("li")
    liElement.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.description}</span>`
    ulElement2.appendChild(liElement)
  }

  // unobtainable Costumes
  const unobtainableCostumes = [
    {
      name: "Lunar Snake",
      description: "Awarded for completing the Lunar New Year 2025 hub hunt."
    }
  ]

  const uoCostumeHeader = document.querySelectorAll("#unobtainable-costumes")[0]
  const ulElement3 = uoCostumeHeader.nextElementSibling.nextSibling

  for (let item of unobtainableCostumes) {
    const liElement = document.createElement("li")
    liElement.innerHTML = `<b><strong style="white-space: pre-wrap;">${item.name}: </strong></b><span style="white-space: pre-wrap;">${item.description}</span>`
    ulElement3.appendChild(liElement)
  }
}

const allCostumes = () => {
  const listParent = document.querySelector(".post-content")
  const liQuerySelector = listParent.querySelectorAll("li")
  const costumeElements = []
  for (let li of liQuerySelector) {
    const strongEl = li.querySelector("strong")
    costumeElements.push(strongEl || li)
  }
  const costumes = [...costumeElements].map((el) =>
    el.textContent.trim().replace(/\s+/g, " ").replace(":", "").toLowerCase()
  )

  return { costumeElements, costumes }
}

const addCheckmarksToOwnedCostumes = (
  costumeElements,
  costumes,
  ownedCostumes
) => {
  let count = 0
  for (let [index, element] of costumeElements.entries()) {
    const costumeName = costumes[index]

    if (element.querySelector(".costume-checkmark")) {
      return
    }

    let mark

    if (ownedCostumes.includes(costumeName)) {
      count++
      mark = document.createElement("span")
      mark.className = "costume-checkmark"
      mark.innerHTML = " ✅"
    } else {
      mark = document.createElement("span")
      mark.className = "costume-checkmark"
      mark.innerHTML = " ❌"
    }
    element.insertBefore(mark, element.firstChild)
  }

  const notFoundCostumes = ownedCostumes.filter(
    (item) => !costumes.includes(item)
  )
  if (notFoundCostumes.length > 0) {
    console.log("NotFound costumes:", notFoundCostumes)
  }
}

const fetchCostumes = async (player) => {
  const res = await fetch(`https://api.playhive.com/v0/game/all/main/${player}`)

  if (res.status !== 200) {
    return []
  }

  const data = await res.json()
  return data.main.costume_unlocked.map(
    (costume) =>
      costume
        .toLowerCase()
        .trim()
        .replace(":", "")
        .replace("sorcerer", "sorceror") // align with Hive support
        .replace("winter owl (forest animals)", "winter owl") // align with Hive support
        .replace("ice golem (grumpus tale)", "ice golem") // align with Hive support
        .replace("gladiator creeper", "creeper gladiator") // align with Hive support
        .replace("meerket ranger", "meerkat ranger") // typo in Hive support
  )
}

if (window.location.href === "https://support.playhive.com/costumes/") {
  cPatch()
  const { costumeElements, costumes } = allCostumes()
  overlayCostume(costumeElements, costumes)
}
