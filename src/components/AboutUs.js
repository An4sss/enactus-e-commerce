
import React from 'react';
import Image from 'next/image';
import Team from '@/../public/images/image4.jpg'

const AboutUs = React.forwardRef((props, ref) => {
  return (
    <section ref={ref} className="bg-white py-12">
      <div className="AboutUs__container container grid" style={{ display: 'flex', alignItems: 'center', padding: '75px' }}>
        
        {/* Image on the left */}
        <div className="AboutUs__images" style={{ flex: '1', paddingRight: '15px', paddingLeft: '0px' }}>
          <Image
            src={Team}
            alt="Our Team"
            width={300}
            height={300}
            className="shadow-lg"
            style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '0px' }} // Reduced marginRight
          />
        </div>
        
        {/* Text on the right */}
        <div className="AboutUs__content" style={{ flex: '2', color: '#333', paddingLeft: '15px' }}>
          <div className="AboutUs__data">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400" style={{ marginBottom: '10px' }}>
              About Us
            </h2>
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Welcome to Enactus! We are a student-led organization committed to using
              entrepreneurship to create a positive impact on our community. Our team
              works on various projects aimed at improving lives through sustainable
              solutions and innovation. <span>.</span>
            </h2>
            <p className="text-xl font-bold mb-2 text-gray-800" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
              Innovation, Sustainability, Integrity, and Collaboration are at the heart
              of everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutUs;