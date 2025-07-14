'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  TicketIcon,
  ShoppingCartIcon,
  BellIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { debounce } from 'lodash';

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Advanced scroll effects
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  );
  const darkBackgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0)', 'rgba(17, 24, 39, 0.98)']
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // Dynamic user data (replace with real auth)
  const [user] = useState({
    isLoggedIn: true,
    name: 'Siyabonga D.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    notifications: 5,
    cartItems: 3,
  });

  const navLinks = [
    {
      name: 'Events',
      href: '/events',
      dropdown: [
        { name: 'Music Festivals', href: '/events/music' },
        { name: 'Sports', href: '/events/sports' },
        { name: 'Cultural', href: '/events/cultural' },
      ],
    },
    {
      name: 'Discover',
      href: '/discover',
      dropdown: [
        { name: 'Popular', href: '/discover/popular' },
        { name: 'Upcoming', href: '/discover/upcoming' },
        { name: 'Near You', href: '/discover/nearby' },
      ],
    },
    { name: 'Organizers', href: '/organizers' },
    { name: 'Venues', href: '/venues' },
  ];

  // Debounced search
  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length > 2) {
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }
      }, 500),
    [router]
  );
  useEffect(() => {
    if (searchQuery) handleSearch(searchQuery);
    return () => handleSearch.cancel();
  }, [searchQuery, handleSearch]);
  // Focus search when opened
  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  // Dynamic theme detection
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {/* Premium Navbar */}
      <motion.nav
        ref={navRef}
        style={{
          backgroundColor:
            currentTheme === 'dark' ? darkBackgroundColor : backgroundColor,
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'border-gray-200 dark:border-gray-700 shadow-sm'
            : 'border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo with 3D hover effect */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateZ: [-1, 1, -1],
                transition: { duration: 0.5 },
              }}
              className="flex-shrink-0 flex items-center"
            >
              <Link href="/" className="flex items-center group">
                <motion.div
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <TicketIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-2" />
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent group-hover:bg-gradient-to-l transition-all duration-500">
                  Eswatini Events
                </h1>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Enhanced with dropdowns */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-all ${
                      pathname === link.href
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                        : 'text-gray-700 dark:text-gray-100  hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDownIcon
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Animated dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none overflow-hidden"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions - Enhanced with micro-interactions */}
            <div className="flex items-center space-x-3">
              {/* Dynamic search bar */}
              {showSearch ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  exit={{ width: 0 }}
                  className="hidden md:block"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      ref={searchRef}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white"
                      placeholder="Search events..."
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => setShowSearch(false)}
                    />
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="hidden md:block p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              )}

              {/* Language/Currency switcher */}
              <div className="relative hidden md:block">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === 'locale' ? null : 'locale'
                    )
                  }
                  className="flex items-center space-x-1 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <GlobeAltIcon className="h-5 w-5" />
                  <span className="text-sm">EN</span>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'locale' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none overflow-hidden z-50"
                    >
                      <div className="py-1">
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 w-full text-left">
                          <span className="mr-2">🇺🇸</span> English
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 w-full text-left">
                          <span className="mr-2">🇸🇿</span> SiSwati
                        </button>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          SZL
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle with smooth transition */}
              <button
                onClick={() =>
                  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                }
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {currentTheme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              {/* Notification bell with counter */}
              <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <BellIcon className="h-5 w-5" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {user.notifications}
                  </span>
                )}
              </button>

              {/* Shopping cart with fly-in animation */}
              <Link
                href="/cart"
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {user.cartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {user.cartItems}
                  </motion.span>
                )}
              </Link>

              {/* User avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'user' ? null : 'user')
                  }
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-purple-500 dark:border-purple-400">
                    <Image
                      src={user.avatar}
                      alt="User profile"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        >
                          Settings
                        </Link>
                        <Link
                          href="/logout"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        >
                          Sign out
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button with animated hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden fixed inset-0 z-40 pt-20 bg-white dark:bg-gray-900 overflow-y-auto"
          >
            <div className="px-4 py-6">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white"
                  placeholder="Search events..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                        pathname === link.href
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() =>
                        link.dropdown
                          ? setActiveDropdown(
                              activeDropdown === link.name ? null : link.name
                            )
                          : setIsMenuOpen(false)
                      }
                    >
                      {link.name}
                      {link.dropdown && (
                        <ChevronDownIcon
                          className={`h-5 w-5 transition-transform ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-6 overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile User Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    Dark Mode
                  </span>
                  <button
                    onClick={() =>
                      setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                    }
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
                  >
                    <span
                      className={`${
                        currentTheme === 'dark'
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                    />
                  </button>
                </div>

                {user.isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/notifications"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Notifications
                      {user.notifications > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                          {user.notifications}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 mt-4">
                    <Link
                      href="/login"
                      className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-4 rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-medium py-3 px-4 rounded-lg text-center hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PremiumNavbar;
