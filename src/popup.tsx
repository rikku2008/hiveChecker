import { useState } from "react"

import "./style.css"

import LinkButton from "~components/LinkButton"

const Links = [
  {
    href: "https://support.playhive.com/hub-titles/",
    title: "Hub Titles"
  },
  {
    href: "https://support.playhive.com/costumes/",
    title: "Costumes"
  },
  {
    href: "https://support.playhive.com/avatars/",
    title: "Avatars"
  },
  {
    href: "https://support.playhive.com/back-blings/",
    title: "Back Blings"
  },
  {
    href: "https://support.playhive.com/hats/",
    title: "Hats"
  },
  {
    href: "https://support.playhive.com/pets/",
    title: "Pets"
  },
  {
    href: "https://support.playhive.com/mounts/",
    title: "Hub Mounts"
  }
]

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="text-white bg-[#0a0613] w-[400px] py-3 px-2">
      <h1 className="mb-2 text-xl">Cosmetic Shortcut 🐝</h1>
      <div className="grid grid-cols-2 gap-2">
        {Links.map((link) => (
          <LinkButton key={link.title} href={link.href}>
            {link.title}
          </LinkButton>
        ))}
      </div>
    </div>
  )
}

export default IndexPopup
