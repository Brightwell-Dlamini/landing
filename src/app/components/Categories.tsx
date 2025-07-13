'use client';

import { motion } from 'motion/react';
import { InView } from 'react-intersection-observer';

const categories = [
  {
    name: 'Music',
    icon: '🎵',
    color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
  },
  {
    name: 'Sports',
    icon: '⚽',
    color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
  },
  {
    name: 'Arts & Theater',
    icon: '🎭',
    color:
      'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
  },
  {
    name: 'Food & Drink',
    icon: '🍔',
    color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
  },
  {
    name: 'Business',
    icon: '💼',
    color:
      'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  },
  {
    name: 'Community',
    icon: '👥',
    color:
      'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300',
  },
  {
    name: 'Education',
    icon: '📚',
    color: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300',
  },
  {
    name: 'Nightlife',
    icon: '🌘',
    color: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300',
  },
];

const Categories = () => {
  return (
    <section className="pb-12  bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={InView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        ></motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-2xl mb-2`}
              >
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
