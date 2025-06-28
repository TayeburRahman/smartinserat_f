import React, {useEffect} from "react";
import { DesktopNavbar } from "../components/HeaderLanding";
import { MobileNavbar } from "../components/HeaderLanding"; 
import { Helmet } from "react-helmet";
const axios = require('axios');
function SectionFeaturesGrid({ children }) {
  useEffect(()=>{
    async function unsubscribe(params) {
      await axios.post('/aws/unsubscribe' + window.location.search);
    }
    unsubscribe();
  },[])
  return (
    <section className="flex justify-center py-8 md:py-16 bg-gray-50">
      <Helmet>
        <title>Smartinserat | Abmelden</title>
      </Helmet>
      <div className="text-left w-11/12 lg:w-3/4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-700">Du hast dich erfolgreich abgemeldet.</h1>
        <p className="my-4 text-md text-gray-600">
          Du wirst ab sofort keine weiteren E-Mails mehr von uns erhalten.
         </p>
      </div>
    </section>
  );
}

function Unsubscribe() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
      <SectionFeaturesGrid />
      {/* <Footer/> */}
    </>
  );
}

export default Unsubscribe;