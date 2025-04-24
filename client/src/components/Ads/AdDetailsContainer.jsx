import { useState } from "react";
// import DemoImg from '../../assets/img/evaluation.jpg'
import { DesktopNavbar } from "../HeaderLanding";
import { MobileNavbar } from "../HeaderLanding";
import { LocationOn } from "@mui/icons-material";
import { Badge, Button, Label } from "@windmill/react-ui";
import { Input } from "@windmill/react-ui";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { config } from "../../assets/config/config";
// import { flowFactService } from "../../services";
import toast from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";
import ThemedSuspense from "../ThemedSuspense";
import ReactImageGallery from "react-image-gallery";

import * as styles from "./styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import HomeNavbar from "../../pages/LandingPage/components/HomeNavbar";
import Footer from "../Footer";

const AdDetailsContainer = () => {
  //   const { id } = useParams();

  //   const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  //   const [adDetails, setAdDetails] = useState(null);

  const adDetails = {
    listingTitle: "Villa in Berlin",
    listingType: "For Sale",
    city: "Berlin",
    listingPrice: "500000",
    entityId: "123456",
    uniqId: "123456",
    livingArea: "200",
    energy: true,
    numberOfBathrooms: 2,
    numberOfParkingSpaces: 2,
    zip: "12345",
    numberOfRooms: 5,
    numberOfBedrooms: 3,
    yearOfBuilding: 1990,
    buildingType: "Villa",
    numberOfGarages: 1,
    monthlyHousepayment: 200,
    numberOfFloors: 2,
    usableArea: 200,
    description:
      "This is a beautiful villa in the heart of Berlin. It has a beautiful garden and a swimming pool.",
  };

  //   const [imagesList, setImagesList] = useState([]);
  const imagesList = [
    {
      original:
        "https://t4.ftcdn.net/jpg/04/73/72/11/360_F_473721132_I9LNMCvx7Du6EdJNH91EywcNHzgtEclz.jpg",
    },
    {
      original:
        "https://cdn.prod.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg",
    },
    {
      original:
        "https://t4.ftcdn.net/jpg/04/73/72/11/360_F_473721132_I9LNMCvx7Du6EdJNH91EywcNHzgtEclz.jpg",
    },
  ];
  //   const [loading, setLoaing] = useState(true);
  const loading = false;
  const handleSendMessage = async () => {
    try {
      //   const response = await axios.post(`${config.api.url}/message`, {
      //     name,
      //     email,
      //     telephone,
      //     message,
      //     uniqId: adDetails.uniqId,
      //   });

      toast.success("Message sent");
      setName("");
      setEmail("");
      setTelephone("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen" id="top">
      <HomeNavbar />
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center bg-gray-50 py-10">
          <div className="w-full px-5 xl:px-0 flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Gallery / left side*/}
              <div className="w-full">
                {loading ? (
                  <ThemedSuspense />
                ) : imagesList.length !== 0 ? (
                  <ReactImageGallery
                    additionalClass={styles}
                    items={imagesList}
                  />
                ) : null}
              </div>
              {/* Feature / right side */}
              <div className="lg:max-w-sm w-full">
                {/* Information */}
                <h1 className="w-full text-left text-black font-semibold text-lg md:text-xl lg:text-2xl mb-4">
                  Information
                </h1>
                {/* <div className='flex flex-col gap-5 items-center w-full'> */}
                <div className="flex flex-col w-full gap-x-10 gap-y-2">
                  <div className="flex flex-row justify-between gap-2  items-center w-full">
                    <h1 className="lg:text-md text-gray-600">Objektnummer: </h1>
                    <p className="lg:text-md text-gray-900 font-semibold">
                      {adDetails.uniqId}
                    </p>
                  </div>
                  {adDetails?.city && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Stadt: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.city}
                      </p>
                    </div>
                  )}
                  {adDetails?.livingArea && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Wohnfläche: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {" "}
                        {adDetails?.livingArea}
                      </p>
                    </div>
                  )}
                  {adDetails?.energy && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Energieausweis:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.energy ? "available" : "not availabe"}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfBathrooms && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Badezimmer: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfBathrooms}
                      </p>
                    </div>
                  )}
                  {adDetails?.listingType && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Status: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.listingType}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfParkingSpaces && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Stellplätze:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfParkingSpaces}
                      </p>
                    </div>
                  )}
                  {adDetails.zip && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Postleitzahl:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.zip}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfRooms && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Anzahl Zimmer:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfRooms}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfBedrooms && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Anzahl Schlafzimmer:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfBedrooms}
                      </p>
                    </div>
                  )}
                  {adDetails?.yearOfBuilding && (
                    <div className="flex flex-row justify-between  gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Baujahr: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.yearOfBuilding}
                      </p>
                    </div>
                  )}
                  {adDetails?.buildingType && (
                    <div className="flex flex-row justify-between gap-2  items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Objektart: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.buildingType}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfGarages && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Garage: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfGarages}
                      </p>
                    </div>
                  )}
                  {adDetails?.monthlyHousepayment && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">House fee: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.monthlyHousepayment}
                      </p>
                    </div>
                  )}
                  {adDetails?.numberOfFloors && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Floors: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.numberOfFloors}
                      </p>
                    </div>
                  )}
                  {adDetails?.usableArea && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">
                        Usable area:{" "}
                      </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.usableArea}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              {/* Head text data */}
              <div className="flex flex-col gap-5 w-full">
                <h1 className="text-left text-xl md:text-3xl lg:text:4xl text-gray-900 font-bold">
                  {adDetails.listingTitle}
                </h1>

                <div className="flex flex-row gap-2 justify-start">
                  <Badge className="px-4 py-1">{adDetails.listingType}</Badge>

                  <div className="flex flex-row justify-center items-center gap-1">
                    <LocationOn color="secondary" />{" "}
                    <span className="text-xs font-light text-gray-600">
                      {adDetails.city}
                    </span>
                  </div>
                </div>
                <h1 className="text-left text-xl md:text-2xl lg:text-3xl text-gray-900  font-bold">
                  {adDetails.listingPrice} €
                </h1>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:2xl font-semibold text-gray-900">
                Beschreibung
              </h1>

              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.description}
              </p>
            </div>

            {/* Especial features */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:2xl font-semibold text-gray-900">
                Besonderheiten der Immobilie
              </h1>

              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.features}
              </p>
            </div>

            {/* Location of prop  */}
            <div className="flex flex-col gap-5">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:2xl font-semibold text-gray-900">
                Lage der Immobilie
              </h1>

              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.location}
              </p>
            </div>

            {/* Interested message sent  */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:2xl font-semibold text-gray-900">
                Sie interessieren sich für diese Immobilie?
              </h1>

              <div className="flex flex-col gap-3 max-w-2xl">
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Your name"
                  size="small"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Your email address"
                  size="small"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Your telephone number"
                  size="small"
                  onChange={(event) => setTelephone(event.target.value)}
                  value={telephone}
                />
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Your message..."
                  size="small"
                  onChange={(event) => setMessage(event.target.value)}
                  value={message}
                />

                <div className="flex flex-row justify-start items-center">
                  <Label check>
                    <Input type="checkbox" />
                    <span className="ml-2">
                      I hereby confirm that I have read the General Terms and
                      Conditions / Cancellation Policy and accept them.
                    </span>
                  </Label>
                </div>

                <div className="mt-2">
                  <Button
                    onClick={handleSendMessage}
                    className="hero-bg text-white text-base sm:text-lg py-3 px-10 rounded-lg w-full sm:w-auto hover:text-white font-bold"
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdDetailsContainer;
