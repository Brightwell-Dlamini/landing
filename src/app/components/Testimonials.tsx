'use client';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote:
      'Reduced no-shows by 50% with dynamic pricing. Our attendees love the mobile tickets!',
    name: 'Sidvokodvo Riders',
    role: 'Motorsport Event Organizer',
  },
  {
    id: 2,
    quote:
      'The NFC wristbands revolutionized our vendor payments. No more cash handling!',
    name: 'MTN Bushfire Team',
    role: 'Music Festival',
  },
  {
    id: 3,
    quote:
      'Finally a platform that understands African payment methods. MTN MoMo integration is a game-changer.',
    name: 'Luju Festival',
    role: 'Cultural Event',
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-gray-900"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2
            id="testimonials-heading"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trusted by Local Heroes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            What Eswatini&apos;s top event organizers say about us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ scale: 1.02 }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.5)',
              }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl relative focus:outline-none"
              tabIndex={0}
              aria-labelledby={`testimonial-${testimonial.id}-quote`}
            >
              <FaQuoteLeft
                className="text-purple-500/20 dark:text-purple-400/20 text-5xl absolute top-4 left-4"
                aria-hidden="true"
              />
              <p
                id={`testimonial-${testimonial.id}-quote`}
                className="italic text-gray-700 dark:text-gray-300 mb-6 relative z-10"
              >
                &quote;{testimonial.quote}&quote;
              </p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
