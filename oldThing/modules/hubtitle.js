const overlayHubtitle = (titleElements, titles) => {
  // style
  const style = document.createElement("style");
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
  `;
  document.head.appendChild(style);

  const overlayDiv = document.createElement("div");
  overlayDiv.className = "checkerOverlay";

  overlayDiv.innerHTML = `
    <div style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">🎮 Hubtitle Checker</div>
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
  `;

  document.body.appendChild(overlayDiv);

  const playerInput = document.getElementById("playerInput");
  const checkButton = document.getElementById("checkBtn");
  const statusText = document.getElementById("statusText");
  const filter1Button = document.getElementById("filter1");
  const filter2Button = document.getElementById("filter2");
  const filter3Button = document.getElementById("filter3");

  const checkPlayer = async () => {
    const playerName = playerInput.value.trim();
    if (!playerName) {
      statusText.innerHTML = `<span style="color: ${Colors.error};">Please enter a player name</span>`;
      return;
    }

    // reset
    document
      .querySelectorAll(".hub-title-checkmark")
      .forEach((mark) => mark.remove());

    statusText.innerHTML = `<span style="color: ${Colors.warning};">Checking...</span>`;

    try {
      const ownedTitles = await fetchHubTitles(playerName);
      addCheckmarksToOwnedTitles(titleElements, titles, ownedTitles);
      statusText.innerHTML = `<span style="color: ${Colors.success};">Complete</span>`;
      filter1Button.innerText = `All (${titles.length})`;
      filter2Button.innerText = `Owned (${ownedTitles.length})`;
      filter3Button.innerText = `Unowned (${
        titles.length - ownedTitles.length
      })`;
    } catch (error) {
      statusText.innerHTML = `<span style="color: ${Colors.error};">Unable to fetch ${playerName}'s hubtitle.</span>`;
    }
    filterTitles("all");
  };

  const filterTitles = (filterType) => {
    titleElements.forEach((element, index) => {
      const parentP = element.closest("p");
      if (!parentP) return;

      const nextElement = parentP.nextElementSibling;
      const isBr = nextElement && nextElement.tagName.toLowerCase() === "br";

      const checkmark = element.querySelector(".hub-title-checkmark");
      const isOwned = checkmark && checkmark.innerHTML.includes("✅");

      switch (filterType) {
        case "all":
          parentP.style.display = "inline";
          if (isBr) nextElement.style.display = "inline";
          break;
        case "owned":
          if (isOwned) {
            parentP.style.display = "inline";
            if (isBr) nextElement.style.display = "inline";
          } else {
            parentP.style.display = "none";
            if (isBr) nextElement.style.display = "none";
          }
          break;
        case "unowned":
          if (!isOwned) {
            parentP.style.display = "inline";
            if (isBr) nextElement.style.display = "inline";
          } else {
            parentP.style.display = "none";
            if (isBr) nextElement.style.display = "none";
          }
          break;
      }
    });
  };

  checkButton.addEventListener("click", checkPlayer);
  filter1Button.addEventListener("click", () => filterTitles("all"));
  filter2Button.addEventListener("click", () => filterTitles("owned"));
  filter3Button.addEventListener("click", () => filterTitles("unowned"));
};

const hPatch = () => {
  const hrElements = document.querySelectorAll(".post-content hr");
  const parent = hrElements[hrElements.length - 1];
  const unListedHubTitles = [
    {
      display:
        '<span style="background-color: #222222"><font color="55FFFF">New Year </font><font color="FFAA00">New Golem</font></span>',
      description:
        "Obtained by purchasing the Copper Golem costume from the Quest Store (January 2025).",
    },
  ];

  for (let title of unListedHubTitles) {
    const p = document.createElement("p");
    p.innerHTML = `${title.display} - ${title.description}<br>`;
    p.style.display = "inline";
    parent.before(p);
  }
};

const allHubTitles = () => {
  const titleElements = document.querySelectorAll(
    '[style="background-color: #222222"]'
  );
  const titles = [...titleElements].map((el) =>
    el.textContent.trim().replace(/\s+/g, " ").toLowerCase()
  );
  return { titleElements, titles };
};

const addCheckmarksToOwnedTitles = (titleElements, titles, ownedTitles) => {
  let count = 0;
  for (let [index, element] of titleElements.entries()) {
    const titleName = titles[index];

    if (element.querySelector(".hub-title-checkmark")) {
      return;
    }

    let mark;

    if (ownedTitles.includes(titleName)) {
      count++;
      mark = document.createElement("span");
      mark.className = "hub-title-checkmark";
      mark.innerHTML = " ✅";
      mark.style.cssText = `
        color: #00ff00;
        font-size: 16px;
        margin-left: 8px;
        font-weight: bold;
      `;
    } else {
      mark = document.createElement("span");
      mark.className = "hub-title-checkmark";
      mark.innerHTML = " ❌";
      mark.style.cssText = `
        color: #ff0000;
        font-size: 16px;
        margin-left: 8px;
        font-weight: bold;
      `;
    }
    element.appendChild(mark);
  }

  const notFoundTitles = ownedTitles.filter((item) => !titles.includes(item));
  if (notFoundTitles.length > 0) {
    console.log("NotFound titles:", notFoundTitles);
  }
};

const fetchHubTitles = async (player) => {
  const res = await fetch(
    `https://api.playhive.com/v0/game/all/main/${player}`
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch hubtitles");
  }

  const data = await res.json();
  return data.main.hub_title_unlocked.map((title) =>
    title
      .replace(/[\u{E000}-\u{F8FF}]/gu, "") // replace emojis
      .replace(/&./g, "") // replace colorcodes
      .toLowerCase()
      .replace(/\(\)/g, "x") // replace ()
      .replace(/\(\?\)/g, "x") // replace (?)
      .replace(/#\d+/g, "#x") // replace #number
      .replace(/lvl \d+/g, "lvl x") // replace lvl x
      .replace(/x winrate/g, "x% winrate") // replace x winrate
      .replace(/\d+ year/g, "x year") // replace x year
      .replace(/yeet(?!!)/g, "yeet!") // replace yeet to yeet!
      .replace("sorcerer", "sorceror") // align with Hive support
      .replace("eat. sleep. play.", "eat. play. sleep.") // align with Hive support
      .replace("the void is a myth", "void is a myth") // align with Hive support
      .replace("from the flames!", "from the flames") // align with Hive support
      .replace("cold cruel", "cold & cruel") // align with Hive support
      .replace("100% pure gold", "100 pure gold") // align with Hive support
      .trim()
  );
};

if (window.location.href === "https://support.playhive.com/hub-titles/") {
  hPatch();
  const { titleElements, titles } = allHubTitles();
  overlayHubtitle(titleElements, titles);
}
