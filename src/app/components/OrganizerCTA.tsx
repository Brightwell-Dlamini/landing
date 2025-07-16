'use client';
import { motion, useAnimation, Variants } from 'framer-motion';
import {
  TicketIcon,
  MegaphoneIcon,
  SparklesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const OrganizerCTA = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const featureCards = [
    {
      icon: <SparklesIcon className="h-5 w-5 text-pink-300" />,
      title: 'Create',
      desc: 'Craft stunning event pages with our AI-powered designer',
      gradient: 'from-pink-500 to-purple-600',
    },
    {
      icon: <MegaphoneIcon className="h-5 w-5 text-cyan-300" />,
      title: 'Promote',
      desc: 'Amplify reach with smart audience targeting',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: <ChartBarIcon className="h-5 w-5 text-emerald-300" />,
      title: 'Analyze',
      desc: 'Real-time insights with beautiful dashboards',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="organizer-cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-24 sm:py-32 isolate"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 0.3, 0],
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                },
              },
            }}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? 'bg-pink-500'
                : i % 2 === 0
                ? 'bg-purple-500'
                : 'bg-cyan-500'
            }`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient blobs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.3,
            transition: {
              type: 'spring',
              stiffness: 30,
              damping: 20,
              duration: 2,
            },
          },
        }}
        className="absolute -right-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-pink-600 to-purple-600 mix-blend-soft-light blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.3,
            transition: {
              type: 'spring',
              stiffness: 30,
              damping: 20,
              duration: 2,
              delay: 0.4,
            },
          },
        }}
        className="absolute -left-1/4 -bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 mix-blend-soft-light blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            id="organizer-cta-heading"
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400">
              Revolutionize
            </span>{' '}
            Your Event Experience
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            The ultimate platform for visionary creators who demand excellence
            in every detail
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative"
        >
          {/* Hover highlight effect */}
          {hoveredCard !== null && (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${featureCards[hoveredCard].gradient} opacity-20 rounded-3xl blur-xl pointer-events-none`}
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-lg border border-white/10 rounded-2xl group-hover:border-white/20 transition-all duration-500" />

              {/* Animated border highlight */}
              <div className="absolute inset-0 rounded-2xl p-px">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}
                />
              </div>

              <div className="relative p-8 h-full flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`bg-gradient-to-br ${card.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-500`}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-300 mb-6">{card.desc}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm font-medium text-cyan-300 mt-auto"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
              boxShadow:
                '0 20px 25px -5px rgba(236, 72, 153, 0.3), 0 10px 10px -5px rgba(236, 72, 153, 0.1)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl mx-auto focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300">
              <TicketIcon className="h-6 w-6" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 group-hover:text-white transition-all duration-300">
                Begin Your Journey
              </span>
              <span className="absolute -right-5 group-hover:right-2 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </span>
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 mt-6 text-sm flex items-center justify-center gap-2"
          >
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400/80 animate-pulse" />
            Trusted by top event creators in the Kingndom.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerCTA;
