'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="glass py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold gradient-text mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            Poorav Shah
          </motion.div>

          {/* Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            {[
              { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/Poorav1234' },
              { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/poorav-shah-b97528328/' },
              { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/poorav__shah123?igsh=MW9laTNvNm5wZ21pdg==' },
              { name: 'X', icon: <FaTwitter />, url: 'https://x.com/PooravShah123' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xl"
                whileHover={{ y: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © 2026 Poorav Shah. All rights reserved.
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-6"></div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <Link href="#home" className="hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link href="#about" className="hover:text-white transition-colors duration-300">
            About
          </Link>
          <Link href="#skills" className="hover:text-white transition-colors duration-300">
            Skills
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors duration-300">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}