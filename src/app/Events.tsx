'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { FaChevronDown } from 'react-icons/fa';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import Image from 'next/image';

// Mock data for event categories and filters
const eventCategories = [
  { id: 'all', name: 'All Events' },
  { id: 'music', name: 'Music' },
  { id: 'sports', name: 'Sports' },
  { id: 'arts', name: 'Arts & Theater' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'business', name: 'Business' },
  { id: 'community', name: 'Community' },
  { id: 'festivals', name: 'Festivals' },
];

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'mbabane', name: 'Mbabane' },
  { id: 'manzini', name: 'Manzini' },
  { id: 'ezulwini', name: 'Ezulwini' },
  { id: 'siteki', name: 'Siteki' },
  { id: 'big-bend', name: 'Big Bend' },
  { id: 'hlane', name: 'Hlane' },
];

const dateFilters = [
  { id: 'all', name: 'All Dates' },
  { id: 'today', name: 'Today' },
  { id: 'tomorrow', name: 'Tomorrow' },
  { id: 'this-weekend', name: 'This Weekend' },
  { id: 'next-week', name: 'Next Week' },
  { id: 'this-month', name: 'This Month' },
  { id: 'next-month', name: 'Next Month' },
];

const priceFilters = [
  { id: 'all', name: 'Any Price' },
  { id: 'free', name: 'Free Only' },
  { id: 'under-100', name: 'Under E100' },
  { id: '100-500', name: 'E100 - E500' },
  { id: '500-plus', name: 'E500+' },
];

const sortOptions = [
  { id: 'date-asc', name: 'Date: Soonest First' },
  { id: 'date-desc', name: 'Date: Latest First' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'newest', name: 'Newly Added' },
];

const EventsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get('region') || 'all'
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get('date') || 'all'
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get('price') || 'all'
  );
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get('sort') || 'date-asc'
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters and update URL
  const applyFilters = () => {
    setIsLoading(true);
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedRegion !== 'all') params.set('region', selectedRegion);
    if (selectedDate !== 'all') params.set('date', selectedDate);
    if (selectedPrice !== 'all') params.set('price', selectedPrice);
    if (selectedSort !== 'date-asc') params.set('sort', selectedSort);

    router.push(`/events?${params.toString()}`);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedDate('all');
    setSelectedPrice('all');
    setSelectedSort('date-asc');
    router.push('/events');
  };

  // Effect to apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [
    selectedCategory,
    selectedRegion,
    selectedDate,
    selectedPrice,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Events in Eswatini
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Find concerts, festivals, sports, and more happening near you
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for events..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown (Desktop) */}
            <div className="hidden md:block relative">
              <select
                className="appearance-none block w-full pl-3 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {eventCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Region
                      </label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        {regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        {dateFilters.map((date) => (
                          <option key={date.id} value={date.id}>
                            {date.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Price
                      </label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                      >
                        {priceFilters.map((price) => (
                          <option key={price.id} value={price.id}>
                            {price.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sort By
                      </label>
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                      >
                        {sortOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                      Reset
                    </button>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-4">
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {dateFilters.map((date) => (
                  <option key={date.id} value={date.id}>
                    {date.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceFilters.map((price) => (
                  <option key={price.id} value={price.id}>
                    {price.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== 'all' ||
          selectedRegion !== 'all' ||
          selectedDate !== 'all' ||
          selectedPrice !== 'all') && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {eventCategories.find((c) => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedRegion !== 'all' && (
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {regions.find((r) => r.id === selectedRegion)?.name}
                  <button
                    onClick={() => setSelectedRegion('all')}
                    className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedDate !== 'all' && (
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {dateFilters.find((d) => d.id === selectedDate)?.name}
                  <button
                    onClick={() => setSelectedDate('all')}
                    className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              )}

              {selectedPrice !== 'all' && (
                <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {priceFilters.find((p) => p.id === selectedPrice)?.name}
                  <button
                    onClick={() => setSelectedPrice('all')}
                    className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Event Results */}
        {!isLoading && (
          <div>
            {/* Categories Section */}
            <div className="mb-12">
              <Categories
                selectedCategoryId={selectedCategory}
                onCategoryChange={(categoryId) =>
                  setSelectedCategory(categoryId)
                }
              />
            </div>

            {/* Featured Events */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedCategory === 'all'
                  ? 'Featured Events'
                  : `Featured ${
                      eventCategories.find((c) => c.id === selectedCategory)
                        ?.name
                    }`}
              </h2>
              <FeaturedEvents />
            </div>

            {/* All Events List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedCategory === 'all'
                  ? 'All Events'
                  : `All ${
                      eventCategories.find((c) => c.id === selectedCategory)
                        ?.name
                    } Events`}
              </h2>

              {/* Here you would map through your filtered events data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example event card - replace with your actual data */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/images/event-placeholder.jpg"
                      alt="Event image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Event Name
                      </h3>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                        Category
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>Date</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>Location</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        Price
                      </span>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                        Get Tickets
                      </button>
                    </div>
                  </div>
                </div>

                {/* More event cards would go here */}
              </div>

              {/* Pagination would go here */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-purple-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
