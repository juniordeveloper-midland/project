import React, { useState, useEffect, useRef } from 'react';
import { Users, Globe, Calendar, UserCheck } from 'lucide-react';

const CountSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, countries: 0, experience: 0, employees: 0 });
  const sectionRef = useRef(null);

  // Target values
  const targets = {
    clients: 300,
    countries: 18,
    experience: 60,
    employees: 100
  };

  // Intersection Observer to trigger animation every time component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset counts to 0 and trigger animation
          setCounts({ clients: 0, countries: 0, experience: 0, employees: 0 });
          setIsVisible(true);
        } else {
          // Reset when not visible so it can animate again
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counting animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function

      setCounts({
        clients: Math.floor(easeOutQuart * targets.clients),
        countries: Math.floor(easeOutQuart * targets.countries),
        experience: Math.floor(easeOutQuart * targets.experience),
        employees: Math.floor(easeOutQuart * targets.employees)
      });

      if (step >= steps) {
        clearInterval(timer);
        // Ensure final values are exact
        setCounts(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);
  return (
    <div ref={sectionRef} className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Clients */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-gray-600" strokeWidth={1.5} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{counts.clients}+</div>
            <div className="text-gray-600 text-base">Clients</div>
          </div>

          {/* Official Countries */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Globe className="w-12 h-12 text-gray-600" strokeWidth={1.5} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{counts.countries}</div>
            <div className="text-gray-600 text-base">Official Countries</div>
          </div>

          {/* Years Experience */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="w-12 h-12 text-gray-600" strokeWidth={1.5} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{counts.experience}+</div>
            <div className="text-gray-600 text-base">Years Experience</div>
            </div>

          {/* Employees */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <UserCheck className="w-12 h-12 text-gray-600" strokeWidth={1.5} />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{counts.employees}+</div>
            <div className="text-gray-600 text-base">Employees</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountSection;