'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { SafeInput } from './SafeElements'
import ClientOnly from './ClientOnly'
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        const result = await response.json();
        // Reset form and show success message
        setFormData({ name: '', email: '', message: '' })
        setShowSuccess(true);
        
        // Log the result
        console.log('Email result:', result);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        const errorResult = await response.json();
        console.error('Email error:', errorResult);
        throw new Error(errorResult.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Motivational Text and Profiles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">
              Let's Build Something <span className="gradient-text">Amazing</span> Together
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ready to transform your ideas into reality? Whether you need a web application, 
              software development, or technology consultation, I'm here to help bring your vision to life.
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              I specialize in creating secure, scalable solutions that drive innovation 
              and deliver exceptional user experiences. Let's collaborate to build amazing projects.
            </p>

            {/* Competitive Programming Achievements */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Competitive Programming</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                    <span className="text-green-400 font-bold">LC</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">LeetCode</p>
                    <p className="text-gray-400">300+ DSA Problems Solved</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 font-bold">HR</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">HackerRank</p>
                    <p className="text-gray-400">3-5 Stars in Multiple Languages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">pooravshah123@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400">Surat, Gujarat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <ClientOnly>
                    <SafeInput
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                      placeholder="Your full name"
                    />
                  </ClientOnly>
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <ClientOnly>
                    <SafeInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </ClientOnly>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <ClientOnly>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </ClientOnly>
              </div>
            </form>

            {/* Success/Error Messages */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
              >
                Message sent successfully!
              </motion.div>
            )}
            
            {showError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center"
              >
                Error sending message. Please try again.
              </motion.div>
            )}

            {/* Social Links */}
            <div className="mt-8 flex justify-center space-x-6">
              {[
                { name: 'LinkedIn', icon: <FaLinkedin className="text-xl" />, url: 'https://www.linkedin.com/in/poorav-shah-b97528328/' },
                { name: 'GitHub', icon: <FaGithub className="text-xl" />, url: 'https://github.com/Poorav1234' },
                { name: 'Instagram', icon: <FaInstagram className="text-xl" />, url: 'https://www.instagram.com/poorav__shah123?igsh=MW9laTNvNm5wZ21pdg==' },
                { name: 'X', icon: <FaTwitter className="text-xl" />, url: 'https://x.com/PooravShah123' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-12 h-12 glass rounded-lg flex items-center justify-center text-xl hover:bg-purple-500/20 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}