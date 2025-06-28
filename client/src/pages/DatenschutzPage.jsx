 

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";
import axios from "axios";
import { config } from "../assets/config/config";

const DatenschutzerklarungPage = () => {
  const apiUrl = config.api.url;
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-privacy-policy`);
        setPrivacyPolicy(response.data.data.description);
      } catch (error) {
        console.error("Error fetching privacy and policy:", error);
      }
    };
    fetchPrivacyPolicy().then(() => setIsLoaded(true));
  }, []);

  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <HomeNavbar />
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="w-full max-w-7xl rounded-lg p-6 md:p-10 text-gray-700">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Datenschutzerklärung
          </h1>
          <hr className="mb-4 border-gray-300" />
          {/* ✅ Show HTML content from the backend */}
          {isLoaded && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: privacyPolicy }}
            />
          )}

          {/* Register Button */}
          <div className="mt-8">
            <Link
              to="/register"
              className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-bold uppercase"
              style={{
                backgroundColor: "#6300FF",
                color: "white",
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

export default DatenschutzerklarungPage;

