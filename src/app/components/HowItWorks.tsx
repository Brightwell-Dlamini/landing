'use client';
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  MagnifyingGlassIcon,
  TicketIcon,
  QrCodeIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const HowItWorks = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

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

//   const titleVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         damping: 10,
//         stiffness: 100,
//       } as const,
//     },
//   };

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
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Animated background elements - consistent with FeaturedEvents */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 dark:opacity-10" />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0.5, 0],
              transition: {
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5,
              },
            }}
            className="absolute rounded-full bg-purple-500/10 dark:bg-pink-500/10"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header - consistent with FeaturedEvents */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-sm font-medium">
              <FireIcon className="h-4 w-4 mr-2 text-purple-500" />
              SIMPLE PROCESS
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              How It Works
            </span>{' '}
            in 3 Easy Steps
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From discovery to entry - faster than ever before
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
              className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none group overflow-hidden isolate"
              style={{
                transformStyle: 'preserve-3d',
              }}
              tabIndex={0}
              aria-label={step.ariaLabel}
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-xl p-[2px] pointer-events-none"
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
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
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
      </div>
    </section>
  );
};

export default HowItWorks;
