import cssText from "data-text:~style.css"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import { useCallback, useState, type KeyboardEvent } from "react"

import ImageSizeSlider from "~components/ImageSizeSlider"
import Button from "~components/ui/Button"
import Input from "~components/ui/Input"
import Progress from "~components/ui/Progress"
import { RadioInputGroup } from "~components/ui/RadioInput"
import { searchPlayer } from "~lib/api"
import { fetchAvatar, filterAvatar, getAvatarElements } from "~lib/avatar"
import {
  fetchBackbling,
  filterBackbling,
  getBackblingElements
} from "~lib/backbling"
import { addCheckmarks, resetCheckmarks } from "~lib/checkmark"
import { fetchCostume, filterCostume, getCostumeElements } from "~lib/costume"
import { fetchHat, filterHat, getHatElements } from "~lib/hat"
import { fetchTitle, filterHubTitle, getTitleElements } from "~lib/hubtitle"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/*"],
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

type Mode =
  | "hubtitle"
  | "costume"
  | "avatar"
  | "backbling"
  | "hat"
  | "pet"
  | "mount"
  | "wincelebration"
  | "unknown"

const MODE_PATHS: Record<string, string> = {
  hubtitle: "hub-titles",
  costume: "costumes",
  avatar: "avatars",
  backbling: "back-blings",
  hat: "hats",
  pet: "pets",
  mount: "mounts",
  wincelebration: "win-celebrations"
}

const getMode = (url: string): Mode => {
  const entry = Object.entries(MODE_PATHS).find(([, path]) =>
    url.includes(path)
  )
  return (entry?.[0] as Mode) || "unknown"
}

type FilterType = "All" | "Owned" | "Unowned"

const Overlay = () => {
  const mode = getMode(window.location.href)

  // UI state
  const [isOpen, setIsOpen] = useState(true)
  const [message, setMessage] = useState("")

  // Statistics
  const [allAmount, setAllAmount] = useState(0)
  const [ownedAmount, setOwnedAmount] = useState(0)
  const progress = Math.floor((ownedAmount / (allAmount || 1)) * 10000) / 10000

  // Search state
  const [gamertag, setGamertag] = useState("")
  const [focused, setFocused] = useState(false)
  const [autoComplete, setAutoComplete] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [nameCache, setNameCache] = useState<Record<string, string[]>>({})

  // Filter state
  const [filter, setFilter] = useState<FilterType>("All")

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [])

  const handleSearch = useCallback(async () => {
    const trimmedGamertag = gamertag.trim()
    if (!trimmedGamertag) return

    switch (mode) {
      case "hubtitle": {
        setMessage("Checking titles...")
        resetCheckmarks()
        const titleElements = getTitleElements()
        const { ownedTitles, error } = await fetchTitle(trimmedGamertag)
        addCheckmarks(titleElements, ownedTitles)

        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(titleElements.length)
        setOwnedAmount(ownedTitles.length)
        break
      }
      case "costume": {
        setMessage("Checking costumes...")
        resetCheckmarks()
        const costumeElements = getCostumeElements()
        const { ownedCostumes, error } = await fetchCostume(trimmedGamertag)
        addCheckmarks(costumeElements, ownedCostumes, (itemname) => {
          return itemname.replaceAll(":", "").trim()
        })

        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(costumeElements.length)
        setOwnedAmount(ownedCostumes.length)
        break
      }
      case "avatar": {
        setMessage("Checking avatars...")
        resetCheckmarks()
        const avatarElements = getAvatarElements()
        const { ownedAvatars, error } = await fetchAvatar(trimmedGamertag)
        addCheckmarks(avatarElements, ownedAvatars)
        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(avatarElements.length)
        setOwnedAmount(ownedAvatars.length)
        break
      }
      case "backbling": {
        setMessage("Checking backblings...")
        resetCheckmarks()
        const backblingElements = getBackblingElements()
        const { ownedBackblings, error } = await fetchBackbling(trimmedGamertag)
        addCheckmarks(backblingElements, ownedBackblings)
        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(backblingElements.length)
        setOwnedAmount(ownedBackblings.length)
        break
      }
      case "hat": {
        setMessage("Checking hats...")
        resetCheckmarks()
        const hatElements = getHatElements()
        const { ownedHats, error } = await fetchHat(trimmedGamertag)
        addCheckmarks(hatElements, ownedHats)
        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(hatElements.length)
        setOwnedAmount(ownedHats.length)
        break
      }
      default:
        break
    }
  }, [mode, gamertag])

  const fetchSuggestion = useCallback(
    async (name: string) => {
      const trimmedName = name.trim()
      if (trimmedName.length < 4 || trimmedName.length > 16) {
        setAutoComplete([])
        setSelectedIndex(-1)
        return
      }

      if (nameCache[trimmedName]) {
        setAutoComplete(nameCache[trimmedName])
        setSelectedIndex(-1)
        return
      }

      const { data } = await searchPlayer(trimmedName)
      const usernames = data.map((user) => user.username)
      setAutoComplete(usernames)
      setSelectedIndex(-1)
      setNameCache((prev) => ({ ...prev, [trimmedName]: usernames }))
    },
    [nameCache]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) return

      if (focused && autoComplete.length > 0) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault()
            setSelectedIndex((prev) =>
              prev < autoComplete.length - 1 ? prev + 1 : prev
            )
            break

          case "ArrowUp":
            e.preventDefault()
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
            break

          case "Enter":
            e.preventDefault()
            setFocused(false)
            setAutoComplete([])
            if (selectedIndex >= 0) {
              setGamertag(autoComplete[selectedIndex])
            } else {
              handleSearch()
            }
            break

          case "Escape":
            e.preventDefault()
            setFocused(false)
            setAutoComplete([])
            setSelectedIndex(-1)
            break
        }
      } else if (e.key === "Enter") {
        setAutoComplete([])
        handleSearch()
      }
    },
    [focused, autoComplete, selectedIndex, handleSearch]
  )

  const selectSuggestion = useCallback((name: string) => {
    setGamertag(name)
    setFocused(false)
    setAutoComplete([])
    setSelectedIndex(-1)
  }, [])

  const handleFilterChange = useCallback(
    (value: FilterType) => {
      setFilter(value)
      switch (mode) {
        case "hubtitle":
          const titleElements = getTitleElements()
          filterHubTitle(titleElements, value)
          break
        case "costume":
          const costumeElements = getCostumeElements()
          filterCostume(costumeElements, value)
          break
        case "avatar":
          const avatarElements = getAvatarElements()
          filterAvatar(avatarElements, value)
          break
        case "backbling":
          const backblingElements = getBackblingElements()
          filterBackbling(backblingElements, value)
          break
        case "hat":
          const hatElements = getHatElements()
          filterHat(hatElements, value)
          break
      }
    },
    [mode]
  )

  const overlayStyles = {
    width: isOpen ? "350px" : "64px",
    height: isOpen ? "400px" : "64px"
  }

  const filterOptions = [
    { label: `All (${allAmount})`, value: "All" as FilterType },
    { label: `Owned (${ownedAmount})`, value: "Owned" as FilterType },
    {
      label: `Unowned (${allAmount - ownedAmount})`,
      value: "Unowned" as FilterType
    }
  ]

  if (mode === "unknown") return null

  return (
    <div
      style={overlayStyles}
      className="fixed bottom-4 left-4 bg-[#0a0613] text-white rounded-xl p-4 transition-all duration-200">
      {isOpen ? (
        <div>
          <button onClick={toggleOpen} className="mb-1">
            <h1 className="text-lg">
              <ChevronUp size={24} className="inline mt-[-5px] mr-1" />
              Hive Checker
            </h1>
          </button>

          {/* Search */}
          <div>
            <label htmlFor="gamertag" className="font-bold text-sm">
              GamerTag
            </label>
            <div className="flex gap-1">
              <div className="relative grow">
                <Input
                  id="gamertag"
                  className="w-full"
                  value={gamertag}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 200)}
                  onChange={(e) => {
                    setFocused(true)
                    setGamertag(e.target.value)
                    fetchSuggestion(e.target.value)
                  }}
                  autoComplete="off"
                  placeholder="Enter gamertag..."
                />

                {/* Autocomplete Dropdown */}
                {focused && autoComplete.length > 0 && (
                  <div className="absolute left-0 right-0 bg-[#160d1b] border border-[#36293d] rounded mt-1 text-sm max-h-80 overflow-y-auto z-10">
                    {autoComplete.map((name, index) => (
                      <div
                        key={name}
                        className={`px-2 py-1 cursor-pointer transition-colors ${
                          index === selectedIndex
                            ? "bg-[#5a2f6d]"
                            : "hover:bg-[#36293d]"
                        }`}
                        onClick={() => selectSuggestion(name)}>
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="primary" onClick={handleSearch}>
                <Search className="inline mt-[-3px] mr-1" size={16} />
                Search
              </Button>
            </div>

            {/* Message Display */}
            <div className="text-xs text-red-400 pt-1 h-4">{message}</div>
          </div>

          {/* Filter Section */}
          <div className="mt-1">
            <h2 className="font-bold text-sm">Filters</h2>
            <RadioInputGroup
              name="filter"
              options={filterOptions}
              selected={filter}
              onChange={handleFilterChange}
            />
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="mt-1" />

          {/* Image Size */}
          {mode === "avatar" && <ImageSizeSlider />}

          {["pet", "mount", "wincelebration"].includes(mode) && (
            <div className="mt-1 text-red-600">
              <h1>⚠️SEARCH FOR THIS MODE IS WORK IN PROGRESS</h1>
            </div>
          )}

          {/* Footer */}
          <div className="absolute bottom-3 text-sm opacity-50">
            mode: {mode} | version: 2.0.0
          </div>
        </div>
      ) : (
        <button onClick={toggleOpen}>
          <ChevronDown size={32} />
        </button>
      )}
    </div>
  )
}

export default Overlay
