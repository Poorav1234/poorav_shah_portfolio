'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Avatar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl glass p-6 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/AboutMe1.avif"
                    alt="About Poorav Shah"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">
              Versatile Developer Building Across Platforms
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a passionate MScIT Student who has developed extensive hands-on experience 
              across multiple technology domains through diverse project work.
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              From mobile applications to IoT systems, I've built projects spanning Android, iOS, 
              embedded systems, web development with MERN stack, and AI/ML applications. 
              My strength lies in adapting to different technologies and creating solutions 
              that bridge various platforms.
            </p>

            {/* Experience Highlight Card */}
            <motion.div 
              className="glass p-6 rounded-2xl border-l-4 border-purple-500"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <span className="text-xl">🔍</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Multi-Platform Developer</h4>
                  <p className="text-gray-400 text-sm">
                    Experienced in Android, iOS, IoT, C++, Python, C#, MERN stack, 
                    and AI/ML through comprehensive project development across diverse technologies.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}