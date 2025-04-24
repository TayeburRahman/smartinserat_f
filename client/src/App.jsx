import "./App.css";
import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import ForwardRoute from "./components/Routes/ForwardRoute";
import Login from "./pages/Login";  

const Layout = lazy(() => import("./containers/Layout"));
const Auth = lazy(() => import("./containers/Auth"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
// const Immobilien = lazy(() => import("./pages/Immobilien"));
// const oneList = lazy(() => import("./pages/oneList"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
// const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Datenschutz = lazy(() => import("./pages/DatenschutzPage"));
const Widerrufsbelehrung = lazy(() => import("./pages/WiderrufPage"));
const Agb = lazy(() => import("./pages/AGBPage"));
// const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const AdsPage = lazy(() => import("./pages/AdsPage/AdsPage"));
const AdDetailsPage = lazy(() => import("./pages/AdDetailsPage/AdDetailsPage"));

function App() {
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Routes>
         <Route path="/auth/*" element={<ForwardRoute element={<Auth />} />} />
         <Route path="/impressum" element={<ImpressumPage />} />
         <Route path="/datenschutz" element={<Datenschutz />} />
         <Route path="/agb" element={<Agb />} /> 
         <Route path="/widerrufsbelehrung" element={<Widerrufsbelehrung />} /> 
         <Route path="/ads" element={<AdsPage />} />
         <Route path="/ads/:id" element={<AdDetailsPage />} />

        {/* <Route path="/immobilien/:page" element={<Immobilien />} />
        <Route path="/immobilien/id/:id" element={<oneList />} /> 
        <Route path="/unsubscribe" element={<Unsubscribe />} />   
        
        {/* Protected Route */}
       <Route path="/app/*" element={ <ProtectedRoute>  <Layout />  </ProtectedRoute>  } />
        {/* <Route path="/verify-email" element={<EmailVerification />} /> */}
        <Route path="/" element={<LandingPage />} />

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
