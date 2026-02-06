import { Link } from 'react-router-dom';

function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 mb-6">
        Find answers to common questions
      </p>
      <Link 
        to="/" 
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default FAQ;
