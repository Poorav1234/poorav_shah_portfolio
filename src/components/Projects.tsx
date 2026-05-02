'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ClientOnly from '@/components/ClientOnly'
import { FaChartBar, FaMobile } from 'react-icons/fa'
import React from 'react'

interface Project {
  id: number
  title: string
  description: string
  image: string | React.ReactNode
  tags: string[]
  githubUrl: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "TalkBuddy AI",
    description: "AI/ML based project which works as an English tutor. It facilitates voice chat, video chat, and weekly quizzes that are completely handled by AI.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["AI/ML", "Voice Chat", "Video Chat", "AI Tutor", "Python", "React", "Node.js"],
    githubUrl: "https://github.com/Ansh-Ice/talkbuddy-ai",
    featured: true
  },
  {
    id: 2,
    title: "Shuttle Score",
    description: "An Android app used to score badminton matches, manage tournaments, scorers, players, sponsors with easy implementation.",
    image: <FaMobile className="text-4xl text-purple-400" />,
    tags: ["Android", "Java", "Firebase Database", "Tournament Management", "Badminton", "Cloud Data Storage"],
    githubUrl: "http://github.com/om-mjari/Andriod-ShuttleScore",
  },
  {
    id: 3,
    title: "Woodland Wonders",
    description: "A multi-vendor e-commerce website in PHP where sellers can sell furniture and customers can purchase from multiple vendors.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["PHP", "MySQL", "E-commerce", "Multi-Vendor", "Furniture", "Online Shopping"],
    githubUrl: "https://github.com/Ansh-Ice/WoodLand-Wonder-The-ECommerce-Website",
  },
  {
    id: 4,
    title: "News App with AI Integration",
    description: "iOS news application featuring US-based news and stock market details with AI-powered analysis and insights. Provides real-time financial data visualization and personalized news recommendations.",
    image: <FaMobile className="text-4xl text-purple-400" />,
    tags: ["iOS", "Swift", "AI Integration", "Financial Data", "News API", "Stock Market Analysis", "Real-time Updates"],
    githubUrl: "https://github.com/Poorav1234/NewsApp-",
  },
  {
    id: 5,
    title: "Restaurant Management System",
    description: "Desktop-based restaurant management application built in C# with support for multiple user roles including owner, chef, waiter, manager, and guest.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["C#", "Desktop Application", "Multi-user System", "Role-based Access", "Restaurant Management", "Database"],
    githubUrl: "https://github.com/Poorav1234/Restaurant-Management-System",
  },
  {
    id: 6,
    title: "HexaCare - Blockchain and AI Powered Healthcare System",
    description: "A Web3 healthcare application that leverages blockchain technology and artificial intelligence to provide secure and efficient healthcare services.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["Blockchain", "AI", "Web3 Application", "Machine Learning", "IPFS", "Smart Contracts", "Firebase"],
    githubUrl: "https://github.com/Poorav1234/HexaCare",
  },
  {
    id: 7,
    title: "PayOnChain - Blockchain Powered Payment Gateway System",
    description: "A Web3 payment gateway that leverages blockchain technology to provide secure and efficient payment services.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["Blockchain", "Web3 Application", "Smart Contracts", "Payment Gateway", "Solidity", "Hardhat", "React"],
    githubUrl: "https://github.com/Poorav1234/PayOnChain",
  },
  {
    id: 8,
    title: "Voting DApp",
    description: "A decentralized voting application that leverages blockchain technology to provide a secure and transparent voting system.",
    image: <FaChartBar className="text-4xl text-purple-400" />,
    tags: ["Blockchain", "Web3 Application", "Smart Contracts", "DApp", "Solidity"],
    githubUrl: "https://github.com/Poorav1234/voting_dapp",
  },
  {
    id: 9,
    title: "DailyNest AI",
    description: "An AI project tailored for autistic individuals to help improve their health conditions and daily living through intelligent support.",
    image: <FaMobile className="text-4xl text-purple-400" />,
    tags: ["AI", "Healthcare", "Machine Learning", "Health Tech"],
    githubUrl: "https://github.com/meghmodi2810/DailyNest",
  }
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${project.featured
        ? 'border-2 border-purple-500/50 shadow-glow'
        : 'glass hover:glass-hover'
        }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{project.image}</div>
          {project.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
              FEATURED
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <ClientOnly>
            <Link href={project.githubUrl} className="flex-1">
              <motion.button className="w-full py-2 glass rounded-lg font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }} whileTap={{ scale: 0.95 }}>
                GitHub
              </motion.button>
            </Link>
          </ClientOnly>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-[#1A1A2E] to-[#0F0F23]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Explore my portfolio of software development projects and applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mt-2"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}