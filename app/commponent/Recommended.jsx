"use client"
import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: "Ahmed",
    text: "Great shopping experience! The smartwatch arrived quickly and was exactly as described. Highly recommend it.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sarah",
    text: "The wireless headphones are excellent! Clear sound and very high quality. Thank you for this wonderful product.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ali",
    text: "I liked the ease of use of the smartwatch and its many features. In addition, the customer service was fast and helpful.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Noura",
    text: "The earbuds are very comfortable and stay put during exercise. The sound quality exceeded my expectations. I will definitely buy from your store again.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Khaled",
    text: "I bought a smartwatch and wireless headphones, and both were of excellent quality and great value for the price. The delivery was fast and organized.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function TestimonialItem({ testimonial, index, isVisible }) {
  return (
    <div 
      className={`flex items-start gap-4 bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
        isVisible ? 'animate-entrance' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <img
        alt={testimonial.name}
        src={testimonial.image}
        className="size-16 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-gray-900 sm:text-lg">{testimonial.name}</h3>
        <p className="mt-1 text-gray-700">{testimonial.text}</p>
      </div>
    </div>
  );
}

function Recommended() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-2xl font-bold text-center mb-8 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="animate-float hover:animate-none"
            >
              <TestimonialItem 
                testimonial={testimonial} 
                index={index} 
                isVisible={isVisible} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommended;