import smartInsetImage1 from "../../../assets/images/IMG_0805.jpeg";
import smartInsetImage2 from "../../../assets/images/IMG_0806.jpeg";
import smartInsetImage3 from "../../../assets/images/IMG_0808.jpeg";

const PhoneImageSection = () => {
  return (
    <div className="w-full px-1 text-center bg-white">
      <div className="max-w-screen-lg mx-auto" id="Funktionen">
        <h3 className="text-royalPurple text-1xl sm:text-2xl font-extrabold font-bold uppercase mb-3">
          FUNKTIONEN
        </h3>
        <h2 className="text-black text-2xl sm:text-3xl font-extrabold">
          WAS KANN DAS <span className="text-royalPurple">SMART</span>INSERAT ?
        </h2>

        <div className="flex justify-center items-center gap-4 mt-10 mb-10  px-6">
          <img
            src={smartInsetImage1}
            alt="SmartInserat Phone Screens 1"
            className="w-1/3 max-w-[200px] "
          />
          <img
            src={smartInsetImage2}
            alt="SmartInserat Phone Screens 2"
            className="w-1/3 max-w-[200px] "
          />
          <img
            src={smartInsetImage3}
            alt="SmartInserat Phone Screens 3"
            className="w-1/3 max-w-[200px] "
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneImageSection;