import { lazy } from 'react'; 
// use lazy for better code splitting, a.k.a. load faster
const Logout = lazy(() => import('../pages/Logout'));
const Profile = lazy(() => import('../pages/Profile'));
const Users = lazy(() => import('../pages/Users'));
const Billing = lazy(() => import('../pages/Billing'));
const DashboardUser = lazy(() => import('../components/Dashboard/DashboardUser'));
const Forms = lazy(() => import('../pages/Forms'));
const Faq = lazy(() => import('../pages/FAQ'));
const CreateListing = lazy(() => import('../pages/CreateListing'));
const Page404 = lazy(() => import('../pages/404'));
const Buttons = lazy(() => import('../pages/Buttons'));
const UsersList = lazy(() => import('../pages/UsersList'));
const Unsubscribe = lazy(() => import('../pages/Unsubscribe'));
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'));
const userRoutes = [
  { path: '/profile', element: Profile },
  { path: '/create_ads', element: CreateListing },
  { path: '/faq', element: Faq },
  { path: '/users', element: Users },
  { path: '/userLists', element: UsersList },
  { path: '/billing', element: Billing },
  { path: '/buttons', element: Buttons },
  { path: '/user_dashboard', element: DashboardUser },
  { path: '/logout', element: Logout },
  { path: '/forms', element: Forms },
  { path: '/404', element: Page404 },
  { path: '/unsubscribe', element: Unsubscribe },
  { path: '/payment/stripe-webhooks/:session_id', element: PaymentSuccess },
];

export default userRoutes;
