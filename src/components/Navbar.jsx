import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Process", id: "process" },
    { label: "Contact", route: "/contact" },
  ];

  return (
    <nav
      className={`
        fixed top-0 w-full z-[9999]
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_25px_rgba(0,229,255,0.15)]"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold neon-text cursor-pointer"
          aria-label="Deshvisa Home"
        >
          DESVISA
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm items-center">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                } else {
                  scrollToSection(item.id); 
                }
              }}
              className="cursor-pointer hover:text-cyan-400 transition"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Start Project Button */}
        <button
          onClick={() => navigate("/start-project")}
          className="hidden md:block px-6 py-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-2 border-cyan-500/50 text-cyan-300 text-sm font-semibold uppercase tracking-widest backdrop-blur-md hover:scale-105 hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300"
          aria-label="Start Project"
        >
          🚀 Start Project
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-cyan-400 text-xl"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 px-6 pb-6 space-y-4">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                  setMenuOpen(false);
                } else {
                  scrollToSection(item.id);
                }
              }}
              className="block w-full text-left cursor-pointer text-gray-300 hover:text-cyan-400"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              navigate("/start-project");
              setMenuOpen(false);
            }}
            className="w-full mt-4 px-4 py-3 bg-cyan-500 text-black rounded-lg font-semibold"
            aria-label="Start Project from mobile menu"
          >
            🚀 Start Project
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;