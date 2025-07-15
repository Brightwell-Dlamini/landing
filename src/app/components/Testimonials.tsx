'use client';
import { motion, useAnimation, Variants } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Sparkles, Gem, Zap } from 'lucide-react';
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
  },
];

const Testimonials = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const floatingVariants: Variants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-white via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Animated background particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: [0, 0.3, 0],
                y: [0, Math.random() * 200 - 100],
                x: [0, Math.random() * 200 - 100],
                rotate: [0, Math.random() * 360],
              },
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 rounded-full bg-purple-400/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Glowing orb effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        variants={{
          visible: {
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }}
        className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        variants={{
          visible: {
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.2, 1],
            transition: {
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            },
          },
        }}
        className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl mix-blend-multiply dark:mix-blend-screen"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 mb-6 px-6 py-2 rounded-full bg-purple-100/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50"
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <motion.span className="text-sm font-semibold tracking-wide uppercase text-purple-600 dark:text-purple-400">
              Trusted by the best
            </motion.span>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Event Success Stories
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { delay: 0.8, duration: 1.2 },
                }}
                className="absolute bottom-0 left-0 w-full h-3 bg-purple-100 dark:bg-purple-900/40 -z-0 transform translate-y-1 origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Hear how Africa&apos;s top event organizers are transforming their
            businesses
          </motion.p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              custom={i}
              whileHover="hover"
              className="relative group perspective-1000"
            >
              {/* 3D card effect */}
              <motion.div
                variants={{
                  hover: {
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.03,
                    transition: { duration: 0.5 },
                  },
                }}
                className="transform-style-preserve-3d transition-all duration-500 h-full"
              >
                <motion.div
                  variants={floatingVariants}
                  className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl relative h-full border border-gray-100 dark:border-gray-700/50 overflow-hidden transform-style-preserve-3d"
                >
                  {/* Floating highlight badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.2 + 0.4 },
                    }}
                    className="absolute -top-3 -right-3 z-20"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          transition: {
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30"
                      />
                      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {testimonial.highlight}
                      </div>
                    </div>
                  </motion.div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                  </motion.div>

                  {/* Quote icon */}
                  <FaQuoteLeft
                    className="text-purple-500/10 dark:text-purple-400/10 text-7xl absolute top-6 left-6"
                    aria-hidden="true"
                  />

                  {/* Profile image with parallax effect */}
                  <motion.div
                    className="relative w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-white dark:border-gray-800 mx-auto shadow-lg z-10"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: i * 0.2 + 0.3 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      type: 'spring',
                      duration: 0.5,
                    }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Stars rating with animation */}
                  <motion.div
                    className="flex justify-center gap-1 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: i * 0.2 + 0.4 },
                    }}
                  >
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <motion.div
                        key={j}
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, -15, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: j * 0.1 + i * 0.2 + 0.4,
                        }}
                      >
                        <FaStar className="text-yellow-400 text-xl" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial quote */}
                  <motion.p
                    className="italic text-gray-700 dark:text-gray-300 mb-8 relative z-10 text-center text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: i * 0.2 + 0.5 },
                    }}
                  >
                    &quot;{testimonial.quote}&quot;
                  </motion.p>

                  {/* Author info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: i * 0.2 + 0.6 },
                    }}
                    className="text-center"
                  >
                    <p className="font-bold text-gray-900 dark:text-white text-xl">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {testimonial.role}
                    </p>
                  </motion.div>

                  {/* Floating particles around card */}
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.4, 0],
                        y: [0, Math.random() * 40 - 20],
                        x: [0, Math.random() * 40 - 20],
                      }}
                      transition={{
                        duration: 6 + Math.random() * 5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: Math.random() * 3,
                      }}
                      className="absolute w-1 h-1 rounded-full bg-purple-400/50 pointer-events-none"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2 },
          }}
          className="mt-24 text-center"
        >
          <motion.div
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl hover:shadow-2xl transition-shadow"
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 4px 20px -5px rgba(124, 58, 237, 0.3)',
                '0 10px 30px -5px rgba(124, 58, 237, 0.5)',
                '0 4px 20px -5px rgba(124, 58, 237, 0.3)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <button className="flex items-center gap-2 text-white font-bold text-lg">
              <Gem className="w-5 h-5" />
              Join 500+ Elite Event Organizers
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
