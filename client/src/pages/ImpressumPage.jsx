import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";
import axios from "axios";
import { config } from "../assets/config/config";

const ImpressumPage = () => {
  const apiUrl = config.api.url;

  const [contact, setContact] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`${apiUrl}/manage-web/get-about-us`);
        setContact(response.data.data.description);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact().then(() => setIsLoaded(true));
  }, []);

  return (
    <div className="bg-gray-50 w-full">
      <HomeNavbar />
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="w-full max-w-7xl bg-white shadow-sm rounded-lg p-6 md:p-10 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Impressum</h2>
          <hr className="mb-4 border-gray-300" />

          {/* ✅ Render HTML from backend */}
          {isLoaded && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: contact }}
            />
          )}

          <div className="mt-10">
            <Link
              to="/register"
              className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-bold font-extrabold uppercase"
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

export default ImpressumPage;
