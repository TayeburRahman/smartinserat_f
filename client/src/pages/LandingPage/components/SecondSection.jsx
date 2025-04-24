import HomeFilters from "./HomeFilters";
import image1 from "../../../assets/images/image-secon1.png"
import image2 from "../../../assets/images/image-secon2.png"
import image3 from "../../../assets/images/image-secon3.png"

const SecondSections = () => {
  return (
    <div className="relative w-full bg-gray-50 bg-cover bg-center h-[60vh] sm:h-[80vh] max-h-xl">
      {/* Partner Logos */}
      <div className="flex justify-center items-center gap-8 py-8 flex-wrap pt-16 mb-6 md:mb-24">
        <img src={image1} alt="Partner 1" className="w-20 sm:w-24 md:w-32" />
        <img src={image2} alt="Partner 2" className="w-20 sm:w-24 md:w-32" />
        <img src={image3} alt="Partner 3" className="w-20 sm:w-24 md:w-32" />
      </div>
      

      {/* Home Filters */}
      <div className="z-10 relative-bottom-12 w-full flex justify-center">
        <HomeFilters />
      </div>
    </div>
  );
};

export default SecondSections;
