'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ClientOnly from '@/components/ClientOnly'
import { FaGithub, FaDownload } from 'react-icons/fa'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements - simplified */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Simplified background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Poorav Shah</span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            M.Sc.(IT) Student
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-400 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate about technology and innovation. Currently pursuing Master of Science in Information Technology with focus on modern web development, cloud computing, and emerging technologies.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <ClientOnly>
              <Link href="#projects">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-glow transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-lg" /> View Projects
                </motion.button>
              </Link>
            </ClientOnly>
            
            <ClientOnly>
              <Link href="/resume.pdf" download>
                <motion.button 
                  className="px-8 py-4 glass rounded-xl font-semibold text-white border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="text-lg" /> Download Resume
                </motion.button>
              </Link>
            </ClientOnly>
          </motion.div>
        </motion.div>

        {/* Right Content - Avatar/Illustration */}
        <motion.div
          className="flex justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Profile Image Circle - positioned higher to appear 'outside' the original circle */}
          <motion.div 
            className="relative -mt-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Much larger glowing circle background */}
            <motion.div 
              className="w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Avatar with much larger size */}
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border-2 border-purple-500/30 overflow-hidden relative z-10">
                <Image 
                  src="/images/myphoto.png"
                  alt="Poorav Shah"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    // Set a fallback if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%231a1a2e'/%3E%3Ccircle cx='128' cy='128' r='100' fill='%232d2d44'/%3E%3Ctext x='128' y='150' font-family='Arial' font-size='64' fill='%238B5CF6' text-anchor='middle'%3EP%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-purple-500/30 pointer-events-none"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}