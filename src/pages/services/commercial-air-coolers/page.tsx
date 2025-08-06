import Footer from '../../../components/Footer';
import CommercialCoolersDetail from './CommercialCoolersDetail';

export async function generateStaticParams() {
  return [
    { service: 'commercial-air-coolers' }
  ];
}

export default function CommercialCoolersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Duct Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-0 w-4 h-96 bg-gray-400 rounded-r-lg transform rotate-12"></div>
        <div className="absolute top-40 right-20 w-4 h-64 bg-gray-400 rounded-l-lg transform -rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-4 h-80 bg-gray-400 rounded-r-lg transform rotate-45"></div>
        <div className="absolute bottom-20 right-0 w-4 h-96 bg-gray-400 rounded-l-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-4 bg-gray-400 rounded-b-lg transform -rotate-6"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-4 bg-gray-400 rounded-t-lg transform rotate-12"></div>
      </div>

      <CommercialCoolersDetail />
      <Footer />
    </div>
  );
}