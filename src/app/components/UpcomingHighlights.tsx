'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

const events = [
  {
    id: 1,
    name: 'MTN Bushfire Festival',
    date: '2025-05-30',
    location: 'Malkerns Valley',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ticketsLeft: 12,
    imagePriority: true,
  },
  {
    id: 2,
    name: 'Eswatini vs Nigeria',
    date: '2025-03-15',
    location: 'Somhlolo Stadium',
    image:
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1605&q=80',
    ticketsLeft: 43,
    imagePriority: false,
  },
];

// const CountdownTimer = ({ date }: { date: string }) => {
// Implement with actual countdown logic in a real app
//   return (
<div className="flex items-center gap-1 text-sm text-white dark:text-gray-200">
  <ClockIcon className="h-4 w-4" />
  <span>12d 4h left</span>
</div>;
//   );
// };

const UpcomingHighlights = () => {
  return (
    <section
      id="upcoming-events"
      className="py-20 bg-white dark:bg-gray-900"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2
            id="upcoming-events-heading"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Don&apos;t Miss These
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Upcoming highlights with limited tickets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -5 }}
              whileFocus={{
                y: -5,
                outline: 'none',
                boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.5)',
              }}
              className="group relative overflow-hidden rounded-xl shadow-lg focus:outline-none"
              tabIndex={0}
              aria-labelledby={`event-${event.id}-title`}
            >
              <div className="relative h-64">
                <Image
                  src={event.image}
                  alt={`${event.name} promotional image`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={event.imagePriority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      id={`event-${event.id}-title`}
                      className="text-xl font-bold text-white"
                    >
                      {event.name}
                    </h3>
                    <div className="flex items-center text-gray-300 mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {event.ticketsLeft} left
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {/* <CountdownTimer date={event.date} /> */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    aria-label={`Get tickets for ${event.name}`}
                  >
                    Get Tickets
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingHighlights;
