import { useState } from 'react';
import { Search, Calendar, Wrench, CreditCard, User, ChevronDown } from 'lucide-react';
import { getCloudinaryUrl } from '../utils/cloudinary';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: null },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'account', label: 'Account', icon: User },
  ];

  const faqs = [
    {
      category: 'booking',
      section: 'Booking & Appointments',
      icon: '📅',
      questions: [
        {
          id: 1,
          question: 'How do I book a service appointment?',
          answer: 'To book a service appointment, simply visit our Services page, select the service you need, and click the "Book Service" button. Fill in your details including vehicle information, phone number, preferred date and time. Once submitted, our team will review and confirm your booking within 24 hours.',
        },
        {
          id: 2,
          question: 'Can I book multiple services at once?',
          answer: 'Yes, you can book multiple services in a single appointment. Simply select all the services you need during the booking process. This helps us allocate sufficient time and resources for your vehicle.',
        },
        {
          id: 3,
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 2-3 days in advance to ensure availability. However, we do our best to accommodate urgent requests when possible. For specialized services, booking a week ahead is advisable.',
        },
        {
          id: 4,
          question: 'Can I cancel or reschedule my booking?',
          answer: 'Yes, you can cancel or reschedule your booking. Please contact us at least 24 hours before your scheduled appointment to avoid any cancellation fees. You can manage your bookings through your account dashboard or contact our support team.',
        },
      ],
    },
    {
      category: 'services',
      section: 'Services',
      icon: '🔧',
      questions: [
        {
          id: 5,
          question: 'What types of services do you offer?',
          answer: 'We offer a comprehensive range of services including oil changes, brake services, tire rotations, engine diagnostics, electrical repairs, transmission services, air conditioning repairs, and general maintenance. Check our Services page for the complete list.',
        },
        {
          id: 6,
          question: 'How long does a typical service take?',
          answer: 'Service duration varies depending on the type of service. Oil changes typically take 30-45 minutes, brake services 1-2 hours, and more complex repairs may take several hours or a full day. We provide estimated timeframes when confirming your booking.',
        },
        {
          id: 7,
          question: 'Do you provide warranty on services?',
          answer: 'Yes, all our services come with a warranty. The warranty period varies by service type, typically ranging from 30 days to 1 year. We stand behind our work and will address any issues covered under warranty at no additional cost.',
        },
        {
          id: 8,
          question: 'Can I wait while my vehicle is being serviced?',
          answer: 'Yes, we have a comfortable waiting area with complimentary Wi-Fi and refreshments. However, for longer services, we recommend scheduling a drop-off and we can notify you when your vehicle is ready.',
        },
      ],
    },
    {
      category: 'payment',
      section: 'Payment & Pricing',
      icon: '💳',
      questions: [
        {
          id: 9,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and cash payments. Online payments can be made through our secure payment gateway.',
        },
        {
          id: 10,
          question: 'Do I need to pay upfront?',
          answer: 'No upfront payment is required when booking. Payment is due upon completion of the service. We will provide a detailed invoice before processing payment.',
        },
        {
          id: 11,
          question: 'Are your prices fixed or estimates?',
          answer: 'The prices listed on our website are competitive base rates. Final pricing may vary based on your vehicle\'s specific needs and any additional repairs discovered during service. We always get your approval before proceeding with any additional work.',
        },
        {
          id: 12,
          question: 'Do you offer any discounts or promotions?',
          answer: 'Yes, we regularly offer promotions and discounts for first-time customers, seasonal services, and package deals. Subscribe to our newsletter or follow us on social media to stay updated on current offers.',
        },
      ],
    },
    {
      category: 'account',
      section: 'Account & Support',
      icon: '👤',
      questions: [
        {
          id: 13,
          question: 'Do I need an account to book a service?',
          answer: 'Yes, creating an account allows you to manage your bookings, view service history, save vehicle information, and receive updates. Account creation is quick and free.',
        },
        {
          id: 14,
          question: 'How do I track my service status?',
          answer: 'Once logged in, you can track your service status through your account dashboard. You\'ll also receive email and SMS notifications as your service progresses through different stages.',
        },
        {
          id: 15,
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team via the Contact page, email us at support@autoserve.com, or call our hotline. We\'re available Monday-Saturday, 8 AM - 6 PM.',
        },
        {
          id: 16,
          question: 'Can I update my vehicle information?',
          answer: 'Yes, you can update your vehicle information anytime through your account profile. Keep your vehicle details current for accurate service recommendations and faster booking.',
        },
      ],
    },
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const filteredFaqs = faqs.filter(section => {
    const categoryMatch = activeCategory === 'all' || section.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      section.questions.some(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `url('${getCloudinaryUrl('v1770743872/FAQ_2_rx31fb.png')}')`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 pb-16">
        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our vehicle service booking system, services, and policies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {filteredFaqs.map((section) => (
            <div key={section.section} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{section.section}</h2>
              </div>

              <div className="space-y-3">
                {section.questions
                  .filter(q => 
                    searchQuery === '' || 
                    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((q) => (
                    <div key={q.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{q.question}</span>
                        <ChevronDown 
                          className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${
                            openQuestion === q.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openQuestion === q.id && (
                        <div className="px-4 pb-4 pt-2 bg-orange-50">
                          <p className="text-gray-700 leading-relaxed">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No questions found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
