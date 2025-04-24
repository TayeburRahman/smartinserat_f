import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ButtonSections = () => {
  return (
    <section className="grid md:flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-12 md:py-28 w-full bg-white">
      <Link
        to="/auth/create-account"
        className="hover:text-white bg-royalPurple text-white text-lg sm:text-xl  px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-extrabold uppercase"
        // style={{
        //     fontFamily: 'Filicudi Solid',
        // }}
      >
        GRATIS REGISTRIEREN
      </Link>

      <HashLink
        to="/#Preise"
        className="hover:text-white bg-royalPurple text-white text-lg sm:text-xl  px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-extrabold uppercase"
        // style={{
        //     fontFamily: 'Filicudi Solid',
        // }}
      >
        PREISE
      </HashLink>
    </section>
  );
};

export default ButtonSections;
