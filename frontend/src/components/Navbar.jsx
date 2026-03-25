import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const navLinks = ["Home", "Explore", "Login"]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F7F7]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(17,45,78,0.08)]"
          : "bg-[#F9F7F7] shadow-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-0">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <h1 className="text-2xl font-bold tracking-tight text-[#112D4E] select-none">
            <span className="text-[#3F72AF]">Freelance</span>.io
          </h1>

          <div className="hidden md:flex items-center gap-1 font-medium">
            {navLinks.map((link) => (
              <p
                key={link}
                className="relative cursor-pointer text-[#112D4E] text-md px-4 py-2 rounded-md
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-200 ease-in-out
                  after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]
                  after:bg-[#3F72AF] after:rounded-full after:scale-x-0
                  after:transition-transform after:duration-200
                  hover:after:scale-x-100"
              >
                {link}
              </p>
            ))}

            <div className="w-px h-6 bg-[#DBE2EF] mx-2" aria-hidden="true" />

            <button
              className="bg-[#3F72AF] text-[#F9F7F7] text-md font-semibold
                px-5 py-2 rounded-lg
                hover:bg-[#112D4E]
                active:scale-[0.97]
                transition-all duration-200 ease-in-out
                shadow-[0_1px_8px_rgba(63,114,175,0.35)]
                hover:shadow-[0_2px_12px_rgba(17,45,78,0.3)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F72AF] focus-visible:ring-offset-2"
            >
              Register
            </button>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
              text-[#112D4E] hover:bg-[#DBE2EF]/60
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F72AF]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
            >
              <X size={22} />
            </span>
            <span
              className={`absolute transition-all duration-200 ${open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
            >
              <Menu size={22} />
            </span>
          </button>

        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="border-t border-[#DBE2EF] bg-[#F9F7F7]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <p
                key={link}
                onClick={() => setOpen(false)}
                className="cursor-pointer text-[#112D4E] font-medium text-sm
                  px-4 py-3 rounded-lg
                  hover:text-[#3F72AF] hover:bg-[#DBE2EF]/50
                  transition-all duration-150"
              >
                {link}
              </p>
            ))}

            <div className="h-px bg-[#DBE2EF] my-2" aria-hidden="true" />

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-[#3F72AF] text-[#F9F7F7] text-sm font-semibold
                px-6 py-3 rounded-lg
                hover:bg-[#112D4E]
                active:scale-[0.98]
                transition-all duration-200
                shadow-[0_1px_8px_rgba(63,114,175,0.3)]"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar