import React from "react";
import HomeNavbar from "./LandingPage/components/HomeNavbar";
import Footer from "../components/Footer";

const WiderrufPage = () => {
  return (
    <div className="bg-gray-50 w-full">
            <HomeNavbar />
            <div className="flex items-center justify-center mt-10 mb-10">
            <div className="w-full max-w-7xl text-gray-800 rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-[#6300FF]">Widerrufsbelehrung</h1>

        <p className="mb-6">
          Verbraucher i.S. des § 13 BGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt,
          die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet
          werden können. Verbrauchern i.S. des § 13 BGB stehen nachfolgendes Widerrufsrecht zu:
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-[#6300FF]">Widerrufsrecht</h2>
          <p className="mb-4">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
          </p>
          <p className="mb-4">
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p className="mb-4">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns(</p>
          <div className="bg-white p-4 rounded-md shadow mb-4">
            <p className="font-semibold">SMARTINSERAT – Inh. Dominik Wagenmann</p>
            <p>Meinstr. 48, 38448 Wolfsburg</p>
            <p>Telefon: +49 (0) 5363 / 9469180</p>
            <p>E-Mail: support@smartinserat.de</p>
          </div>
          <p className="mb-4">
            ) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail)
            über Ihren Entschluss, diesen Vertrag zu wid
         </p>

         </section>
         </div> 
         </div> 
            <Footer />
        </div>
    );
};

export default WiderrufPage;