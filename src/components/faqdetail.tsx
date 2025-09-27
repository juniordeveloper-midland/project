import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQDetail = () => {
  const [expandedItem, setExpandedItem] = useState(0);

  const faqItems = [
    {
      question: "What services does G20 Security provide?",
      answer: "We offer private security, man guarding, static guarding, mobile patrols, event security, and access control solutions tailored to your needs."
    },
    {
      question: "What services does G20 Security provide?",
      answer: "We offer private security, man guarding, static guarding, mobile patrols, event security, and access control solutions tailored to your needs."
    },
    {
      question: "Are your guards licensed and trained?",
      answer: "Yes, all our security guards are fully licensed and undergo comprehensive training programs to ensure they meet the highest professional standards."
    },
    {
      question: "Do you provide 24/7 security coverage?",
      answer: "Yes, we provide round-the-clock security services to ensure your property and assets are protected at all times."
    },
    {
      question: "Can I hire security for a short-term event?",
      answer: "Absolutely! We offer flexible security solutions for short-term events, special occasions, and temporary security needs."
    },
    {
      question: "How do you ensure transparency in your services?",
      answer: "We maintain transparency through regular reporting, clear communication, and detailed documentation of all security activities."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve a wide range of industries including commercial, residential, retail, healthcare, education, and industrial sectors."
    },
    {
      question: "How do I request a quote?",
      answer: "You can request a quote by contacting us through our website, phone, or email. We'll assess your needs and provide a customized quote."
    },
    {
      question: "Do you offer nationwide coverage?",
      answer: "Yes, we provide security services across multiple locations nationwide to meet your business requirements."
    },
    {
      question: "How quickly can security be deployed?",
      answer: "We can deploy security personnel quickly, often within 24-48 hours depending on your specific requirements and location."
    },
    {
      question: "Can your services be customised for my business?",
      answer: "Yes, we tailor our security solutions to meet the specific needs and requirements of your business or organization."
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedItem(expandedItem === index ? -1 : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-black-700 font-medium text-base pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0">
                {expandedItem === index ? (
                  <Minus className="w-5 h-5 text-black-700" />
                ) : (
                  <Plus className="w-5 h-5 text-black-700" />
                )}
              </div>
            </button>
            {expandedItem === index && (
              <div className="px-6 pb-4 bg-blue-50">
                <p className="text-blue-800 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQDetail;