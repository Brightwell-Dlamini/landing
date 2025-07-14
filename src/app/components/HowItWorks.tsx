'use client';

import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from 'framer-motion';

import {
  MagnifyingGlassIcon,
  TicketIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

import { useEffect, useRef, useState } from 'react';

import { useTheme } from 'next-themes';

const HowItWorks = () => {
  const controls = useAnimation();

  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const steps = [
    {
      icon: (
        <MagnifyingGlassIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      ),

      title: 'Discover Events',

      desc: 'Browse 100+ concerts, sports, and cultural events across Eswatini',

      ariaLabel: 'Step 1: Discover Events',

      gradient: 'from-indigo-500 to-purple-500',

      particles: ['🎵', '🎤', '⚽'],
    },

    {
      icon: (
        <TicketIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      ),

      title: 'Secure Payment',

      desc: 'Pay via MTN Mobile Money, Visa, or cash at local booths',

      ariaLabel: 'Step 2: Secure Payment',

      gradient: 'from-purple-500 to-pink-500',

      particles: ['💵', '📱', '💳'],
    },

    {
      icon: (
        <QrCodeIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      ),

      title: 'Instant Access',

      desc: 'Receive QR codes via WhatsApp/SMS or NFC wristbands',

      ariaLabel: 'Step 3: Instant Access',

      gradient: 'from-pink-500 to-rose-500',

      particles: ['📲', '✉️', '🔑'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.15,

        when: 'beforeChildren',
      },
    },
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },

    visible: {
      y: 0,

      opacity: 1,

      transition: {
        type: 'spring',

        damping: 10,

        stiffness: 100,
      } as const,
    },
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0, rotateY: 15 },

    visible: (i: number) => ({
      y: 0,

      opacity: 1,

      rotateY: 0,

      transition: {
        delay: i * 0.15,

        type: 'spring',

        damping: 12,

        stiffness: 150,
      } as const,
    }),

    hover: {
      y: -15,

      scale: 1.03,

      transition: {
        type: 'spring',

        stiffness: 400,

        damping: 15,
      } as const,
    },

    tap: {
      scale: 0.97,
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, y: 20 },

    visible: (i: number) => ({
      opacity: 1,

      y: 0,

      x: Math.random() * 40 - 20,

      transition: {
        delay: i * 0.1,

        duration: 0.8,

        type: 'spring',

        stiffness: 100,
      } as const,
    }),

    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      id="how-it-works"
      className="relative pt-32  bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Animated background elements */}

      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />

        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-pink-400/10 blur-3xl" />

        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-indigo-400/10 blur-2xl"
          animate={{
            x: [0, 20, 0],

            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,

            repeat: Infinity,

            repeatType: 'reverse',

            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div variants={titleVariants}>
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
              Effortless Ticketing
            </span>

            <h2
              id="how-it-works-heading"
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Get Tickets in 3 Simple Steps
                </span>

                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1, ease: 'backOut' }}
                />
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From discovery to entry - faster than ever before
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none group overflow-hidden isolate"
              style={{
                transformStyle: 'preserve-3d',
              }}
              tabIndex={0}
              aria-label={step.ariaLabel}
            >
              {/* 3D depth effect */}

              <div
                className="absolute inset-0 rounded-3xl bg-white dark:bg-gray-800 shadow-lg -z-10"
                style={{
                  transform: 'translateZ(-10px)',

                  filter: 'blur(10px)',

                  opacity: 0.5,
                }}
              />

              {/* Animated gradient border */}

              <motion.div
                className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0.3,

                  background: `linear-gradient(to right, ${
                    theme === 'dark' ? '#7c3aed' : '#8b5cf6'
                  }, ${theme === 'dark' ? '#ec4899' : '#f472b6'})`,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Floating particles */}

              <AnimatePresence>
                {hoveredIndex === i && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {step.particles.map((emoji, idx) => (
                      <motion.span
                        key={idx}
                        className="absolute text-2xl opacity-70"
                        custom={idx}
                        variants={particleVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                          top: `${Math.random() * 80 + 10}%`,

                          left: `${Math.random() * 80 + 10}%`,
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              <div className="relative h-full">
                <div className="relative z-10">
                  <motion.div
                    className={`bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                    whileHover={{ rotate: 10 }}
                  >
                    {step.icon}
                  </motion.div>

                  <div className="absolute top-0 right-0 text-8xl font-bold text-gray-100 dark:text-gray-700/30 -z-10">
                    0{i + 1}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {step.desc}
                  </p>

                  <motion.div
                    className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 group/button"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-1">Learn more</span>

                    <svg
                      className="w-4 h-4 transition-transform group-hover/button:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating CTA */}

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
