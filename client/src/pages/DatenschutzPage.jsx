import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";

const DatenschutzerklarungPage = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen">
      <HomeNavbar />
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="w-full max-w-7xl rounded-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Datenschutzerklärung
          </h1>
          <hr className="mb-4 border-gray-300" />
          <p className="mt-2 text-gray-600">
            Ihre Privatsphäre ist uns wichtig. Diese Datenschutzerklärung
            erläutert, welche Daten wir erheben und wie wir sie verwenden.
          </p>

          {/* Section: Verantwortlicher */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Verantwortlicher
            </h2>
            <p className="text-gray-700">
              <strong>SMARTINSERAT</strong> <br />
              Musterstraße 123 <br />
              12345 Musterstadt, Deutschland <br />
              E-Mail:{" "}
              <a href="mailto:datenschutz@smartinserat.de" className="text-blue-600 underline">
                datenschutz@smartinserat.de
              </a>
            </p>
          </div>

          {/* Section: Datenarten */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Welche Daten wir erheben
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Name, E-Mail-Adresse, Telefonnummer</li>
              <li>Nutzungsdaten (IP-Adresse, Browsertyp, Zugriffszeiten)</li>
              <li>Zahlungsinformationen (bei kostenpflichtigen Diensten)</li>
              <li>Nachrichten und Inhalte, die über unsere Plattform gesendet werden</li>
            </ul>
          </div>

          {/* Section: Zweck der Verarbeitung */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Zwecke der Datenverarbeitung
            </h2>
            <p className="text-gray-700">
              Wir verwenden Ihre Daten für:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Bereitstellung unserer Dienste</li>
              <li>Verwaltung und Sicherheit Ihres Kontos</li>
              <li>Statistische Analysen und Verbesserungen</li>
              <li>Marketing & personalisierte Inhalte (nur mit Ihrer Zustimmung)</li>
            </ul>
          </div>

          {/* Section: Cookies */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Cookies und Tracking
            </h2>
            <p className="text-gray-700">
              Unsere Website nutzt Cookies, um Ihre Benutzererfahrung zu verbessern. Sie können Ihre Einstellungen jederzeit anpassen.
            </p>
          </div>

          {/* Section: Nutzerrechte */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Ihre Rechte
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Auskunft über Ihre gespeicherten Daten</li>
              <li>Berichtigung falscher Daten</li>
              <li>Löschung Ihrer Daten (sofern keine gesetzliche Pflicht zur Speicherung besteht)</li>
              <li>Widerspruch gegen die Nutzung Ihrer Daten zu Werbezwecken</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Kontaktieren Sie uns unter{" "}
              <a href="mailto:datenschutz@smartinserat.de" className="text-blue-600 underline">
                datenschutz@smartinserat.de
              </a>, um Ihre Rechte auszuüben.
            </p>
          </div>

          {/* Section: Sicherheit */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">
              Speicherung und Sicherheit
            </h2>
            <p className="text-gray-700">
              Ihre Daten werden nur solange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist. Wir setzen moderne Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.
            </p>
          </div>

          {/* Last Updated */}
          <div className="mt-6 text-gray-600 text-sm">
            📌 Letzte Aktualisierung: <strong>April 2025</strong>
          </div>

          {/* Register Button */}
          <div className="mt-8  ">
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

export default DatenschutzerklarungPage;
