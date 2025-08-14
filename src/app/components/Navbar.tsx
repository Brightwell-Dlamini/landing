'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  TicketIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import { debounce } from 'lodash';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const loading = status === 'loading';

  const navRef = useRef(null);

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

  // Set mounted state and initial scroll position
  useEffect(() => {
    setMounted(true);
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic theme detection
  const currentTheme = mounted
    ? theme === 'system'
      ? systemTheme
      : theme
    : 'light';

  // Don't render until mounted to avoid hydration issues
  if (!mounted || loading) {
    return null;
  }

  const navLinks = [
    { name: 'Events', href: '/events' },
    { name: 'Organizers', href: '/organizers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
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
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    pathname === link.href
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                      : 'text-gray-700 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
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

              {/* User actions */}
              {isLoggedIn ? (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link
                    href="/auth/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Log In</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 pt-20 bg-white dark:bg-gray-900 overflow-y-auto"
          >
            <div className="px-4 py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium ${
                      pathname === link.href
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
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

                {session ? (
                  <div className="space-y-3 mt-4">
                    <Link
                      href="/auth/profile"
                      className="flex items-center justify-center space-x-2 w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-4 rounded-lg"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mt-4">
                    <Link
                      href="/auth/login"
                      className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-4 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex items-center justify-center space-x-2 w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlusIcon className="h-5 w-5" />
                      <span>Create Account</span>
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

export default Navbar;
