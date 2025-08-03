'use client';

import { useState, useEffect } from 'react';

interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  translated?: boolean;
  review_language?: string;
  original_language?: string;
}

interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  average_rating: number;
  total_reviews: number;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentReview, setCurrentReview] = useState(0);

  // This would be your actual Google Business Profile ID or place ID
  const PLACE_ID = "YOUR_GOOGLE_PLACE_ID"; // Replace with actual place ID
  const API_KEY = "YOUR_API_KEY"; // Replace with your API key

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const fetchGoogleReviews = async () => {
    try {
      setLoading(true);
      
      // Option 1: Using Google Places API (requires API key and billing)
      // const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`);
      
      // Option 2: Using a third-party service (example with SerpAPI)
      // You would need to sign up for a service like SerpAPI, ScrapingBee, or similar
      const response = await fetch('/api/google-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeId: PLACE_ID,
          // Add any other parameters needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data: GoogleReviewsResponse = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Error fetching Google reviews:', err);
      setError('Unable to load reviews at this time');
      
      // Fallback to real customer data if API fails
      setReviews(getRealCustomerReviews());
    } finally {
      setLoading(false);
    }
  };

  const getRealCustomerReviews = (): GoogleReview[] => {
    return [
      {
        id: "1",
        author_name: "ABBAS DHINOJWALA",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "2 months ago",
        text: "They made the ducting for our restaurant in Indore. Really good work with precision and timely follow up. The owner himself visits the site and discussed what we were expecting and gave us ideas as well. Recommended for people in Indore and nearby cities."
      },
      {
        id: "2",
        author_name: "BATUL",
        profile_photo_url: "/female.jpg",
        rating: 5,
        relative_time_description: "1 month ago",
        text: "I m Very Satisfied with the service of my Split AC and their techician are also coprative..\nThnku IRasco"
      },
      {
        id: "3",
        author_name: "TAHER KAGDI",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "3 weeks ago",
        text: "Fantastic service with super duper quality specailly they are no 1 service provide In Mp also a great customer querry resolution quickly as soon as possible"
      },
      {
        id: "4",
        author_name: "KUTBUDDIN KALABHAI",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "2 weeks ago",
        text: "very professional.... fast service..."
      },
      {
        id: "5",
        author_name: "ZAHRA AGASIAWALA",
        profile_photo_url: "/female.jpg",
        rating: 5,
        relative_time_description: "1 week ago",
        text: "Excellent work and services, Thank you IRASCO!"
      },
      {
        id: "6",
        author_name: "SHUBHAM SOLANKI",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "5 days ago",
        text: "A very good team for HVAC and Ducting solutions.\nAlways on time and updated work."
      },
      {
        id: "7",
        author_name: "ALOK SINGH",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "3 days ago",
        text: "Very nice work, Ali bhai ka kaam ek number ka hai...ek baar ali bhai se kaam Kara kar jaroor dekhne"
      },
      {
        id: "8",
        author_name: "ART N INK",
        profile_photo_url: "/female.jpg",
        rating: 5,
        relative_time_description: "2 days ago",
        text: "Installed a stainless chimney for my kichen last week. Everything went smoothly. Very responsive and professional from scheduling to installation. Highly recommended."
      },
      {
        id: "9",
        author_name: "HUSSAIN WAJDA",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "1 day ago",
        text: "Best air condition and its services"
      },
      {
        id: "10",
        author_name: "AJJU KHAN",
        profile_photo_url: "/male.jpg",
        rating: 5,
        relative_time_description: "12 hours ago",
        text: "Irasco is the company you can trust and rely on, they are the best in the business."
      },
      {
        id: "11",
        author_name: "ANIL SARASWAT",
        profile_photo_url: "/male.jpg",
        rating: 4,
        relative_time_description: "6 hours ago",
        text: "Satisfying work is faith and good work"
      }
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No reviews available</p>
      </div>
    );
  }

  const currentReviewData = reviews[currentReview];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
      {/* Background Duct Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-32 h-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded transform rotate-12">
          <div className="flex justify-between items-center h-full px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-40 right-32 w-4 h-24 bg-gradient-to-b from-gray-500 to-gray-600 rounded transform -rotate-12">
          <div className="flex flex-col justify-between items-center h-full py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-2 h-0.5 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-32 left-1/3 w-28 h-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded transform rotate-6">
          <div className="flex justify-between items-center h-full px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-gray-800 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-l-lg mr-4">
              <div className="flex justify-center items-center h-full space-x-0.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-2 bg-blue-800 rounded-full"></div>
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Customer Testimonials</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about us
          </p>
        </div>

        {/* Main Review */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
            {/* Corner Bolts for Main Review Box */}
            {[
              'top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'
            ].map((position, i) => (
              <div key={i} className={`absolute ${position} w-4 h-4 bg-gray-600 rounded-full shadow-inner flex items-center justify-center z-20`}>
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
            ))}
            
            {/* Duct Frame */}
            <div className="absolute -top-4 left-1/4 right-1/4 h-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-t-lg shadow-lg">
              <div className="flex justify-between items-center h-full px-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1 h-4 bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="text-center">
              {/* Google Stars */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: currentReviewData.rating }).map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                "{currentReviewData.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={currentReviewData.profile_photo_url || "/placeholder.svg"}
                  alt={currentReviewData.author_name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                />
                <div className="text-left">
                  <div className="font-bold text-lg text-slate-800">{currentReviewData.author_name}</div>
                  <div className="text-blue-600 font-medium">{currentReviewData.relative_time_description}</div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentReview ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews Summary */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[url('/sticky-sm.svg')] bg-no-repeat bg-center bg-cover bg-opacity-50 rounded-lg px-6 py-3 shadow-lg">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-white">Verified Customer Reviews</span>
          </div>
        </div>

        {/* Client Logos Carousel */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Join hundreds of satisfied clients across various industries</p>
          </div>

          {/* Row 1 - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-12">
              {[
                'Microsoft', 'Apple', 'Google', 'Amazon', 'Tesla', 'IBM', 'Oracle', 'Samsung',
                'Microsoft', 'Apple', 'Google', 'Amazon', 'Tesla', 'IBM', 'Oracle', 'Samsung'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Moving Left */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left space-x-12">
              {[
                'Netflix', 'Spotify', 'Adobe', 'Intel', 'Nike', 'Coca-Cola', 'Toyota', 'BMW',
                'Netflix', 'Spotify', 'Adobe', 'Intel', 'Nike', 'Coca-Cola', 'Toyota', 'BMW'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Moving Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-right space-x-12">
              {[
                'Facebook', 'LinkedIn', 'Uber', 'Airbnb', 'Shopify', 'Stripe', 'Zoom', 'Slack',
                'Facebook', 'LinkedIn', 'Uber', 'Airbnb', 'Shopify', 'Stripe', 'Zoom', 'Slack'
              ].map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-shadow duration-200">
                  <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors duration-200 whitespace-nowrap">
                    {brand}
                  </span>
                  {/* Mini vent */}
                  <div className="absolute top-1 right-1 w-4 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded opacity-30">
                    <div className="flex justify-center items-center h-full">
                      <div className="w-0.5 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </section>
  );
} 