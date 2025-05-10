import React, { useContext } from 'react';
import adminRoutes from '../../routes/sidebar';
import logo from '../../assets/images/logo.png';
import userRoutes from '../../routes/userSidebar';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from '../../icons';
import SidebarSubmenu from './SidebarSubmenu';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  let sidebarOptions;
  if (user?.authId?.role === 'USER') {
    sidebarOptions = userRoutes;
  } else if (user?.authId?.role === 'ADMIN') {
    sidebarOptions = adminRoutes;
  }

  const { t } = useTranslation();

  console.log("SidebarContent > sidebarOptions====", sidebarOptions);

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link to="/app">
        <img src={logo} className="w-3/5 ml-4" alt="My logo" />
      </Link>
      <ul className="mt-16">
        {sidebarOptions && sidebarOptions?.map((route, i) =>
          route?.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            route?.name ? (
              <li
                className={`relative px-6 py-3 ${pathname === route.path ? 'active_route' : ''}`}
                key={route.name}
              >
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `inline-flex items-center w-full text-sm font-semibold transition-colors duration-200 ease-in-out rounded-lg ${
                      isActive
                        ? 'text-gray-800 dark:text-gray-100'
                        : 'hover:text-gray-800 dark:hover:text-gray-200 hover:bg-[#fbf1ff]'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                  <span className="ml-4 mt-1">{t(route.name)}</span>
                </NavLink>
              </li>
            ) : (
              <li className="relative px-6 py-3" key={i}>
                <hr />
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
