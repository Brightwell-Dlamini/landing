'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  FaMusic,
  FaGlassMartiniAlt,
  FaTheaterMasks,
  FaCalendarAlt,
  FaHeart,
  FaUtensils,
  FaBriefcase,
  FaMonument,
} from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Categories = () => {
  const categories = [
    { name: 'Concerts', icon: <FaMusic /> },
    { name: 'Nightlife', icon: <FaGlassMartiniAlt /> },
    { name: 'Arts & Theater', icon: <FaTheaterMasks /> },
    { name: 'Festivals', icon: <FaCalendarAlt /> },
    { name: 'Dating', icon: <FaHeart /> },
    { name: 'Food & Drink', icon: <FaUtensils /> },
    { name: 'Business', icon: <FaBriefcase /> },
    { name: 'Cultural', icon: <FaMonument /> },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5; // Always show 5 items

  const totalPages = Math.ceil(categories.length / visibleCount);
  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < totalPages - 1;

  // Calculate the subset of categories to display
  const visibleCategories = categories.slice(
    currentIndex * visibleCount,
    (currentIndex + 1) * visibleCount
  );

  // Ensure we have exactly 5 items (fill with empty if needed)
  const displayCategories = [
    ...visibleCategories,
    ...Array(Math.max(0, visibleCount - visibleCategories.length)).fill(null),
  ];

  return (
    <section className="relative bg-white dark:bg-gray-900 py-8 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={!canScrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md disabled:opacity-30"
        >
          <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={!canScrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md disabled:opacity-30"
        >
          <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Centered Categories Grid */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="grid grid-cols-5 gap-4 w-full max-w-3xl" // Centered with max-width
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
                    className="flex flex-col items-center w-full group"
                  >
                    <div className="relative p-1 mb-3">
                      {/* Circular accent */}
                      <div className="absolute inset-0 rounded-full border-2 border-purple-200 dark:border-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Icon container */}
                      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 transition-all duration-300">
                        <div className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 text-xl">
                          {category.icon}
                        </div>
                      </div>
                    </div>

                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 text-center">
                      {category.name}
                    </span>
                  </motion.button>
                ) : (
                  <div className="p-4 opacity-0">
                    {' '}
                    {/* Empty placeholder */}
                    <div className="w-12 h-12"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-purple-600 dark:bg-purple-400 w-4'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
