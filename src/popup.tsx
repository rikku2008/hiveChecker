import "./style.css"

import LinkButton from "~components/ui/LinkButton"
import { links, statsSites } from "~lib/constants"

function IndexPopup() {
  return (
    <div className="text-white bg-[#0a0613] w-[400px] py-3 px-2">
      <h1 className="mb-2 text-xl">Cosmetic Shortcut 🐝</h1>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <LinkButton key={link.title} href={link.href}>
            {link.title}
          </LinkButton>
        ))}
      </div>
      <h1 className="mb-2 text-xl">Stats Shortcut 📊</h1>
      <div className="grid grid-cols-2 gap-2">
        {statsSites.map((link) => (
          <LinkButton key={link.title} href={link.href}>
            {link.title}
          </LinkButton>
        ))}
      </div>
    </div>
  )
}

export default IndexPopup
