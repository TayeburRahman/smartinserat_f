import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { AuthContext } from "../context/AuthContext";
import { HashLink } from "react-router-hash-link";
import {
  NewTabIcon,
  QuestionMark,
  MenuIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"; // Radix UI for dropdown
import { dictionary } from "../resources/multiLanguages";

function Header() {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const languageReducer = "de";
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex lg:justify-end justify-between h-full px-6 mx-auto text-blue-600 dark:text-gray-200">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple bg-gray-50 text-purple-500"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Profile menu */}
          <li className="relative">
            {user?.profile_image ? (
              <img
                className="cursor-pointer w-10 h-10 rounded-full"
                onClick={handleProfileClick}
                src={user?.profile_image}
                alt={user?.name?.slice(0, 1)}
              />
            ) : (
              <button
                className="rounded-full capitalize h-10 w-10 p-3 flex items-center justify-center font-bold bg-gray-300 dark:text-blue-600 focus:shadow-outline-purple focus:outline-none"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              >
                {user?.name?.slice(0, 1)}
              </button>
            )}

            {/* Radix Dropdown Menu */}
            <DropdownMenu open={isProfileMenuOpen} onOpenChange={setIsProfileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <li aria-label="Profile options" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 rounded-md bg-white shadow-lg w-56">
                <div className="text-xs px-2 mb-1 text-gray-500">
                  {
                    dictionary["navbarDropDown"][languageReducer][
                      "customerName"
                    ]
                  }
                  : {user?.name}
                </div>
                <Link to="/app/profile">
                  <DropdownMenuItem className="d_flex_">
                    <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                    {dictionary["navbarDropDown"][languageReducer]["settings"]}
                  </DropdownMenuItem>
                </Link>
                <Link to="/app/faq">
                  <DropdownMenuItem className="d_flex_">
                    <QuestionMark className="w-4 h-4 mr-3" aria-hidden="true" />
                    {dictionary["navbarDropDown"][languageReducer]["faq"]}
                  </DropdownMenuItem>
                </Link>
                <div className="border-b my-2"></div>
                <HashLink className=""
                  target="_blank"
                  rel="noopener noreferrer"
                  smooth
                  to="/impressum/#top"
                >
                  <DropdownMenuItem className="d_flex_">
                    {dictionary["navbarDropDown"][languageReducer]["imprint"]}
                    <NewTabIcon className="w-4 h-4 ml-2" aria-hidden="true" />
                  </DropdownMenuItem>
                </HashLink>
                <HashLink className=""
                  target="_blank"
                  rel="noopener noreferrer"
                  smooth
                  to="/datenschutz/#top"
                >
                  <DropdownMenuItem className="d_flex_">
                    {
                      dictionary["navbarDropDown"][languageReducer][
                        "dataProtection"
                      ]
                    }
                    <NewTabIcon className="w-4 h-4 ml-2" aria-hidden="true" />
                  </DropdownMenuItem>
                </HashLink>
                <div className="border-b my-2"></div>
                <Link onClick={handleLogout}>
                  <DropdownMenuItem className="d_flex_">
                    <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                    {dictionary["navbarDropDown"][languageReducer]["logoutBtn"]}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
