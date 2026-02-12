import { Link, useParams } from 'react-router-dom';

function ServiceDetails() {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Details</h1>
      <p className="text-lg text-gray-600 mb-6">
        Viewing details for service ID: {id}
      </p>
      <Link 
        to="/services" 
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors"
      >
        Back to Services
      </Link>
    </div>
  );
}

export default ServiceDetails;
