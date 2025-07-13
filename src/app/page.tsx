import Head from 'next/head';
// import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvents from './components/FeaturedEvents';
import ExperienceSection from './components/ExperienceSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { ThemeProvider } from 'next-themes';
import Categories from './components/Categories';
import PremiumNavbar from './components/Navbar';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Head>
          <title>
            Eswatini Events | Discover & Book Tickets for Local Events
          </title>
          <meta
            name="description"
            content="Discover and book tickets for the most exciting events in Eswatini - concerts, festivals, cultural experiences and more"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PremiumNavbar />
        <Hero />
        <FeaturedEvents /> <Categories />
        <ExperienceSection />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
