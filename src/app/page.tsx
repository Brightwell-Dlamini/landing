import Head from 'next/head';
import PremiumNavbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import FeaturedEvents from './components/FeaturedEvents';
import UpcomingHighlights from './components/UpcomingHighlights';
import WhyChooseUs from './components/WhyChooseUs';
import OrganizerCTA from './components/OrganizerCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
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

      {/* <PremiumNavbar /> */}

      <main>
        {/* <Hero /> */}
        {/* <HowItWorks /> */}
        {/* <Categories /> */}
        {/* <FeaturedEvents /> */}
        {/* <UpcomingHighlights /> */}
        {/* <WhyChooseUs /> */}
        {/* <OrganizerCTA /> */}
      </main>

      <Footer />
    </div>
  );
}
