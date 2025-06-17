"use client"

import { useState, useEffect } from "react"
import { Outlet, Link } from "react-router-dom"
import { IoSunnyOutline, IoMoonOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5"

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menu = [
    { text: "Nature", path: "/?category=Nature", icon: "🌿" },
    { text: "Technology", path: "/?category=Technology", icon: "💻" },
    { text: "Politics", path: "/?category=Politics", icon: "🏛️" },
    { text: "Travel", path: "/?category=Travel", icon: "✈️" },
  ]

  // Initialize theme on component mount
  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("echoblog-theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldUseDark = savedTheme ? savedTheme === "dark" : systemPrefersDark

    setDarkMode(shouldUseDark)

    // Apply theme to document
    if (shouldUseDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode

    // Update state
    setDarkMode(newDarkMode)

    // Update DOM
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("echoblog-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("echoblog-theme", "light")
    }

    console.log("Theme toggled to:", newDarkMode ? "dark" : "light") // Debug log
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 font-sans transition-colors duration-500">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-colors duration-500">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <Link to="/" className="group">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent tracking-wide group-hover:from-teal-500 group-hover:to-indigo-600 transition-all duration-300">
              EchoBlog
              <span className="text-teal-400 group-hover:text-indigo-400 transition-colors duration-300">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-1">
              {menu.map((x) => (
                <li key={x.text}>
                  <Link
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 flex items-center space-x-2 group"
                    to={x.path}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{x.icon}</span>
                    <span>{x.text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="relative w-5 h-5">
                {darkMode ? (
                  <IoSunnyOutline size={20} className="text-yellow-500 animate-spin-slow absolute inset-0" />
                ) : (
                  <IoMoonOutline size={20} className="text-indigo-600 absolute inset-0" />
                )}
              </div>
            </button>

            <Link
              to="/create"
              className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              ✨ New Post
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <IoSunnyOutline size={18} className="text-yellow-500" />
              ) : (
                <IoMoonOutline size={18} className="text-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              {mobileMenuOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-500">
            <div className="px-5 py-4 space-y-2">
              {menu.map((x) => (
                <Link
                  key={x.text}
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  to={x.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{x.icon}</span>
                  <span>{x.text}</span>
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/create"
                  className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold w-full transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">✨</span>
                  <span>New Post</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="container mx-auto px-5 md:px-8 lg:px-12 py-10 transition-colors duration-500">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-teal-900 text-white py-12 mt-16">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                EchoBlog
              </h2>
              <p className="text-indigo-200 mb-4">Thoughts that echo in the world.</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer">
                  📘
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer">
                  🐦
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300 cursor-pointer">
                  📷
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {menu.map((x) => (
                  <li key={x.text}>
                    <Link
                      to={x.path}
                      className="text-indigo-200 hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start space-x-2"
                    >
                      <span>{x.icon}</span>
                      <span>{x.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-indigo-200 mb-4 text-sm">Stay updated with our latest posts</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-indigo-200 border border-white/30 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/25 transition-all duration-300"
                />
                <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <span className="text-sm text-indigo-200">© 2025 EchoBlog. All rights reserved. Made with ❤️</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
