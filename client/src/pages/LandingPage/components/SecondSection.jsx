import HomeFilters from "./HomeFilters";
import image1 from "../../../assets/new/ImmoLogos-1.png" 
import image2 from "../../../assets/new/ImmoLogos-2.png" 
import image3 from "../../../assets/new/ImmoLogos-3.png" 
import image4 from "../../../assets/new/ImmoLogos-4.png" 
import image6 from "../../../assets/new/ImmoLogos-6.png" 

const SecondSections = () => {
  return ( 
      <div className="flex justify-center hero-bg w-full " 
      >
      {/* Partner Logos */}
      <div className="flex justify-center items-center gap-8 py-8 flex-wrap pt-16 mb-6">
        <img src={image1} alt="Partner 1" className="w-20 sm:w-24 md:w-32" />
        <img src={image2} alt="Partner 2" className="w-20 sm:w-24 md:w-32" />
        <img src={image3} alt="Partner 3" className="w-20 sm:w-24 md:w-32" />
        <img src={image4} alt="Partner 3" className="w-20 sm:w-24 md:w-32" />
        <img src={image6} alt="Partner 3" className="w-20 sm:w-24 md:w-32" />
      </div>
       
      
    </div>  
  );
};

export default SecondSections;
