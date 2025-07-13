'use client';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  MapPinIcon,
  FireIcon,
  StarIcon,
  TicketIcon,
  CalendarIcon,
  UsersIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import Image from 'next/image';

const events = [
  // Ticketed events
  {
    id: 1,
    title: 'MTN Bushfire Festival',
    description:
      "Africa's most internationally celebrated festival of music and arts",
    date: 'May 24-26, 2024',
    location: 'Malkerns Valley',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'From $50',
    rating: 4.8,
    category: 'Music Festival',
    ticketsLeft: 12,
    isFree: false,
    isTrending: true,
    isPopular: true,
  },
  {
    id: 2,
    title: 'Marula Festival',
    description:
      'Celebrating the harvest of the marula fruit with traditional music and dance',
    date: 'February 10-12, 2024',
    location: 'Hlane Royal National Park',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'From $30',
    rating: 4.5,
    category: 'Cultural',
    ticketsLeft: 45,
    isFree: false,
    isTrending: false,
    isPopular: true,
  },
  {
    id: 3,
    title: 'Sibebe Survivor Challenge',
    description:
      "Annual hike up Africa's largest granite dome with live music at the summit",
    date: 'September 2, 2024',
    location: 'Sibebe Rock',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'From $25',
    rating: 4.9,
    category: 'Adventure',
    ticketsLeft: 8,
    isFree: false,
    isTrending: true,
    isPopular: false,
  },
  {
    id: 4,
    title: 'Eswatini International Trade Fair',
    description:
      'Annual showcase of local and international businesses with live entertainment',
    date: 'August 30 - September 7, 2024',
    location: 'Mavuso Trade Centre, Manzini',
    image:
      'https://www.times.co.sz/wp-content/uploads/2023/09/Eswatini-International-Trade-Fair.jpg',
    price: 'From $10',
    rating: 4.2,
    category: 'Exhibition',
    ticketsLeft: 120,
    isFree: false,
    isTrending: false,
    isPopular: true,
  },
  // Free events
  {
    id: 5,
    title: 'Incwala Ceremony',
    description:
      "The King's sacred ceremony celebrating the first fruits of harvest",
    date: 'December 28, 2024',
    location: 'Ludzidzini Royal Residence',
    image:
      'https://www.swazilandnews.co.za/wp-content/uploads/2022/12/Incwala-1.jpg',
    price: 'Free Entry',
    rating: 4.7,
    category: 'Cultural',
    isFree: true,
    isTrending: true,
    isPopular: true,
  },
  {
    id: 6,
    title: 'Umhlanga Reed Dance',
    description:
      'Annual cultural event where young women present reeds to the Queen Mother',
    date: 'August 26 - September 2, 2024',
    location: 'Ludzidzini Royal Residence',
    image:
      'https://www.sundayworld.co.za/wp-content/uploads/2022/09/Umhlanga-Reed-Dance.jpg',
    price: 'Free Entry',
    rating: 4.8,
    category: 'Cultural',
    isFree: true,
    isTrending: true,
    isPopular: true,
  },
  {
    id: 7,
    title: 'Marula Moon Festival',
    description:
      'Celebration of marula season with traditional dances and cultural performances',
    date: 'February 15-17, 2024',
    location: 'Various Locations',
    image:
      'https://www.africa.com/wp-content/uploads/2020/02/Swaziland-Marula-Festival.jpg',
    price: 'Free Entry',
    rating: 4.3,
    category: 'Cultural',
    isFree: true,
    isTrending: false,
    isPopular: true,
  },
  {
    id: 8,
    title: 'Mantenga Cultural Village Show',
    description:
      'Daily cultural performances showcasing Swazi traditions and dances',
    date: 'Daily',
    location: 'Mantenga Cultural Village',
    image:
      'https://www.bigfive.com/wp-content/uploads/2019/06/Mantenga-Cultural-Village.jpg',
    price: 'Free Entry',
    rating: 4.4,
    category: 'Cultural',
    isFree: true,
    isTrending: false,
    isPopular: true,
  },
  {
    id: 9,
    title: 'Eswatini Fashion Week',
    description: 'Showcasing the best of Swazi and African fashion designers',
    date: 'November 15-17, 2024',
    location: 'Ezulwini Valley',
    image:
      'https://www.times.co.sz/wp-content/uploads/2022/11/Eswatini-Fashion-Week.jpg',
    price: 'From $15',
    rating: 4.1,
    category: 'Fashion',
    ticketsLeft: 65,
    isFree: false,
    isTrending: true,
    isPopular: false,
  },
  {
    id: 10,
    title: 'Swazi Rally Championship',
    description:
      'Annual motorsport event featuring local and regional rally drivers',
    date: 'July 20-21, 2024',
    location: 'Various Locations',
    image:
      'https://www.swazirally.co.sz/wp-content/uploads/2022/07/Swazi-Rally-2022.jpg',
    price: 'From $5',
    rating: 4.0,
    category: 'Sports',
    ticketsLeft: 200,
    isFree: false,
    isTrending: false,
    isPopular: true,
  },
];

