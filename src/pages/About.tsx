import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Award, Heart, Globe, Shield } from 'lucide-react';
import { Model3D } from '../components/Model3D';

export const About: React.FC = () => {
  const stats = [
    { icon: <Users size={32} />, number: '10K+', label: 'Happy Families' },
    { icon: <Award size={32} />, number: '50+', label: 'Awards Won' },
    { icon: <Globe size={32} />, number: '25+', label: 'Countries' },
    { icon: <Shield size={32} />, number: '100%', label: 'Safety Certified' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      bio: 'Former MIT researcher with 15 years in machine learning and child development.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Design',
      bio: 'Award-winning toy designer with expertise in creating engaging play experiences.',
      avatar: '👨‍🎨'
    },
    {
      name: 'Emily Watson',
      role: 'Child Psychologist',
      bio: 'Specialist in developmental psychology and educational toy design.',
      avatar: '👩‍🔬'
    },
    {
      name: 'James Kim',
      role: 'Technology Director',
      bio: 'Former Google engineer focused on AI safety and user experience.',
      avatar: '👨‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI TOY</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're pioneering the future of play by combining cutting-edge artificial intelligence 
                with traditional toy craftsmanship to create magical experiences that grow with your child.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">2019</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">$50M</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Funding Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">100+</div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Team Members</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <Model3D
                  modelPath="/models/stuffed_elephant_develeopment_phase_ii/scene.gltf"
                  scale={0.5}
                  position={[0, -0, 0]}
                  autoRotate={true}
                  animationType="detail"
                  className="w-full h-64 sm:h-96"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <Model3D
                  modelPath="/models/stuffed_dino_toy/scene.gltf"
                  scale={0.4}
                  position={[0, -0, 0]}
                  autoRotate={true}
                  animationType="detail"
                  className="w-full h-64 sm:h-96"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-base sm:text-lg">
                  It all started when our founder's daughter asked why her toys couldn't talk back. 
                  That simple question sparked a revolution in how we think about play and learning.
                </p>
                <p className="text-base sm:text-lg">
                  We believe that play is the most powerful form of learning, and AI can make that 
                  experience more personalized, engaging, and meaningful than ever before.
                </p>
                <p className="text-base sm:text-lg">
                  Every AI TOY is designed with love, tested for safety, and built to grow with 
                  your child's imagination. We're not just making toys—we're creating companions 
                  for life's greatest adventure: childhood.
                </p>
              </div>
              <div className="mt-8 flex space-x-4 justify-center lg:justify-start">
                <Lightbulb className="text-yellow-500" size={24} />
                <Heart className="text-red-500" size={24} />
                <Shield className="text-green-500" size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Passionate experts from AI, child development, and design working together 
              to create the future of play.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{member.avatar}</div>
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 dark:text-blue-400 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
                  {member.role}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Heart className="text-red-500" size={48} />,
                title: 'Safety First',
                description: 'Every product undergoes rigorous testing to ensure complete safety for children of all ages.'
              },
              {
                icon: <Lightbulb className="text-yellow-500" size={48} />,
                title: 'Innovation',
                description: 'We push the boundaries of what\'s possible in AI and toy design to create magical experiences.'
              },
              {
                icon: <Users className="text-blue-500" size={48} />,
                title: 'Community',
                description: 'We believe in building a community of families who share our passion for learning through play.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 sm:mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 