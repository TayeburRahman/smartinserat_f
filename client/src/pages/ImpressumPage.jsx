import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";

const ImpressumPage = () => {
    return (
        <div className="bg-gray-50 w-full">
            <HomeNavbar />
            <div className="flex items-center justify-center mt-10 mb-10">
            <div className="w-full max-w-7xl bg-white shadow-sm rounded-lg p-6 md:p-10">

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Impressum</h2>
                    <hr className="mb-4 border-gray-300" />

                    <div className="text-gray-700 space-y-2">
                        <p className="font-medium text-lg">SMARTINSERAT</p>
                        <p>Inhaber: Dominik Wagenmann</p>
                        <p>Meinstr. 48</p>
                        <p>38448 Wolfsburg</p>
                    </div>


                    <div className="mt-6 text-gray-700 space-y-1">
                        <p className="font-medium text-lg">Kontakt:</p>
                        <p>Tel.: <a href="tel:+4953639469180" className="text-blue-600 hover:underline">+49 (0) 5363 / 9469180</a></p>
                        <p>Email: <a href="mailto:hallo@smartinserat.de" className="text-blue-600 hover:underline">hallo@smartinserat.de</a></p>
                    </div>
                    <div className="mt-6 text-gray-700">
                        <p className="font-medium text-lg">Umsatzsteuer-ID:</p>
                        <p>DE350718964</p>
                    </div>

                    <div className="mt-6 text-gray-700">
                        <p>
                            Unsere Allgemeinen Geschäftsbedingungen gelten für die von uns bereitgestellten
                            Dienstleistungen. Sie finden diese unter{" "}
                            <a href="https://smartinserat.de/agb" className="text-blue-600 hover:underline">
                                https://smartinserat.de/agb
                            </a>
                            . Diese Bedingungen legen fest, dass deutsches Recht gilt und soweit zulässig, Wolfsburg als Gerichtsstand vereinbart wird.
                        </p>
                    </div>

                    <div className="mt-4 text-gray-700">
                        <p>
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden:{" "}
                            <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline">
                                https://ec.europa.eu/consumers/odr/
                            </a>
                            .
                        </p>
                    </div>

                    <div className="mt-4 text-gray-700">
                        <p>Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                    </div>


                    <div className="mt-6">
                        <Link
                            to="/register"
                            className="hero-bg hover:text-white text-white text-lg font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
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