const FeaturedEvents = () => {
  const ref = useRef(null);
  const [likedEvents, setLikedEvents] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const controls = useAnimation();

  // Calculate current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const toggleLike = (id: number) => {
    setLikedEvents((prev) =>
      prev.includes(id)
        ? prev.filter((eventId) => eventId !== id)
        : [...prev, id]
    );

    // Heart pulse animation
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    });
  };

  const paginate = (direction: 'prev' | 'next') => {
    setCurrentPage((prev) => {
      if (direction === 'prev' && prev > 1) return prev - 1;
      if (direction === 'next' && prev < totalPages) return prev + 1;
      return prev;
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Animated background elements */}
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
        {/* Section header */}
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
              ESKWATINI'S FINEST EVENTS
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Discover
            </span>{' '}
            & Experience
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            From cultural ceremonies to music festivals - your gateway to
            Eswatini's vibrant event scene
          </motion.p>
        </motion.div>

        {/* Events grid - single column */}
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {currentEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                damping: 10,
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -5,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image with overlay */}
                <div className="relative h-64 md:h-auto md:w-1/3 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/20" />

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    {event.isTrending && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold">
                        <FireIcon className="h-3 w-3 mr-1" />
                        TRENDING
                      </span>
                    )}
                    {event.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold">
                        <UsersIcon className="h-3 w-3 mr-1" />
                        POPULAR
                      </span>
                    )}
                    {event.isFree && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">
                        <TicketIcon className="h-3 w-3 mr-1" />
                        FREE ENTRY
                      </span>
                    )}
                  </div>

                  {/* Like button */}
                  <motion.button
                    onClick={() => toggleLike(event.id)}
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    aria-label="Save event"
                    animate={controls}
                  >
                    {likedEvents.includes(event.id) ? (
                      <FaHeart className="h-5 w-5 text-pink-500" />
                    ) : (
                      <FaRegHeart className="h-5 w-5 text-white" />
                    )}
                  </motion.button>
                </div>

                {/* Event content */}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-medium mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                      <FaShareAlt className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-5">
                    {event.description}
                  </p>

                  {/* Event details */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="h-5 w-5 mr-2 flex-shrink-0 text-purple-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPinIcon className="h-5 w-5 mr-2 flex-shrink-0 text-purple-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center text-amber-400 mr-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(event.rating) ? 'fill-current' : ''
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.rating} ({Math.floor(event.rating * 25)} reviews)
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <span
                        className={`text-lg font-bold ${
                          event.isFree
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        {event.price}
                      </span>
                      {!event.isFree && event.ticketsLeft < 50 && (
                        <span className="block text-xs text-red-500 dark:text-red-400">
                          Only {event.ticketsLeft} tickets left!
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 group ${
                        event.isFree
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      }`}
                    >
                      <span>{event.isFree ? 'Learn More' : 'Get Tickets'}</span>
                      <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mt-12 space-x-4"
        >
          <motion.button
            onClick={() => paginate('prev')}
            disabled={currentPage === 1}
            whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
            whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
            className={`p-3 rounded-full ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-800'
            }`}
          >
            <FaArrowLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => paginate('next')}
            disabled={currentPage === totalPages}
            whileHover={{ scale: currentPage < totalPages ? 1.1 : 1 }}
            whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
            className={`p-3 rounded-full ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-800'
            }`}
          >
            <FaArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
