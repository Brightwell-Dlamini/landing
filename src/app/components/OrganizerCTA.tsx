'use client';
import { motion, useAnimation, Variants } from 'framer-motion';
import {
  TicketIcon,
  MegaphoneIcon,
  SparklesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const OrganizerCTA = () => {
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const featureCards = [
    {
      icon: <SparklesIcon className="h-8 w-8 text-pink-300" />,
      title: 'Create',
      desc: 'Beautiful event pages in minutes with our intuitive tools',
    },
    {
      icon: <MegaphoneIcon className="h-8 w-8 text-indigo-300" />,
      title: 'Promote',
      desc: 'Reach thousands with our built-in marketing tools',
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-purple-300" />,
      title: 'Analyze',
      desc: 'Track sales and engagement in real-time dashboards',
    },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="organizer-cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-16 sm:py-28"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: {
              type: 'spring',
              stiffness: 50,
              damping: 20,
              duration: 1.8,
            },
          },
        }}
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500 mix-blend-screen"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scale: 1,
            opacity: 0.1,
            transition: {
              type: 'spring',
              stiffness: 50,
              damping: 20,
              duration: 1.8,
              delay: 0.4,
            },
          },
        }}
        className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500 mix-blend-screen"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            id="organizer-cta-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Elevate Your Events
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to create, promote and sell out your events -
            all in one platform
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-white/20">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {card.title}
              </h3>
              <p className="text-purple-100 text-center opacity-90">
                {card.desc}
              </p>
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
              backgroundColor: '#ffffff',
              color: '#7c3aed',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl mx-auto focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
            aria-label="Get started as an organizer"
          >
            <TicketIcon className="h-6 w-6" />
            Get Started!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerCTA;
