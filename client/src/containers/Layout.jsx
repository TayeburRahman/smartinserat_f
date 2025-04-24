import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import adminRoutes from '../routes/adminRoutes';
import userRoutes from '../routes/userRoutes';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from '../containers/Main';
import ThemedSuspense from '../components/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';
import { AuthContext } from '../context/AuthContext';

const Page404 = lazy(() => import('../pages/404'));

function Layout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const location = useLocation();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  if (!user) return null;

  return (
    <div  className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 ${
      isSidebarOpen && "overflow-hidden"
    }`}>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Routes>
              {/* Admin Routes */}
              {user?.authId?.role === 'ADMIN' &&
                adminRoutes.map((route, i) => (
                  <Route key={i} path={route.path} element={<route.element />} />
                ))
              }

              {/* User Routes */}
              {user?.authId?.role === 'USER' &&
                userRoutes.map((route, i) => (
                  <Route key={i} path={route.path} element={<route.element />} />
                ))
              }

              {/* Redirects for roles */}
              {user?.authId?.role === 'ADMIN' && (
                <Route path="/" element={<Navigate to="/user-list-management" />} />
              )}

              {user?.authId?.role === 'USER' && (
                <Route path="/" element={<Navigate to="/create_ads" />} />
              )}

              {/* 404 Route */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
