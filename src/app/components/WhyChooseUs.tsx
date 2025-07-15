'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const stats = [
  {
    value: '5-8%',
    label: 'Lower Fees Than Competitors',
    id: 'stat-fees',
    icon: '💸',
    description:
      'We keep more money in your pocket with industry-low processing fees',
  },
  {
    value: '100%',
    label: 'Fraud-Free Transactions',
    id: 'stat-fraud',
    icon: '🛡️',
    description:
      'Blockchain-backed verification ensures every transaction is secure',
  },
  {
    value: '2M+',
    label: 'Happy Attendees',
    id: 'stat-attendees',
    icon: '🎉',
    description: 'Join millions who have experienced seamless event ticketing',
  },
  {
    value: '24/7',
    label: 'Cash & MoMo Support',
    id: 'stat-support',
    icon: '💬',
    description: 'Real human support anytime, with local payment options',
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="relative py-28 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-900/20 overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Animated floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -20, x: Math.random() * 100 - 50 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          className="absolute w-2 h-2 rounded-full bg-purple-400/30 dark:bg-purple-600/30 pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 10,
            },
          }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.2 },
            }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.3 },
              }}
              className="text-sm font-semibold tracking-wide uppercase text-purple-600 dark:text-purple-400"
            >
              The Eswatini Difference
            </motion.span>
          </motion.div>

          <motion.h2
            id="why-choose-us-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4 },
            }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why Choose Eswatini Events?
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{
                  scaleX: 1,
                  transition: { delay: 0.6, duration: 0.8 },
                }}
                className="absolute bottom-0 left-0 w-full h-3 bg-purple-100 dark:bg-purple-900/40 -z-0 transform translate-y-1 origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.8 },
            }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            The premier ticketing platform built specifically for
            Eswatini&apos;s unique needs, offering unparalleled features and
            local expertise.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 80, scale: 0.8, rotate: -5 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: i * 0.15,
                },
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -15,
                scale: 1.03,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { type: 'spring', bounce: 0.4 },
              }}
              whileFocus={{
                y: -15,
                scale: 1.03,
                boxShadow:
                  '0 0 0 3px rgba(124, 58, 237, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700 focus:outline-none group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-transparent"
              tabIndex={0}
              aria-labelledby={stat.id}
            >
              {/* Floating orb background */}
              <motion.div
                className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
              </motion.div>

              {/* Emoji icon with animation */}
              <motion.div
                className="text-4xl mb-4 relative"
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                {stat.icon}
              </motion.div>

              <motion.p
                id={stat.id}
                className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 relative"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: i * 0.15 + 0.3 },
                }}
              >
                {stat.value}
              </motion.p>

              <motion.h3
                className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: i * 0.15 + 0.4 },
                }}
              >
                {stat.label}
              </motion.h3>

              <motion.p
                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: i * 0.15 + 0.5 },
                }}
              >
                {stat.description}
              </motion.p>

              {/* Pulsing border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-2xl pointer-events-none"
                animate={{
                  scale: [1, 1.01, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Animated decorative element */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2 },
          }}
        >
          <motion.div
            className="inline-block px-6 py-3 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800/50"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0 0 rgba(124, 58, 237, 0)',
                '0 0 0 10px rgba(124, 58, 237, 0.1)',
                '0 0 0 0 rgba(124, 58, 237, 0)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <span className="text-sm font-medium text-purple-600 dark:text-purple-300">
              Trusted by event organizers nationwide
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
