import Head from 'next/head';
// import { motion } from 'framer-motion';
import PremiumNavbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import UpcomingHighlights from './components/UpcomingHighlights';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import OrganizerCTA from './components/OrganizerCTA';
import Footer from './components/Footer';
import { ThemeProvider } from 'next-themes';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Head>
          <title>
            Eswatini Events | Discover & Book Tickets for Local Events
          </title>
          <meta
            name="description"
            content="Discover and book tickets for the most exciting events in Eswatini"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="theme-color"
            content="#ffffff"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#111827"
            media="(prefers-color-scheme: dark)"
          />
        </Head>

        <PremiumNavbar />

        <main>
          <Hero />
          <HowItWorks />
          <Categories />
          <FeaturedEvents />
          <UpcomingHighlights />
          <WhyChooseUs />
          <Testimonials />
          <OrganizerCTA />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
