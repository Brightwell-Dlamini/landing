'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Inspired by Eventbrite */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/public/images/logo.PNG"
                  alt="Eswatini Events Logo"
                  width={150}
                  height={40}
                  className="h-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events"
                  className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7 7 0 1116.65 4.35 7 7 0 1116.65 16.65z"
                    />
                  </svg>
                </span>
              </div>
              <select className="pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Mbabane</option>
              </select>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                Contact Sales
              </button>
              <Link
                href="/create"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm"
              >
                Create Events
              </Link>
              <div className="relative">
                <button className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm">
                  Help Center ▼
                </button>
              </div>
              <Link
                href="/tickets"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm"
              >
                Find my tickets
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-sm"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Inspired by SeatGeek */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Your next best night is waiting
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
              Discover unforgettable events in Eswatini
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link
                  href="/search"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Find Events Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories - Inspired by Eventbrite */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Browse by category
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'Music',
              'Food & Drink',
              'Arts',
              'Sports',
              'Business',
              'Community',
              'Hobbies',
              'Health',
            ].map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-sm text-center"
              >
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="text-gray-900 font-medium"
                >
                  {category}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
