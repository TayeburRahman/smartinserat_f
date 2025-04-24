import React, { useContext } from "react";
import logo from "../assets/images/logo-white.png";
import { Link } from "react-router-dom";
// import { Link } from "react-router-hash-link";
import { MenuIcon } from "../icons";
import { AuthContext } from "../context/AuthContext";

import { Button } from "@windmill/react-ui";

function NavbarContent() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="items-center grid grid-cols-1 lg:flex lg:gap-10 gap-6 text-sm font-bold text-gray-800 md:mr-4 mr-0">
        <Link
          className="text-white hover:text-gray-400 text-sm"
          smooth
          to="/landing/#Ablauf"
        >
          Ablauf
        </Link>
        <Link
          className="text-white  hover:text-gray-400 text-sm"
          smooth
          to="/landing/#Leistungen"
        >
          Leistungen
        </Link>
        <Link
          className="text-white  hover:text-gray-400 text-sm"
          smooth
          to="/landing/#Rezensionen"
        >
          Rezensionen
        </Link>
        <Link
          className="text-white  hover:text-gray-400 text-sm"
          smooth
          to="/landing/#Preise"
        >
          Preise
        </Link>
        <Link
          className="text-white hover:text-gray-400 text-sm"
          smooth
          to="/landing/#FAQ"
        >
          FAQ
        </Link>
      </div>
      {!user && (
        <Link to="/auth/login">
          <Button
            layout="outline"
            // className="text-sm px-10 py-3 text-gray-600"
            // style={{ color: "black" }}
          >
            Login
          </Button>
        </Link>
      )}
      {!user && (
        <Link to="/auth/create-account">
          <Button>Registrieren</Button>
        </Link>
      )}
      {user && (
        <Link to="/app">
          <Button className="text-sm px-10 py-3">Dashboard</Button>
        </Link>
      )}
    </div>
  );
}

function DesktopNavbar() {
  return (
    <aside className="hidden w-full lg:block nav-bg">
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="py-4 text-gray-500">
            <div className="flex-1 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-gray-800">
                <img src={logo} className="h-8" alt="My logo" />
              </Link>
              <NavbarContent />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MobileNavbar() {
  const [isNavbarOpen, setNavbarOpen] = React.useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <aside className="flex justify-center nav-bg">
      <div className="w-full md:w-11/12 lg:hidden">
        <div className="px-4 py-4 text-gray-500">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <Link to="/" className="text-xl font-bold text-gray-800">
                <img src={logo} className="h-10" alt="My logo" />
              </Link>
              <button
                className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                onClick={toggleNavbar}
                aria-label="Menu"
              >
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {isNavbarOpen && <NavbarContent />}
          </div>
        </div>
      </div>
    </aside>
  );
}

export { DesktopNavbar };
export { MobileNavbar };
