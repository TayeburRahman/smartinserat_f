import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { MenuIcon } from "../../../icons";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../assets/images/logo.png";
import { HashLink } from "react-router-hash-link";

function NavbarContent({ handleClose }) {
  const user = null;
  return (
    <div className="fixed w-full inset-0 bg-white bg-opacity-95 p-10 pt-14 z-50 flex flex-col items-center space-y-6 lg:hidden">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="brand" className="h-8 md:h-10" />
        </Link>
        <Button size="small" layout="link" onClick={handleClose}>
          <CloseIcon className="h-8 w-8 text-gray-900" />
        </Button>
      </div>
      <nav className="flex w-full flex-col space-y-4 text-lg font-bold text-black">
        <a
          href="/#Ablauf"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          Ablauf
        </a>
        <a
          href="/#Leistungen"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          Leistungen
        </a>
        <a
          href="/#Preise"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          Preise
        </a>
        <a
          href="/#Funktionen"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          Funktionen
        </a>
        <a
          href="/#FAQ"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          FAQ
        </a>
        <a
          href="/#Rezensionen"
          onClick={handleClose}
          className="text-black font-bold hover:text-purple-700"
        >
          Rezensionen
        </a>
      </nav>
      {!user ? (
        <div className="flex flex-col space-y-3 w-full">
          <Link to="/auth/login" className="w-full">
            <Button layout="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link to="/auth/create-account" className="w-full">
            <Button className="w-full">Registrieren</Button>
          </Link>
        </div>
      ) : (
        <Link to="/app">
          <Button className="text-sm px-10 py-3">Dashboard</Button>
        </Link>
      )}
    </div>
  );
}

const HomeNavbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="w-full bg-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/">
          <img src={Logo} alt="brand" className="h-8 md:h-10" />
        </Link>

        <ul className="hidden lg:flex space-x-6 font-bold text-black">
          <li>
            <HashLink
              to="/#Ablauf"
              className="text-black font-bold hover:text-purple-700"
            >
              Ablauf
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#Leistungen"
              className="text-black font-bold hover:text-purple-700"
            >
              Leistungen
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#Preise"
              className="text-black font-bold hover:text-purple-700"
            >
              Preise
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#Funktionen"
              className="text-black font-bold hover:text-purple-700"
            >
              Funktionen
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#FAQ"
              className="text-black font-bold hover:text-purple-700"
            >
              FAQ
            </HashLink>
          </li>
          <li>
            <HashLink
              to="/#Rezensionen"
              className="text-black font-bold hover:text-purple-700"
            >
              Rezensionen
            </HashLink>
          </li>
        </ul>

        <div className="hidden lg:flex gap-4">
          <Link to="/auth/login">
            <Button layout="outline">Login</Button>
          </Link>
          <Link to="/auth/create-account">
            <Button>Registrieren</Button>
          </Link>
        </div>

        <Button
          size="small"
          layout="link"
          onClick={toggleNavbar}
          aria-label="Menu"
          className="lg:hidden focus:outline-none"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
      </div>
      {isNavbarOpen && <NavbarContent handleClose={toggleNavbar} />}
    </nav>
  );
};

export default HomeNavbar;
