'use client';
import { motion } from 'framer-motion';
import { TicketIcon } from '@heroicons/react/24/outline';

const OrganizerCTA = () => {
  return (
    <section
      aria-labelledby="organizer-cta-heading"
      className="bg-gradient-to-r from-purple-600 to-pink-600 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mb-6 md:mb-0"
          >
            <h2
              id="organizer-cta-heading"
              className="text-2xl font-bold text-white"
            >
              Are you an organizer?
            </h2>
            <p className="text-purple-100">Start selling tickets in minutes</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileFocus={{
              scale: 1.05,
              boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.5)',
            }}
            className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-medium shadow-lg focus:outline-none"
            aria-label="Create your event"
          >
            <TicketIcon className="h-5 w-5" />
            Create Your Event
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default OrganizerCTA;
