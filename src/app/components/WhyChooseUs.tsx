'use client';
import { motion } from 'framer-motion';

const stats = [
  {
    value: '5-8%',
    label: 'Lower Fees Than Competitors',
    id: 'stat-fees',
  },
  {
    value: '100%',
    label: 'Fraud-Free Transactions',
    id: 'stat-fraud',
  },
  {
    value: '2M+',
    label: 'Happy Attendees',
    id: 'stat-attendees',
  },
  {
    value: '24/7',
    label: 'Cash & MoMo Support',
    id: 'stat-support',
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
      aria-labelledby="why-choose-us-heading"
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
            id="why-choose-us-heading"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Eswatini Events?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The only ticketing platform built for Eswatini &apos;s unique needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ scale: 1.03 }}
              whileFocus={{
                scale: 1.03,
                boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.5)',
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center border border-gray-200 dark:border-gray-700 focus:outline-none"
              tabIndex={0}
              aria-labelledby={stat.id}
            >
              <p
                id={stat.id}
                className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
              >
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
