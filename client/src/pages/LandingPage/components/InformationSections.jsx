import { FaUserPlus,FaRocket, FaEdit, FaBuilding, FaEnvelope, FaCreditCard, FaGlobe, FaMoneyBillWave } from "react-icons/fa";
import unbenannt from '../../../assets/images/unbenannt.png'
import logo from '../../../assets/images/logo.png'
import { Link } from "react-router-dom";


const steps = [
    { text: "GRATIS REGISTRIEREN", icon: <FaUserPlus className="text-3xl md:text-4xl" />, side: "right" },
    { text: "IMMOBILIENANZEIGE ERSTELLEN", icon: <FaBuilding className="text-3xl md:text-4xl" />, side: "right" },
    { text: "PAKET AUSWÄHLEN & BUCHEN", icon: <FaCreditCard className="text-3xl md:text-4xl" />, side: "right" },
    { text: "DEINE IMMOBILIE IST NUN AUF ALLEN PORTALEN ONLINE", icon: <FaGlobe className="text-3xl md:text-4xl" />, side: "right" },
    { text: "DIE ANZEIGE JEDERZEIT BEARBEITEN", icon: <FaEdit className="text-3xl md:text-4xl" />, side: "left" },
    { text: "ANFRAGEN IM SMARTINSERAT SAMMELPOSTFACH VERWALTEN UND BEANTWORTEN", icon: <FaEnvelope className="text-3xl md:text-4xl"  />, side: "left" },
    { text: "IMMOBILIE VERKAUFEN ODER VERMIETEN UND JEDERZEIT KÜNDIGEN", icon: <FaRocket className="text-3xl md:text-4xl" />, side: "left" },
    { text: "MAXIMALE REICHWEITE ÜBER 50% SPAREN SEI SMART", icon: <img src={logo} className="w-48"/>, side: "left" }
];

const InformationSections = () => {
    return (
        <div className="flex flex-col items-center bg-white" id="Ablauf"> 
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 h-10"/>
            <h2 className="text-1xl md:text-2xl font-bold text-royalPurple px-6">ABLAUF</h2>
            <h1 className="text-2xl md:text-3xl font-bold text-center text-black px-6 mt-4">WIE FUNKTIONIERT DAS SMARTINSERAT?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-black md:px-16 md:pt-16 w-full md:w-10/12 lg:w-10/12 mt-7">
                <div className="flex flex-col gap-6 px-6">
                    {steps.filter(step => step.side === "right").map((step, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div>
                                <div className="dot_"></div>
                                {index === steps.filter(step => step.side === "right").length - 1 && (
                                    <div className="longer_ md:hidden"></div>
                                )}
                                {index !== steps.filter(step => step.side === "right").length - 1 && (
                                    <div className="longer_"></div>
                                )}
                            </div>
                            <div className="flex items-center matring_top- gap-4 w-full justify-between">
                                <p className="font-bold text-1xl md:text-2xl">{step.text}</p>
                                <span className="text-purple-600 text-3xl md:text-4xl">{step.icon}</span>
                            </div>
                        </div>
                    ))}

                </div> 
                <div className="flex flex-col gap-6 px-6">
                    {steps.filter(step => step.side === "left").map((step, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <div>
                                <div className="dot_"></div>
                                {index !== steps.filter(step => step.side === "left").length - 1 && (
                                    <div className="longer_"></div>
                                )}
                            </div>
                            <div className="flex items-center matring_top- gap-4 w-full justify-between">
                                <p className="font-bold text-1xl md:text-2xl">{step.text}</p>
                                <span className="text-purple-600 text-2xl text-3xl md:text-5xl">{step.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div> 
            <div className="flex justify-center items-center text-black md:px-16 md:pt-16 w-full md:w-11/12 lg:w-3/4 mt-7">
          
            <Link
    to="/auth/login"
    className="text-white text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:text-white font-bold font-extrabold uppercase"
    style={{
      backgroundColor: '#6300FF',
    //   fontFamily: 'Filicudi Solid',
      color:"white"
    }}
  >
    IMMOBILIE INSERIEREN
  </Link> 
            </div>
            <div className="grid grid-cols md:grid-cols gap-6 items-center justify-center text-black  w-full">
                <img src={unbenannt}/> 
            </div>

        </div>
    );
};

export default InformationSections;
