import React, { useEffect } from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const BlogDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = 4;
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isNaN(pageParam) ? 1 : Math.min(Math.max(pageParam, 1), totalPages);

  useEffect(() => {
    // Ensure URL stays in sync and scroll to top on page change
    const synced = searchParams.get('page');
    if (synced !== String(currentPage)) {
      const next = new URLSearchParams(searchParams);
      next.set('page', String(currentPage));
      setSearchParams(next, { replace: true });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageClick = (pageNumber: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(pageNumber));
    setSearchParams(next);
  };
  const latestPosts = [
    {
      id: 1,
      title: "How Manpower Security Supports Emergency Evacuations Effectively",
      date: "July 3, 2025",
      image: "/api/placeholder/80/60"
    },
    {
      id: 2,
      title: "Top 5 Benefits of Hiring Static and Mobile Security Guards",
      date: "July 3, 2025",
      image: "/api/placeholder/80/60"
    },
    {
      id: 3,
      title: "The Role of Manpower Security in Preventing Workplace Theft",
      date: "May 1, 2025",
      image: "/api/placeholder/80/60"
    },
    {
      id: 4,
      title: "Why Manpower Security is Essential for Modern Workplaces",
      date: "November 1, 2025",
      image: "/api/placeholder/80/60"
    }
  ];

  const categories = [
    "Static Guarding",
    "Man Guarding", 
    "Private Security",
    "Mobile Patrols",
    "Event Security",
    "Access Control"
  ];

  // Distinct main content for each of the 4 pages
  const contentByPage: Record<number, { id: number; title: string; excerpt: string; date: string; category: string; image: string; }[]> = {
    1: [
      {
        id: 101,
        title: "How Manpower Security Supports Emergency Evacuations Effectively",
        excerpt: "Expert security personnel coordinate routes, communicate clearly, and keep people calm to ensure fast and safe evacuations across large facilities.",
        date: "August 30, 2025",
        category: "Security Service, Save People",
        image: "https://i.postimg.cc/RhmVmnMv/portrait-male-security-guard-with-radio-station-camera-screens.jpg"
      },
      {
        id: 102,
        title: "Why Post Orders Matter For Every Guard Shift",
        excerpt: "Clear post orders reduce confusion, align response protocols, and make every shift consistent and accountable.",
        date: "August 22, 2025",
        category: "Operations, Best Practices",
        image: "/api/placeholder/400/250"
      }
    ],
    2: [
      {
        id: 201,
        title: "The Role of Manpower Security in Preventing Workplace Theft",
        excerpt: "Visible patrols, access control, and incident reporting deter internal and external theft while improving employee confidence.",
        date: "May 1, 2025",
        category: "Security Service, Save People",
        image: "/api/placeholder/400/250"
      },
      {
        id: 202,
        title: "Building a Culture of Security Awareness",
        excerpt: "Training staff to identify risks and report concerns turns every employee into a proactive security partner.",
        date: "April 12, 2025",
        category: "Training, Culture",
        image: "/api/placeholder/400/250"
      }
    ],
    3: [
      {
        id: 301,
        title: "Top 5 Benefits of Hiring Static and Mobile Security Guards",
        excerpt: "From rapid response to broad coverage, combining static and mobile units delivers layered, reliable protection.",
        date: "July 2, 2025",
        category: "Security Service, Save People",
        image: "/api/placeholder/400/250"
      },
      {
        id: 302,
        title: "Choosing Between 12-Hour and 8-Hour Guard Shifts",
        excerpt: "Understand fatigue risks, cost structures, and coverage quality to select the right shift model for your site.",
        date: "June 14, 2025",
        category: "Staffing, Scheduling",
        image: "/api/placeholder/400/250"
      }
    ],
    4: [
      {
        id: 401,
        title: "Why Manpower Security is Essential for Modern Workplaces",
        excerpt: "Evolving threats require trained professionals who blend customer service with proactive risk mitigation.",
        date: "November 1, 2025",
        category: "Strategy, Operations",
        image: "/api/placeholder/400/250"
      },
      {
        id: 402,
        title: "Incident Reporting: From Observation to Action",
        excerpt: "Timely, well-structured reports accelerate root-cause analysis and improve long-term site resilience.",
        date: "October 20, 2025",
        category: "Compliance, Process",
        image: "/api/placeholder/400/250"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="space-y-8">
              {(contentByPage[currentPage] || contentByPage[1]).map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-4 hover:text-blue-600 cursor-pointer transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageClick(pageNum)}
                      aria-current={isActive ? 'page' : undefined}
                      className={
                        `w-10 h-10 rounded-md transition-colors ` +
                        (isActive
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Latest Posts */}
              <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
                <h3 className="bg-blue-800 px-4 py-3 text-lg font-semibold">
                  Latest Posts
                </h3>
                <div className="p-4 space-y-4">
                  {latestPosts.map((post) => (
                    <div key={post.id} className="flex gap-3 group cursor-pointer">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium group-hover:text-blue-300 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-blue-200 mt-1">
                          {post.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
                <h3 className="bg-blue-800 px-4 py-3 text-lg font-semibold">
                  Categories
                </h3>
                <div className="p-4">
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          className="flex items-center justify-between text-sm hover:text-blue-300 transition-colors group"
                        >
                          <span>{category}</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;