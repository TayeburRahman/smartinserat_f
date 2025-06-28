 
        
          import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";
import axios from "axios";
import { config } from "../assets/config/config";

const AGBPage = () => {
  const apiUrl = config.api.url;
  const [terms, setTerms] = useState("");  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { 
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-terms-conditions`);
        console.log("Response.data: ", response.data);
        setTerms(response.data.data.description); 
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      }
    };

    fetchTerms().then(() => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <HomeNavbar />

      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="w-full max-w-7xl rounded-lg p-6 md:p-10 text-gray-700">
        <h1 className="text-3xl font-bold mb-4">
            Allgemeine Geschäftsbedingungen (AGB) – SMARTINSERAT
          </h1>
          <hr className="mb-4 border-gray-300" />
          {/* ✅ Render HTML content safely */}
          {isLoaded ? (
            <div
              className="prose max-w-none text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          ) : (
            <p className="text-center">Loading Terms and Conditions...</p>
          )}

          {/* Call to Action Button */}
          <div className="mt-8">
            <Link
              to="/register"
              className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:text-white font-bold uppercase"
              style={{
                backgroundColor: "#6300FF",
              }}
            >
              Kostenlos registrieren
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AGBPage;
