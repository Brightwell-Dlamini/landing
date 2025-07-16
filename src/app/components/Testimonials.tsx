'use client';
import { motion, useAnimation } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Sparkles, Gem, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    id: 1,
    quote:
      'Reduced no-shows by 50% with dynamic pricing. Our attendees love the mobile tickets!',
    name: 'Sidvokodvo Riders',
    role: 'Motorsport Event Organizer',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    highlight: 'Dynamic Pricing',
    stats: '↑ 50% attendance',
    color: 'from-amber-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-amber-500/5 to-pink-500/5',
  },
  {
    id: 2,
    quote:
      'The NFC wristbands revolutionized our vendor payments. No more cash handling!',
    name: 'MTN Bushfire Team',
    role: 'Music Festival',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    highlight: 'Cashless Payments',
    stats: '↓ 80% cash fraud',
    color: 'from-purple-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-purple-500/5 to-cyan-500/5',
  },
  {
    id: 3,
    quote:
      'Finally a platform that understands African payment methods. MTN MoMo integration is a game-changer.',
    name: 'Luju Festival',
    role: 'Cultural Event',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    highlight: 'Local Payments',
    stats: '↑ 3x faster payouts',
    color: 'from-emerald-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-emerald-500/5 to-blue-500/5',
  },
];

export default function Testimonials() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden isolate bg-white dark:bg-gray-950"
    >
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating diamond grid */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="grid grid-cols-12 gap-4 w-full h-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  transition: {
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  },
                }}
                className="w-full h-full border border-gray-300 dark:border-gray-700 rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Animated gradient mesh */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 0.3,
              transition: { duration: 2 },
            },
          }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-pink-500/10"
        />

        {/* Floating 3D spheres */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.2, 1],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                transition: {
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: Math.random() * 3,
                },
              },
            }}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-purple-500/10' : 'bg-pink-500/10'
            } blur-xl`}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 shadow-sm"
            whileHover={{ y: -2 }}
          >
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-300 uppercase">
              Trusted by Visionary Organizers
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Unparalleled Event Success
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: {
                    delay: 0.8,
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 -z-0 transform translate-y-2 origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            Discover how Africa&apos;s most
            <span className="font-medium text-purple-600 dark:text-purple-400">
              forward-thinking event creators
            </span>{' '}
            are achieving extraordinary outcomes
          </motion.p>
        </motion.div>

        {/* Luxury testimonial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 80, rotateX: 15 }}
              animate={controls}
              transition={{
                delay: 0.2 + i * 0.15,
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 1,
              }}
              whileHover={{
                y: -15,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className="relative group perspective-1000"
            >
              {/* Card reflection effect */}
              <div className="absolute -bottom-8 left-0 right-0 h-1/3 bg-gradient-to-t from-white/30 to-transparent dark:from-gray-950/30 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main card */}
              <div
                className={`relative h-full p-0.5 rounded-3xl ${testimonial.bgColor} backdrop-blur-sm`}
              >
                <div className="relative bg-white/80 dark:bg-gray-900/80 p-8 rounded-[calc(1.5rem-1px)] h-full border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
                  {/* Floating highlight badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.4 + i * 0.1 },
                    }}
                    className="absolute -top-3 -right-3 z-20"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          transition: {
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30"
                      />
                      <div
                        className={`relative bg-gradient-to-r ${testimonial.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {testimonial.highlight}
                      </div>
                    </div>
                  </motion.div>

                  {/* Quote decoration */}
                  <FaQuoteLeft className="absolute top-8 left-8 text-purple-500/5 dark:text-purple-400/5 text-7xl" />

                  {/* Profile image with floating effect */}
                  <motion.div
                    className="relative w-24 h-24 rounded-full overflow-hidden mb-8 mx-auto border-4 border-white dark:border-gray-900 shadow-lg z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { delay: 0.3 + i * 0.1 },
                    }}
                    whileHover={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Profile glow */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </motion.div>

                  {/* Animated stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: 1,
                          transition: {
                            delay: j * 0.1 + i * 0.2 + 0.4,
                            type: 'spring',
                            stiffness: 500,
                          },
                        }}
                        whileHover={{ scale: 1.3 }}
                      >
                        <FaStar className="text-yellow-400 text-xl drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <div className="relative z-10">
                    <motion.p
                      className="italic text-gray-700 dark:text-gray-300 mb-8 text-center text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5 + i * 0.1 },
                      }}
                    >
                      &quote;{testimonial.quote}&quote;
                    </motion.p>
                    {/* Stats chip */}
                    <motion.div
                      className={`bg-gradient-to-r ${testimonial.color} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 mx-auto w-fit`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.6 + i * 0.1 },
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonial.stats}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.7 + i * 0.1 },
                      }}
                      className="text-center"
                    >
                      <p className="font-bold text-gray-900 dark:text-white text-xl mb-1">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your beloved CTA button (kept as requested) */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl mx-auto border border-gray-200 dark:border-gray-700 transition-all duration-300">
              <Gem className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 group-hover:text-white dark:group-hover:text-white transition-all duration-300">
                Join Our Elite Network
              </span>
              <ChevronRight className="w-5 h-5 -mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>

          <motion.p
            className="text-gray-500 dark:text-gray-400 mt-6 text-sm flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Limited availability for new organizers
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
