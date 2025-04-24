import ImmoScout24 from "../../../assets/images/immoscout24.png";
import immobilien_horizontal from "../../../assets/images/immobilien_horiz.png";
import Immonet from "../../../assets/images/Immonet.png";
import Immowelt from "../../../assets/images/immowelt.png";

const PublishedOn = () => {
  return (
    <div className="w-full py-6 px-4 text-center bg-white">
      {/* Title */}
      <h2 className="text-black text-2xl md:text-3xl font-bold mb-6 mb-10">VERÖFFENTLICHT AUF:</h2>

      {/* Image Container */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-16 mt-5 mb-10">
        <img src={ImmoScout24} alt="ImmoScout24" className="h-12" />
        <img src={immobilien_horizontal} alt="Kleinanzeigen Immobilien" className="h-12" />
        <img src={Immonet} alt="Immonet" className="h-12" />
        <img src={Immowelt} alt="Immowelt" className="h-12" />
      </div>
    </div>
  );
};

export default PublishedOn;
