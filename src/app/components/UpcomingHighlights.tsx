'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const events = [
  {
    id: 1,
    name: 'MTN Bushfire Festival',
    date: '2025-05-30',
    location: 'Malkerns Valley',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ticketsLeft: 12,
    imagePriority: true,
    category: 'Music Festival',
  },
  {
    id: 2,
    name: 'Eswatini vs Nigeria',
    date: '2025-03-15',
    location: 'Somhlolo Stadium',
    image:
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1605&q=80',
    ticketsLeft: 43,
    imagePriority: false,
    category: 'Sports',
  },
];

const UpcomingHighlights = () => {
  return (
    <section
      id="upcoming-events"
      className="relative py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
      aria-labelledby="upcoming-events-heading"
    >
      {/* Animated floating confetti */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: -20,
            x: Math.random() * 100 - 50,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, Math.random() * 200 - 100],
            x: [0, Math.random() * 200 - 100],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          className="absolute w-3 h-3 rounded-sm bg-gradient-to-r from-purple-400 to-pink-400 pointer-events-none"
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
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <SparklesIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.3 },
              }}
              className="text-sm font-semibold tracking-wide uppercase text-purple-600 dark:text-purple-400"
            >
              Hot Tickets
            </motion.span>
          </motion.div>

          <motion.h2
            id="upcoming-events-heading"
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
                Don&apos;t Miss These
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
            Upcoming highlights with limited tickets - secure your spot before
            they&apos;re gone!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -2 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: i * 0.2,
                },
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -15,
                transition: { type: 'spring', bounce: 0.4 },
              }}
              whileFocus={{
                y: -15,
                outline: 'none',
                boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.5)',
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg focus:outline-none transition-all duration-300 hover:shadow-xl"
              tabIndex={0}
              aria-labelledby={`event-${event.id}-title`}
            >
              {/* Floating particles inside card */}
              {[...Array(5)].map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.2, 0],
                    y: [0, Math.random() * 50 - 25],
                    x: [0, Math.random() * 50 - 25],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: Math.random() * 3,
                  }}
                  className="absolute w-1 h-1 rounded-full bg-white/50 pointer-events-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              <motion.div
                className="relative h-80"
                whileHover={{
                  scale: 1.02,
                  transition: { delay: 0.1 },
                }}
              >
                <Image
                  src={event.image}
                  alt={`${event.name} promotional image`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={event.imagePriority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 0.7 }}
                />

                {/* Category badge with animation */}
                <motion.div
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 shadow-sm"
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: { delay: i * 0.2 + 0.3 },
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    type: 'spring',
                    duration: 0.5,
                  }}
                >
                  {event.category}
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: i * 0.2 + 0.4 },
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      id={`event-${event.id}-title`}
                      className="text-2xl font-bold text-white"
                      whileHover={{ x: 5 }}
                    >
                      {event.name}
                    </motion.h3>
                    <motion.div
                      className="flex items-center text-gray-200 mt-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{
                          x: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      >
                        <MapPinIcon className="h-5 w-5 mr-2" />
                      </motion.div>
                      <span>{event.location}</span>
                    </motion.div>
                  </div>
                  <motion.span
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md"
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                        '0 10px 15px -3px rgba(220, 38, 38, 0.4)',
                        '0 4px 6px -1px rgba(220, 38, 38, 0.3)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    Only {event.ticketsLeft} left
                  </motion.span>
                </div>

                <motion.div
                  className="mt-6 flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { delay: i * 0.2 + 0.6 },
                  }}
                >
                  <motion.div
                    className="flex items-center gap-2 text-white"
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                  >
                    <ClockIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">12d 4h left</span>
                  </motion.div>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg transition-all"
                    aria-label={`Get tickets for ${event.name}`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    Get Tickets
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingHighlights;
