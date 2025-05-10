import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { AuthContext } from "../context/AuthContext";
import { ExternalLink } from 'lucide-react';
import { HashLink } from "react-router-hash-link";
import {
  QuestionMark,
  MenuIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { dictionary } from "../resources/multiLanguages";
import _ from "lodash";
import { Button } from "@mui/material";

function Header() {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const { user, logout } = useContext(AuthContext);
  const history = useNavigate();
  const languageReducer = "de";
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    history("/auth/login");
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex lg:justify-end justify-between h-full px-6 mx-auto text-blue-600 dark:text-gray-200">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            {user?.profile_image ? (
              <Avatar
                className="cursor-pointer outline-none"
                onClick={handleProfileClick}
                size="large"
                src={user?.profile_image}
                alt={user?.name?.slice(0, 1)}
              />
            ) : (
              <Button
                className="rounded-full capitalize h-6 w-6 p-5 flex items-center justify-center font-bold bg-gray-300 dark:text-blue-600 outline-none border-none text-[#555555]"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
              >
                {user?.name?.slice(0, 1)}
              </Button>
            )}

            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={_.debounce(() => setIsProfileMenuOpen(false))}
              className="border-none outline-none text-[#555555]"
            >
              <div className="px-2 py-1">
                <span className="text-[#555555] text-xs font-medium items-center ml-2">
                  {dictionary["navbarDropDown"][languageReducer]["customerName"]}: {user?.name}
                </span>
              </div>

              <Link to="/app/profile">
                <DropdownItem className="mb-1 transition-all duration-200 hover:bg-[#fbf1ff] hover:text-purple-800 rounded-lg text-[#555555] focus:outline-none focus:ring-0" tag="a">
                  <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {dictionary["navbarDropDown"][languageReducer]["settings"]}
                </DropdownItem>
              </Link>

              <Link to="/app/faq">
                <DropdownItem className="transition-all duration-200 hover:bg-[#fbf1ff] hover:text-purple-800 rounded-lg text-[#555555] focus:outline-none focus:ring-0" tag="a">
                  <QuestionMark className="w-4 h-4 mr-3" aria-hidden="true" />
                  {dictionary["navbarDropDown"][languageReducer]["faq"]}
                </DropdownItem>
              </Link>

              <div className="border-b my-2"></div>

              <HashLink target="_blank" rel="noopener noreferrer" smooth to="/impressum/#top">
                <DropdownItem className="transition-all duration-200 hover:bg-[#fbf1ff] hover:text-purple-800 rounded-lg mb-1 text-[#555555] focus:outline-none focus:ring-0" tag="a">
                  {dictionary["navbarDropDown"][languageReducer]["imprint"]}
                  <ExternalLink className="w-4 h-4 ml-2 text-[#8f8f8f]" aria-hidden="true" />
                </DropdownItem>
              </HashLink>

              <HashLink target="_blank" rel="noopener noreferrer" smooth to="/datenschutz/#top">
                <DropdownItem className="transition-all duration-200 hover:bg-[#fbf1ff] hover:text-purple-800 rounded-lg text-[#555555] focus:outline-none focus:ring-0" tag="a">
                  {dictionary["navbarDropDown"][languageReducer]["dataProtection"]}
                  <ExternalLink className="w-4 h-4 ml-2 text-[#8f8f8f]" aria-hidden="true" />
                </DropdownItem>
              </HashLink>

              <div className="border-b my-2"></div>

              <Link onClick={handleLogout}>
                <DropdownItem className="transition-all duration-200 hover:bg-[#fbf1ff] hover:text-purple-800 rounded-lg text-[#555555] mb-1 focus:outline-none focus:ring-0" tag="a">
                  <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  {dictionary["navbarDropDown"][languageReducer]["logoutBtn"]}
                </DropdownItem>
              </Link>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
