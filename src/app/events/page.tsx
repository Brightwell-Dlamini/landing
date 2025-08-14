'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  CalendarIcon,
  MapPinIcon,
  MagnifyingGlassCircleIcon,
  ChevronDownIcon,
  TicketIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import FeaturedEvents from '../components/FeaturedEvents';

// Mock data - replace with API calls later
const allEvents = [
  // Include all events from FeaturedEvents.tsx plus more
  ...FeaturedEvents.events,
  {
    id: 13,
    title: 'Hlane Wildlife Festival',
    description:
      'Celebration of wildlife conservation with guided safaris and educational tours',
    date: 'March 15-17, 2025',
    location: 'Hlane Royal National Park',
    image: '/images/wildlife.jpg',
    price: 40,
    category: 'Nature',
    isTrending: false,
    rating: 4.6,
    ticketsLeft: 78,
    totalTickets: 300,
    ticketsSold: 222,
  },
  // Add more events as needed
];

const EventsPage = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter events based on selections
  const filteredEvents = allEvents.filter((event) => {
    // Category filter
    const categoryMatch =
      selectedCategory === 'all' ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query filter
    const searchMatch =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter (simplified for demo)
    const dateMatch =
      dateFilter === 'all' ||
      (dateFilter === 'upcoming' && new Date(event.date) > new Date()) ||
      (dateFilter === 'past' && new Date(event.date) < new Date());

    // Location filter
    const locationMatch =
      locationFilter === 'all' ||
      event.location.toLowerCase().includes(locationFilter.toLowerCase());

    // Price filter
    const priceMatch =
      priceFilter === 'all' ||
      (priceFilter === 'free' && event.price === 0) ||
      (priceFilter === 'paid' && event.price > 0);

    return (
      categoryMatch && searchMatch && dateMatch && locationMatch && priceMatch
    );
  });

  // Group events by category for the sidebar
  const categories = [
    { id: 'all', name: 'All Events', count: allEvents.length },
    {
      id: 'music',
      name: 'Music',
      count: allEvents.filter((e) => e.category.toLowerCase().includes('music'))
        .length,
    },
    {
      id: 'cultural',
      name: 'Cultural',
      count: allEvents.filter((e) =>
        e.category.toLowerCase().includes('cultural')
      ).length,
    },
    {
      id: 'sports',
      name: 'Sports',
      count: allEvents.filter((e) =>
        e.category.toLowerCase().includes('sports')
      ).length,
    },
    {
      id: 'food',
      name: 'Food & Drink',
      count: allEvents.filter((e) => e.category.toLowerCase().includes('food'))
        .length,
    },
    {
      id: 'business',
      name: 'Business',
      count: allEvents.filter((e) =>
        e.category.toLowerCase().includes('business')
      ).length,
    },
    {
      id: 'adventure',
      name: 'Adventure',
      count: allEvents.filter((e) =>
        e.category.toLowerCase().includes('adventure')
      ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Amazing Events in Eswatini
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              From cultural festivals to music concerts - find your next
              experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Categories
              </h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Mobile filters toggle */}
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="md:hidden mt-6 w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
              >
                <span>Filters</span>
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isFiltersOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Filters - shown on mobile when toggled */}
              <div
                className={`${
                  isFiltersOpen ? 'block' : 'hidden'
                } md:block mt-6`}
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Filters
                </h2>

                <div className="space-y-4">
                  {/* Date Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Dates</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past Events</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Locations</option>
                      <option value="Mbabane">Mbabane</option>
                      <option value="Manzini">Manzini</option>
                      <option value="Ezulwini">Ezulwini Valley</option>
                      <option value="Lobamba">Lobamba</option>
                      <option value="Hlane">Hlane</option>
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="all">All Prices</option>
                      <option value="free">Free Only</option>
                      <option value="paid">Paid Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/events/${event.id}`} className="block">
                      <div className="relative h-48">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200">
                            {event.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex space-x-1">
                          {event.isTrending && (
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                              <FireIcon className="h-3 w-3 mr-1" />
                              Trending
                            </span>
                          )}
                          {event.price === 0 && (
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              Free
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            {event.price > 0 ? (
                              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                E{event.price}
                              </span>
                            ) : (
                              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                Free Entry
                              </span>
                            )}
                          </div>
                          <button className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                            <TicketIcon className="h-4 w-4 mr-1" />
                            Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-4">
                  <MagnifyingGlassCircleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No events found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
