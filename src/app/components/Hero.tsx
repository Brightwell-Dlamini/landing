'use client';

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  MusicalNoteIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Enhanced scroll effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.7], [0, 4]);
  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);

  // Image carousel for background
  const images = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2094&q=80',
  ];

  // Event type suggestions
  const eventTypes = [
    'Afrobeat',
    'Traditional',
    'EDM',
    'Jazz',
    'Hip Hop',
    'Gospel',
  ];
  const [currentEventType, setCurrentEventType] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    const imageInterval = setInterval(() => {
      if (!isHovering) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 6000);

    const eventTypeInterval = setInterval(() => {
      setCurrentEventType((prev) => (prev + 1) % eventTypes.length);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(eventTypeInterval);
    };
  }, [isHovering, images.length, eventTypes.length]);

  if (!isMounted) {
    return (
      <section
        ref={ref}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900"
      />
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic background images with smooth transitions */}
      <motion.div
        style={{ y: backgroundY, scale, filter }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <Image
              src={images[currentImageIndex]}
              alt="Eswatini cultural events"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle animated particles */}
        <div className="absolute inset-0 overflow-hidden z-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: [0, 0.6, 0],
                transition: {
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              }}
              className="absolute w-1 h-1 rounded-full bg-pink-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content with enhanced scroll effects */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-30 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.4, 1] }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/20 mb-6"
          >
            <motion.p
              className="text-sm font-medium text-white flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <MusicalNoteIcon className="h-4 w-4 mr-2 text-pink-400" />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {eventTypes[currentEventType]} Events
              </span>
            </motion.p>
          </motion.div>

          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Eswatini
            </motion.span>{' '}
            <motion.br
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comes Alive
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200"
          >
            Discover the pulse of Africa&apos;s hidden gem. Concerts, festivals,
            and cultural experiences that will move your soul.
          </motion.p>
        </motion.div>

        {/* Enhanced search card with floating effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
          whileHover={{ y: -5 }}
          className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto backdrop-blur-lg border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700/80 dark:text-white transition-all duration-200"
                placeholder={`Find ${eventTypes[currentEventType]} events...`}
                type="search"
              />
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700/80 dark:text-white transition-all duration-200"
                placeholder="Anywhere in Eswatini"
                type="text"
              />
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700/80 dark:text-white transition-all duration-200"
                placeholder="Whenever you ready!"
                type="text"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
            >
              <TicketIcon className="h-5 w-5" />
              Find Events
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <motion.a
            whileHover={{ y: -3 }}
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-blue-600/30 transition-colors"
          >
            <FaFacebook className="text-blue-500 text-2xl mr-2" />
            <span className="text-gray-300">Follow on Facebook</span>
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-blue-400/30 transition-colors"
          >
            <FaTwitter className="text-blue-400 text-2xl mr-2" />
            <span className="text-gray-300">Follow on X</span>
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-green-500/30 transition-colors"
          >
            <FaWhatsapp className="text-green-500 text-2xl mr-2" />
            <span className="text-gray-300">Chat on WhatsApp</span>
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-pink-600/30 transition-colors"
          >
            <FaInstagram className="text-pink-500 text-2xl mr-2" />
            <span className="text-gray-300">Follow on Instagram</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          className="animate-bounce flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
        >
          <p className="text-gray-300 text-sm mb-2">Explore the rhythm</p>
          <div className="flex items-end h-8 gap-1">
            {[2, 4, 6, 8, 6, 4, 2].map((height, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${height}px`, `${height + 4}px`, `${height}px`],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 bg-gradient-to-t from-purple-400 to-pink-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {['♪', '♫', '♬', '♩'].map((note, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              rotate: Math.random() * 360,
              opacity: 0,
            }}
            animate={{
              y: [0, -50],
              opacity: [0, 0.8, 0],
              transition: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
              },
            }}
            className="absolute text-white/30 text-xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${50 + Math.random() * 40}%`,
            }}
          >
            {note}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
