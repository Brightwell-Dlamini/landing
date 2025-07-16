'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  FaMusic,
  FaGlassMartiniAlt,
  FaTheaterMasks,
  FaCalendarAlt,
  FaHeart,
  FaUtensils,
  FaBriefcase,
  FaMonument,
  FaList,
} from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Category {
  name: string;
  icon: React.ReactNode;
}

const Categories = () => {
  const categories = useMemo<Category[]>(
    () => [
      { name: 'All', icon: <FaList size={24} /> },
      { name: 'Concerts', icon: <FaMusic size={24} /> },
      { name: 'Nightlife', icon: <FaGlassMartiniAlt size={24} /> },
      { name: 'Arts & Theater', icon: <FaTheaterMasks size={24} /> },
      { name: 'Festivals', icon: <FaCalendarAlt size={24} /> },
      { name: 'Dating', icon: <FaHeart size={24} /> },
      { name: 'Food & Drink', icon: <FaUtensils size={24} /> },
      { name: 'Business', icon: <FaBriefcase size={24} /> },
      { name: 'Cultural', icon: <FaMonument size={24} /> },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'All'
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 4 : 5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(categories.length / visibleCount);
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < totalPages - 1;

  const visibleCategories = categories.slice(
    currentIndex * visibleCount,
    (currentIndex + 1) * visibleCount
  );

  const displayCategories = [
    ...visibleCategories,
    ...Array(Math.max(0, visibleCount - visibleCategories.length)).fill(null),
  ];

  if (categories.length === 0) {
    return <div className="py-8 text-center">No categories available</div>;
  }

  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Arrows - Made larger */}
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={!canScrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-30 transition-all"
          aria-label="Previous categories"
        >
          <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={!canScrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-30 transition-all"
          aria-label="Next categories"
        >
          <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Centered Categories Grid - Larger items */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="grid grid-cols-4 md:grid-cols-5 gap-6 w-full max-w-5xl" // Increased gap and max-width
          >
            {displayCategories.map((category, index) => (
              <motion.div
                key={category?.name || `empty-${index}`}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center w-full group ${
                      selectedCategory === category.name
                        ? 'active-category'
                        : ''
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="relative p-2 mb-4">
                      {' '}
                      {/* Increased padding */}
                      {/* Circular accent - thicker border */}
                      <div
                        className={`absolute inset-0 rounded-full border-[3px] ${
                          selectedCategory === category.name
                            ? 'border-purple-500 dark:border-purple-400 opacity-100'
                            : 'border-purple-200 dark:border-purple-900 opacity-0 group-hover:opacity-100'
                        } transition-opacity duration-300`}
                      />
                      {/* Icon container - larger */}
                      <div
                        className={`p-5 rounded-full ${
                          selectedCategory === category.name
                            ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50'
                            : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30'
                        } transition-all duration-300`}
                      >
                        <div
                          className={`${
                            selectedCategory === category.name
                              ? 'text-purple-600 dark:text-purple-400'
                              : 'text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                          } text-2xl`}
                        >
                          {' '}
                          {/* Larger text size */}
                          {category.icon}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-base font-semibold ${
                        selectedCategory === category.name
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                      } text-center`}
                    >
                      {' '}
                      {/* Larger and bolder text */}
                      {category.name}
                    </span>
                  </motion.button>
                ) : (
                  <div className="p-5 opacity-0">
                    <div className="w-16 h-16"></div> {/* Larger placeholder */}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots - Slightly larger */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-3 mt-8">
            {' '}
            {/* Increased spacing */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-purple-600 dark:bg-purple-400 w-5'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
