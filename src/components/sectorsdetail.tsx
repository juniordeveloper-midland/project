import React from 'react';
import { ChevronRight } from 'lucide-react';

const SectorsDetail = () => {
  const services = [
    {
      id: 1,
      image: "https://i.postimg.cc/RhmVmnMv/portrait-male-security-guard-with-radio-station-camera-screens.jpg",
      title: "Static Guarding",
      description: "Our trained security personnel maintain a constant on-site presence, ensuring round-the-clock monitoring and protection. Their unwavering vigilance helps deter threats, prevent incidents, and provide peace of mind at all times.",
      link: "#"
    },
    {
      id: 2,
      image: "https://i.postimg.cc/tgyjYGKz/security-guard-protecting-client.jpg",
      title: "Remote Monitoring Support",
      description: "Our security personnel complement CCTV systems by offering an active on-site presence. While cameras monitor remotely, our guards provide immediate response when needed, ensuring faster action and stronger protection. This combination delivers complete security.",
      link: "#"
    },
    {
      id: 3,
      image: "https://i.postimg.cc/7YBSZqjg/portrait-male-security-guard-with-radio-station-1.jpg",
      title: "Emergency Response",
      description: "Our trained guards are always prepared to act swiftly in any situation. By responding quickly to incidents and taking decisive action, they escalate and ensure fast, effective resolutions, keeping your premises safe and secure. Their proactive approach ensures threats are addressed before they escalate.",
      link: "#"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/8591608/pexels-photo-8591608.jpeg",
      title: "Mobile Patrols",
      description: "Patrol teams conduct regular site checks to maintain security across large or multiple locations. They provide visible deterrent reminders, identify risks, and provide rapid response when incidents occur, ensuring consistent protection and peace of mind. With their mobility and vigilance.",
      link: "#"
    },
    {
      id: 5,
      image: "https://i.postimg.cc/W3HP4FmB/security-guard-standing-scanning-door.jpg",
      title: "Event Security",
      description: "Experienced guards manage crowd control, access points, and safety at public and private events. Their presence ensures smooth operations, handles emergencies, and provides reassurance for guests. From small gatherings to large-scale events, our team delivers reliable protection.",
      link: "#"
    },
    {
      id: 6,
      image: "https://i.postimg.cc/k5ZmJRvk/smiling-airport-security-officer-holding-metal-detector-airport-terminal.jpg",
      title: "Access Control",
      description: "Our manpower team closely monitors all entry and exit points to ensure only authorized personnel gain access. This includes checking credentials, monitoring sensitive areas, and maintains site security. With vigilant checks, we create a controlled access environment for your premises.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-blue-800/40 backdrop-blur-sm border border-white-600/30 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700/50"
            >
              <div className="flex h-full">
                {/* Image Section */}
                <div className="w-1/3 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-900/20"></div>
                </div>
                
                {/* Content Section */}
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Read More Link */}
                  <div className="mt-auto">
                    <a
                      href={service.link}
                      className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-200 group"
                    >
                      <span className="font-medium">Read More</span>
                      <ChevronRight 
                        size={16} 
                        className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorsDetail;