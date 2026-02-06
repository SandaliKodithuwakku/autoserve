import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-6">
        Get in touch with our team
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

export default Contact;
