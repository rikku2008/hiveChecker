import cssText from "data-text:~style.css"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import { useCallback, useState } from "react"

import Button from "~components/ui/Button"
import Input from "~components/ui/Input"
import { RadioInputGroup } from "~components/ui/RadioInput"
import { searchPlayer } from "~lib/api"
import {
  addCheckmarks,
  fetchTitles,
  filterCheckmarks,
  getTitleElements,
  resetCheckmarks
} from "~lib/hubtitle"

export const config: PlasmoCSConfig = {
  matches: ["https://support.playhive.com/*"],
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const getMode = (url: string) => {
  const modes = {
    hubtitle: "hub-titles"
  }
  return (
    Object.entries(modes).find(([, path]) => url.includes(path))?.[0] ||
    "unknown"
  )
}

const Overlay = () => {
  const mode = getMode(window.location.href)
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const [allAmount, setAllAmount] = useState(0)
  const [ownedAmount, setOwnedAmount] = useState(0)

  // Search state
  const [gamertag, setGamertag] = useState("")
  const [focused, setFocused] = useState(false)
  const [autoComplete, setAutoComplete] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [nameCache, setNameCache] = useState<Record<string, string[]>>({})

  const handleSearch = useCallback(async () => {
    if (!gamertag.trim()) return

    switch (mode) {
      case "hubtitle": {
        setMessage("Checking titles...")
        resetCheckmarks()
        const titleElements = getTitleElements()
        const { ownedTitles, error } = await fetchTitles(gamertag.trim())
        addCheckmarks(titleElements, ownedTitles)

        setMessage(error ? "Unable to fetch data." : "")
        setAllAmount(titleElements.length)
        setOwnedAmount(ownedTitles.length)
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  }

  const selectSuggestion = (name: string) => {
    setGamertag(name)
    setFocused(false)
    setAutoComplete([])
    setSelectedIndex(-1)
  }

  // Filter state
  const [filter, setFilter] = useState<"All" | "Owned" | "Unowned">("All")

  const handleFilterChange = useCallback(
    (v: "All" | "Owned" | "Unowned") => {
      setFilter(v)
      switch (mode) {
        case "hubtitle": {
          const titleElements = getTitleElements()
          filterCheckmarks(titleElements, v)
          break
        }
        default:
          break
      }
    },
    [mode]
  )

  return (
    <div
      style={{
        display: mode !== "unknown" ? "block" : "none",
        width: isOpen ? "350px" : "64px",
        height: isOpen ? "400px" : "64px"
      }}
      className="fixed bottom-4 left-4 bg-[#0a0613] text-white rounded-xl p-4 transition-all duration-200">
      {isOpen && (
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
            <div className="text-xs text-red-400 pt-1 h-4">{message}</div>
          </div>

          {/* Filter */}
          <div className="mt-1">
            <h2 className="font-bold text-sm">Filters</h2>
            <RadioInputGroup
              name="filter"
              options={[
                { label: `All (${allAmount})`, value: "All" },
                { label: `Owned (${ownedAmount})`, value: "Owned" },
                {
                  label: `Unowned (${allAmount - ownedAmount})`,
                  value: "Unowned"
                }
              ]}
              selected={filter}
              onChange={handleFilterChange}
            />
          </div>

          <div className="absolute bottom-3 text-sm opacity-50">
            mode: {mode} | version: 2.0.0
          </div>
        </div>
      )}

      {!isOpen && (
        <div>
          <button onClick={toggleOpen}>
            <ChevronDown size={32} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Overlay
