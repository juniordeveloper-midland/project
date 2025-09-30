import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';

type BlogPost = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
};

// Centralized map of posts used by the detail page.
// Keep ids in sync with items shown in the blog list.
const POSTS: Record<number, BlogPost> = {
  101: {
    id: 101,
    title: 'How Manpower Security Supports Emergency Evacuations Effectively',
    date: 'August 30, 2025',
    category: 'Security Service, Save People',
    image: '/images/walkitalki.jpg',
    excerpt:
      'Expert security personnel coordinate routes, communicate clearly, and keep people calm to ensure fast and safe evacuations across large facilities.',
    content:
      'During emergency evacuations, trained security professionals play a critical role by coordinating with site management, guiding occupants to safe exits, and maintaining clear communication. Standardized procedures, regular drills, and post-incident reviews ensure continuous improvement and safer outcomes across facilities.',
  },
  102: {
    id: 102,
    title: 'Why Post Orders Matter For Every Guard Shift',
    date: 'August 22, 2025',
    category: 'Operations, Best Practices',
    image: '/images/monitoring.jpg',
    excerpt:
      'Clear post orders reduce confusion, align response protocols, and make every shift consistent and accountable.',
    content:
      'Post orders define expectations, escalation paths, and site-specific protocols. They improve consistency across shifts, reduce risk, and make supervision and training more effective. Regular reviews keep post orders aligned with changing site needs.',
  },
  201: {
    id: 201,
    title: 'The Role of Manpower Security in Preventing Workplace Theft',
    date: 'May 1, 2025',
    category: 'Security Service, Save People',
    image: '/api/placeholder/400/250',
    excerpt:
      'Visible patrols, access control, and incident reporting deter internal and external theft while improving employee confidence.',
    content:
      'Integrated patrols, controlled access, and strong incident reporting create effective deterrence and faster resolution. Training staff to spot red flags further reduces shrinkage and improves safety culture.',
  },
  202: {
    id: 202,
    title: 'Building a Culture of Security Awareness',
    date: 'April 12, 2025',
    category: 'Training, Culture',
    image: '/api/placeholder/400/250',
    excerpt:
      'Training staff to identify risks and report concerns turns every employee into a proactive security partner.',
    content:
      'A culture of awareness encourages early reporting, reduces incident impact, and fosters shared responsibility for safety across the organization.',
  },
  301: {
    id: 301,
    title: 'Top 5 Benefits of Hiring Static and Mobile Security Guards',
    date: 'July 2, 2025',
    category: 'Security Service, Save People',
    image: '/api/placeholder/400/250',
    excerpt:
      'From rapid response to broad coverage, combining static and mobile units delivers layered, reliable protection.',
    content:
      'Static guards provide presence and access control, while mobile patrols add flexibility and area coverage. Together they create layered protection and faster response times.',
  },
  302: {
    id: 302,
    title: 'Choosing Between 12-Hour and 8-Hour Guard Shifts',
    date: 'June 14, 2025',
    category: 'Staffing, Scheduling',
    image: '/api/placeholder/400/250',
    excerpt:
      'Understand fatigue risks, cost structures, and coverage quality to select the right shift model for your site.',
    content:
      'Selecting shift length requires balancing fatigue management, cost, and service quality. Many sites employ a hybrid approach based on risk profiles and traffic patterns.',
  },
  401: {
    id: 401,
    title: 'Why Manpower Security is Essential for Modern Workplaces',
    date: 'November 1, 2025',
    category: 'Strategy, Operations',
    image: '/api/placeholder/400/250',
    excerpt:
      'Evolving threats require trained professionals who blend customer service with proactive risk mitigation.',
    content:
      'Modern workplaces need adaptable security strategies, leveraging training, technology, and strong communication. Professional teams reduce risk while maintaining a welcoming environment.',
  },
  402: {
    id: 402,
    title: 'Incident Reporting: From Observation to Action',
    date: 'October 20, 2025',
    category: 'Compliance, Process',
    image: '/api/placeholder/400/250',
    excerpt:
      'Timely, well-structured reports accelerate root-cause analysis and improve long-term site resilience.',
    content:
      'Good reports document facts, evidence, and actions taken. They enable trend analysis and help organizations strengthen controls and training.',
  },
};

function BlogPost() {
  const params = useParams();
  const id = Number(params.id);
  const post = POSTS[id];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {!post ? (
            <div className="bg-white rounded-md p-8 shadow">
              <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
              <Link to="/blogs" className="text-blue-600 hover:underline">Back to Blogs</Link>
            </div>
          ) : (
            <article className="bg-white rounded-md shadow overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-80 object-cover" />
              <div className="p-6">
                <div className="text-sm text-gray-600 mb-2">{post.category} • {post.date}</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-6">{post.excerpt}</p>
                <div className="prose max-w-none">
                  <p>{post.content}</p>
                </div>
                <div className="mt-6">
                  <Link to="/blogs" className="text-blue-600 hover:underline">← Back to all blogs</Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;


