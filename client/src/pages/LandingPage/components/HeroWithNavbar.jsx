import HomeNavbar from "./HomeNavbar";
import { Link } from "react-router-dom";
import { dictionary } from "../../../resources/multiLanguages";

const HeroWithNav = () => {
  const languageReducer = "de";
  return (
    <section className="w-full flex flex-col items-center bg-custom-bg bg-center bg-blend-overlay bgwhite">
          <HomeNavbar />
      <div className="max-w-7xl mt-10 w-full px-5 xl:px-0">
     
        <div className="banner-text w-full flex flex-col items-center text-center py-10 px-5 md:px-10 lg:px-20 md:mb-10 md:mt-15 pb-40 md:pb-60 ">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-extrabold text-black">
            IMMOBILIEN
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-extrabold text-black">
            VERKAUFEN UND VERMIETEN
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-7xl font-extrabold text-purple-700 letter-animation">
            {dictionary["banner"][languageReducer]["broker"]
              .split("")
              .map((char, i) => (
                <span key={i} className="animated-letter">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </h1>

          <p className="text-sm sm:text-base md:text-3lg lg:text-3xl font-bold text-black mt-8 mb-5">
            1 SMARTINSERAT FÜR 4 IMMOBILIENPORTALE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              to="/auth/login"
              className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:text-white font-bold font-extrabold uppercase"
              style={{
                backgroundColor: "#6300FF",
                // fontFamily: 'Filicudi Solid',
                color: "white",
              }}
            >
              JETZT INSERIEREN
            </Link>

            <a
              href="/#Preise"
              className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hove:text-white font-bold font-extrabold uppercase"
              style={{
                backgroundColor: "#6300FF",
                // fontFamily: 'Filicudi Solid',
                color: "white",
              }}
            >
              PREISE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithNav;
