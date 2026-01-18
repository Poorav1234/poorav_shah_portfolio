'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import useSmoothScroll from '../hooks/useSmoothScroll'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useSmoothScroll();
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY || currentScrollY <= 10) {
        // Scrolling up or near top
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
  }

  // Mouse move handler to detect if cursor is near top of screen
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (typeof window !== 'undefined') {
      const mouseY = e.clientY
      // If mouse is in top 100px of screen, show navbar
      if (mouseY <= 100) {
        setIsVisible(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', controlNavbar)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [lastScrollY])

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0F0F23] py-4 px-6 transition-transform duration-300 ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Poorav Shah
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ y: -2 }}>
              <Link 
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden mt-4 py-4 bg-[#1a1a2e] backdrop-blur-lg rounded-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 border-b border-gray-700 last:border-0 relative group"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}