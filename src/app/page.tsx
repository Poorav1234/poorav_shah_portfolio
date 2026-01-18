'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/Background/ParticleBackground'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F23] relative overflow-x-hidden">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <About />
      
      {/* Skills Section */}
      <Skills />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: false }}
        transition={{ duration: 0.1 }}
      />
    </main>
  )
}