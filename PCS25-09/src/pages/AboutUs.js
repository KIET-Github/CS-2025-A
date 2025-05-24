import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-primaryDark text-white px-6 py-12 flex flex-col items-center justify-start">
      <motion.h1
        className="text-4xl font-bold mb-4 text-primaryGreen"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to ParkEzy
      </motion.h1>

      <motion.p
        className="text-lg text-center max-w-3xl mb-10 text-textLight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        ParkEzy is a smart parking platform connecting vehicle owners with available parking spaces. 
        Say goodbye to circling blocks looking for parking — we help you book spots in seconds.
      </motion.p>

      {/* Carousel Section */}
      <div className="w-full max-w-3xl mb-12">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={true}
          interval={4000}
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1617396901795-e87b6dd6fdc9?auto=format&fit=crop&w=800&q=80"
              alt="Smart Parking"
              className="rounded-xl"
            />
            <p className="legend">Real-time slot status with IoT</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
              alt="Vehicle Owner Booking"
              className="rounded-xl"
            />
            <p className="legend">Book your parking in seconds</p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1567113463302-102a7e1189c5?auto=format&fit=crop&w=800&q=80"
              alt="Analytics"
              className="rounded-xl"
            />
            <p className="legend">Track revenue & optimize space usage</p>
          </div>
        </Carousel>
      </div>

      <motion.p
        className="text-center text-lg text-textLight max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ParkEzy aims to simplify parking across cities using technology, user-friendly design, and data-driven tools.
        Whether you're a driver or a space owner — we have something for you.
      </motion.p>

      <Link
        to="/contact"
        className="text-primaryGreen hover:underline text-lg mt-4"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default AboutUsPage;
