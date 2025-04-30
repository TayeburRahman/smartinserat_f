import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Logout = lazy(() => import('../pages/Logout'));
const Profile = lazy(() => import('../pages/Profile'));
const Users = lazy(() => import('../pages/Users'));
const PackageManagement = lazy(() => import('../pages/PackageManagement'));
const UserListManagement = lazy(() => import('../pages/UserListManagement'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));
const PrivacyAndPolicy = lazy(() => import('../pages/PrivacyAndPolicy'));
const Imprint = lazy(() => import('../pages/Imprint'));
const Billing = lazy(() => import('../pages/Billing'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Forms = lazy(() => import('../pages/Forms'));
const Cards = lazy(() => import('../pages/Cards'));
const Charts = lazy(() => import('../pages/Charts'));
const Buttons = lazy(() => import('../pages/Buttons'));
const Modals = lazy(() => import('../pages/Modals'));
const Tables = lazy(() => import('../pages/Tables'));
const Page404 = lazy(() => import('../pages/404'));
const Blank = lazy(() => import('../pages/Blank'));

const adminRoutes = [ 
  { path: '/users', element: Users },
  { path: '/user-list-management', element: UserListManagement },
  { path: '/package-management', element: PackageManagement },
  { path: '/terms-and-conditions', element: TermsAndConditions },
  { path: '/privacy-and-policy', element: PrivacyAndPolicy },
  { path: '/imprint', element: Imprint },
  { path: '/billing', element: Billing },
  { path: '/logout', element: Logout },
  { path: '/forms', element: Forms },
  { path: '/cards', element: Cards },
  { path: '/charts', element: Charts },
  { path: '/buttons', element: Buttons },
  { path: '/modals', element: Modals },
  { path: '/tables', element: Tables },
  { path: '/404', element: Page404 },
  { path: '/blank', element: Blank },
  { path: '/profile', element: Profile },
];

export default adminRoutes;
