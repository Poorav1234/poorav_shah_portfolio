'use client'

import { motion } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'

interface SkillCardProps {
  title: string
  skills: string[]
  icon: string
  delay?: number
}

function SkillCard({ title, skills, icon, delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      className="glass p-6 rounded-2xl hover:glass-hover transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.3)" }}
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <motion.span
            key={skill}
            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const activeSection = useActiveSection()

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: ["JavaScript", "Python", "Solidity", "Java", "C++", "Rust", "Swift"]
    },
    {
      title: "Frontend",
      icon: "🎨",
      skills: ["React", "Next.js", "HTML", "CSS", "JavaScript"]
    },
    {
      title: "Backend & Tools",
      icon: "⚙️",
      skills: ["Node.js", "Express", "MongoDB", "Firebase", "Git", "GitHub", "VS Code", "REST APIs"]
    },
    {
      title: "Blockchain & Web3",
      icon: "🔗",
      skills: ["Ethereum", "Smart Contracts", "Web3.js", "Ethers.js", "IPFS", "Chainlink", "Polygon", "Solana","Remix", "Hardhat", "Truffle", "Ganache"]
    }
  ]

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {activeSection === 'skills' ? (
              <>
                My <span className="gradient-text">Skills</span>
              </>
            ) : (
              <>My Skills</>
            )}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I specialize in for building modern software applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              title={category.title}
              skills={category.skills}
              icon={category.icon}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Additional Skills Bar */}
        <motion.div
          className="mt-16 glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Always Learning</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Cloud Computing", "Machine Learning", "Data Structures", "Algorithms", "Software Engineering", "Agile", "Docker", "AWS", "Ethereum", "Smart Contracts", "DeFi", "NFTs", "Web3", "Solidity", "Blockchain Security", "Cryptocurrency"].map((skill: string) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white rounded-lg border border-purple-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}