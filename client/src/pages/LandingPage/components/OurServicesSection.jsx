import React from "react";
import { FaRegFileAlt, FaChartBar, FaEnvelope, FaSyncAlt, FaFileInvoice, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";

const OurServicesSection = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-lg shadow-sm">
          {/* Service Items */}
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-200 rounded-md">
              <div className="p-3 bg-purple-100 rounded-full">
                <service.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-black text-xl sm:text-2xl font-extrabold font-bold">{service.title}</h3>
                <p className="text-lg text-gray-600 font-bold ">{service.description}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-8 flex justify-center">

           
          <Link className="hover:text-white bg-royalPurple text-white text-lg sm:text-xl font-bold px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-extrabold uppercase"
            style={{ 
              // fontFamily: 'Filicudi Solid', 
            }}
          >
            IMMOBILIE INSERIEREN
          </Link>
        </div>

      </div>
    </section>
  );
};

const services = [
  {
    title: "ANZEIGE ERSTELLEN",
    description: "Unser Formular führt dich durch alle nötigen Angaben zu der Immobilie.",
    icon: FaRegFileAlt,
  },
  {
    title: "AUTOMATISIERUNG",
    description: "Unser Formular führt dich durch alle nötigen Angaben zu der Immobilie.",
    icon: FaSyncAlt,
  },
  {
    title: "SAMMELPOSTFACH",
    description: "Verwalten und beantworten Sie die Anfragen aller Portale bequem über Smartinserat.",
    icon: FaEnvelope,
  },
  {
    title: "ANZEIGENSTATISTIK",
    description: "Aktuelle Daten, z.B. wie oft deine Immobilie gesehen und geklickt wurde.",
    icon: FaChartBar,
  },
  {
    title: "AUTOM. RECHNUNG",
    description: "Nach Veröffentlichung kommt die Rechnung mit ausgewiesener MwSt. per E-Mail.",
    icon: FaFileInvoice,
  },
  {
    title: "24/7 LIVECHAT",
    description: "Bei Fragen stehen wir dir im Chat innerhalb weniger Minuten zur Verfügung.",
    icon: FaComments,
  },
];

export default OurServicesSection;