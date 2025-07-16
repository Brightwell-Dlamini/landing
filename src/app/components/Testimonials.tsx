'use client';

import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { StarIcon, QuoteIcon, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Nomsa Dlamini',
    role: 'Festival Organizer',
    content:
      "Eswatini Events transformed our cultural festival! Ticket sales tripled and the platform's mobile money integration made payments seamless for our local attendees.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Sipho Mamba',
    role: 'Concert Promoter',
    content:
      'The analytics dashboard gave us incredible insights into our audience. We optimized our marketing and saw a 40% increase in ticket sales for our jazz festival!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Thandiwe Nkosi',
    role: 'Event Attendee',
    content:
      "I've been to 8 events booked through this platform - every experience has been flawless. The QR code entry is so fast, I never wait in line anymore!",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'Bongani Shongwe',
    role: 'Sports Coordinator',
    content:
      'Managing our soccer tournament tickets was effortless. The team even helped us set up special student pricing that increased youth attendance by 65%.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 5,
    name: 'Lindiwe Zwane',
    role: 'Arts Director',
    content:
      "Our theater group went from paper tickets to this platform. The difference is night and day - we're reaching new audiences and growing every season.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
];

const TestimonialsCosmic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Auto-rotate testimonials
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isInView, controls]);

  // Constellation animation
  const drawConstellation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 1.5,
        ease: 'easeInOut',
      },
    }),
  };

  // Testimonial card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
    exit: { opacity: 0, x: -100 },
  };

  // Star rating animation
  const starVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
      },
    }),
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-950 overflow-hidden isolate"
      aria-labelledby="testimonials-heading"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            custom={i % 10}
            initial="hidden"
            animate={controls}
            variants={drawConstellation}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}

        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            initial={{
              opacity: 0,
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100 + 100}vh`,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 15 + 10,
              ease: 'linear',
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
            }}
          />
        ))}

        {/* Nebula effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 0.3 },
          }}
          className="absolute -left-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mix-blend-soft-light blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 0.2, transition: { delay: 0.5 } },
          }}
          className="absolute -right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mix-blend-soft-light blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
          }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.2 },
            }}
            className="inline-flex items-center gap-2 mb-6"
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
              <Sparkles className="w-6 h-6 text-purple-400" />
            </motion.div>
            <span className="text-sm font-semibold tracking-wide uppercase text-purple-400">
              Voices of Eswatini
            </span>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.4 },
            }}
            className="text-5xl font-bold text-white mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cosmic Praise
            </span>{' '}
            From Our Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.6 },
            }}
            className="text-xl text-purple-200 max-w-3xl mx-auto"
          >
            Don't just take our word for it - hear from event creators and
            attendees who've had stellar experiences with our platform.
          </motion.p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative h-[500px]">
          {/* Floating avatars orbit */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
                transition: {
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80"
            >
              {testimonials.map((testimonial, i) => {
                const angle = i * (360 / testimonials.length) * (Math.PI / 180);
                const x = Math.cos(angle) * 120;
                const y = Math.sin(angle) * 120;

                return (
                  <motion.button
                    key={`orbit-${testimonial.id}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      x,
                      y,
                      transition: { delay: i * 0.2 + 0.8 },
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveIndex(i)}
                    className={`absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-full overflow-hidden border-2 ${
                      i === activeIndex
                        ? 'border-purple-400 shadow-lg shadow-purple-500/30'
                        : 'border-white/20'
                    } transition-all duration-300`}
                    aria-label={`View testimonial from ${testimonial.name}`}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt=""
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Active testimonial card */}
          <div className="relative h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 max-w-2xl mx-auto w-full"
              >
                {/* Floating quote icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 0.1,
                    y: 0,
                    transition: { delay: 0.3 },
                  }}
                  className="absolute -top-4 -right-4 text-purple-400/10"
                >
                  <QuoteIcon className="w-32 h-32" />
                </motion.div>

                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`star-${i}`}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={starVariants}
                      whileHover="pulse"
                      className={`${
                        i < testimonials[activeIndex].rating
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    >
                      <StarIcon className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial content */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.5 },
                  }}
                  className="text-lg text-white mb-6 leading-relaxed"
                >
                  {testimonials[activeIndex].content}
                </motion.blockquote>

                {/* Author info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.7 },
                  }}
                  className="flex items-center"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400">
                      <Image
                        src={testimonials[activeIndex].avatar}
                        width={48}
                        height={48}
                        alt={testimonials[activeIndex].name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-purple-300">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </motion.div>

                {/* Navigation dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.9 },
                  }}
                  className="flex justify-center mt-8 space-x-2"
                >
                  {testimonials.map((_, i) => (
                    <button
                      key={`dot-${i}`}
                      onClick={() => setActiveIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === activeIndex ? 'bg-purple-400 w-6' : 'bg-white/30'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2 },
          }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl mx-auto focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300">
              <Sparkles className="h-5 w-5" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 group-hover:text-white transition-all duration-300">
                Join Our Stellar Community
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCosmic;
