import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomeNavbar from "./LandingPage/components/HomeNavbar";

const AGBPage = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen">
    <HomeNavbar />
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="w-full max-w-7xl rounded-lg p-6 md:p-10 text-gray-700">
          <h1 className="text-3xl font-bold mb-4">
            Allgemeine Geschäftsbedingungen (AGB) – SMARTINSERAT
          </h1>
          <hr className="mb-4 border-gray-300" />
          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">1. Leistungen</h2>
            <p>
              SMARTINSERAT bietet eine Online-Plattform zur Vermarktung von
              Immobilienanzeigen. Die Nutzung der Plattform ist grundsätzlich
              kostenlos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">2. Account des Nutzers</h2>
            <p>
              Zur Nutzung der Plattform ist eine Registrierung erforderlich. Der
              Nutzer verpflichtet sich, wahrheitsgemäße Angaben zu machen und
              sein Passwort sicher aufzubewahren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">3. Vertragsschluss</h2>
            <p>
              Ein Vertrag zwischen Nutzer und SMARTINSERAT kommt durch die
              Annahme des Angebots seitens des Betreibers zustande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">
              4. Rechte und Pflichten der Nutzer
            </h2>
            <p>
              Der Nutzer verpflichtet sich zur Einhaltung gesetzlicher
              Vorschriften und unterlässt das Veröffentlichen rechtswidriger
              Inhalte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">
              5. Preise und Zahlungsmodalitäten
            </h2>
            <p>
              Für kostenpflichtige Angebote gelten die auf der Plattform
              angegebenen Preise inkl. gesetzlicher Mehrwertsteuer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">6. Laufzeit und Kündigung</h2>
            <p>
              Der Vertrag läuft auf unbestimmte Zeit und kann von beiden Seiten
              jederzeit gekündigt werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">
              7. Verantwortlichkeit für Inhalte und Kommunikation
            </h2>
            <p>
              SMARTINSERAT übernimmt keine Verantwortung für die von Nutzern
              bereitgestellten Inhalte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">8. Nutzungsrechte</h2>
            <p>
              Mit dem Einstellen von Inhalten räumt der Nutzer SMARTINSERAT ein
              einfaches Nutzungsrecht zur Darstellung auf der Plattform ein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">9. Haftung</h2>
            <p>
              SMARTINSERAT haftet nur für Vorsatz und grobe Fahrlässigkeit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">10. Haftung gegenüber Dritten</h2>
            <p>
              Der Nutzer stellt SMARTINSERAT von sämtlichen Ansprüchen Dritter
              frei, die aufgrund der vom Nutzer bereitgestellten Inhalte
              entstehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">11. Widerrufsbelehrung</h2>
            <p>
              Details zum Widerrufsrecht finden Sie unter{" "}
              <a
                href="https://smartinserat.de/widerruf"
                className="text-[#6300FF] underline"
              >
                smartinserat.de/widerruf
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">12. Beschwerdemanagement</h2>
            <p>
              Der Support von SMARTINSERAT steht Nutzern bei Beschwerden zur
              Verfügung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">13. Datenschutz</h2>
            <p>
              Ausführliche Informationen finden Sie in unserer Datenschutzerklärung
              unter{" "}
              <a
                href="https://smartinserat.de/datenschutz"
                className="text-[#6300FF] underline"
              >
                smartinserat.de/datenschutz
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2 mt-3">14. Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist
              der Sitz des Betreibers.
            </p>
          </section> 

          {/* Repeat for each AGB section… */}

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

export default AGBPage;
