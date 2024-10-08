"use client";
import React, { useRef } from 'react';
import ProductList from '@/components/ProductList';
import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

const HomePage = () => {
  const aboutUsRef = useRef(null);

  return (
    <div>
      <main>
        <NavBar aboutUsRef={aboutUsRef} />
        <section>
          <ProductList />
        </section>
        <section>
          <AboutUs ref={aboutUsRef} />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default HomePage;