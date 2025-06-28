

import { useContext, useEffect, useState } from "react";
import { LocationOn } from "@mui/icons-material";
import { Badge, Button, Label } from "@windmill/react-ui";
import { Input } from "@windmill/react-ui";
import toast from "react-hot-toast";
import ThemedSuspense from "../ThemedSuspense";
import ReactImageGallery from "react-image-gallery";

import * as styles from "./styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import HomeNavbar from "../../pages/LandingPage/components/HomeNavbar";
import Footer from "../Footer";
import axios from "axios";
import { config } from "../../assets/config/config";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const AdDetailsContainer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [adDetails, setAdDetails] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [loading, setLoaing] = useState(true);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`${config.api.url}/message`, {
        name,
        email,
        telephone,
        message,
        uniqId: adDetails.uniqId
      });

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

  const fillUserData = () => {
    if (user) {
      setName(`${user.name} ${user.lastname}`);
      setEmail(user.email);
      setTelephone(user.phone_number);
    }
  };

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(`${config.api.url}/userList/details/${id}`);
        setAdDetails(response.data.data);
      } catch (error) {
        console.log("Failed to fetch ad details", error);
      }
    };

    fetchAdDetails();
    fillUserData();
  }, [id]);

  if (!adDetails) {
    return <ThemedSuspense />;
  }

  return (
    <div className="bg-gray-50 min-h-screen" id="top">
      <HomeNavbar />
      <main className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center bg-gray-50 py-10">
          <div className="w-full px-5 xl:px-0 flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full">
                {!adDetails?.imgCollection ? (
                  <ThemedSuspense />
                ) : adDetails?.imgCollection.length !== 0 ? (
                  <ReactImageGallery
                    additionalClass={styles}
                    items={adDetails?.imgCollection.map((img) => ({
                      original: img,
                      thumbnail: img
                    }))}
                  />
                ) : null}
              </div>
              <div className="lg:max-w-sm w-full">
                <h1 className="w-full text-left text-black font-semibold text-lg md:text-xl lg:text-2xl mb-4">
                  Information
                </h1>
                <div className="flex flex-col w-full gap-x-10 gap-y-2">

                  {adDetails?.city && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Stadt: </h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.city}</p>
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
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Objektart:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {t(
                          {
                            APARTMENT: "Wohnung",
                            SPECIAL_PURPOSE: "Land",
                            TRADE_SITE: "Gewerblich",
                            INVESTMENT: "Investition",
                            HOUSE: "Haus",
                          }[adDetails.buildingType] || adDetails.buildingType
                        )}
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
                  {adDetails?.plotArea && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Grundstücksfläche:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.plotArea}
                      </p>
                    </div>
                  )}

                  {adDetails?.flatType && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Wohnungstyp:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.flatType}
                      </p>
                    </div>
                  )}

                  {adDetails?.typeOfHeating && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Heizungsart:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.typeOfHeating}
                      </p>
                    </div>
                  )}

                  {adDetails?.typeOfEnergyPass && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Energiepass Typ:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.typeOfEnergyPass}
                      </p>
                    </div>
                  )}

                  {adDetails?.energyEfficiencyClass && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Energieeffizienzklasse:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.energyEfficiencyClass}
                      </p>
                    </div>
                  )}

                  {adDetails?.commission && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Provision:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.commission}
                      </p>
                    </div>
                  )}

                  {adDetails?.additionalCost && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Zusätzliche Kosten:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.additionalCost}
                      </p>
                    </div>
                  )}

                  {adDetails?.parkingSpacePrice && (
                    <div className="flex flex-row justify-between gap-2 items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Parkplatzpreis:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.parkingSpacePrice}
                      </p>
                    </div>
                  )}

                  {adDetails?.floor && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Etage:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.floor}</p>
                    </div>
                  )}

                  {adDetails?.specificBuildingType && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Spezifischer Gebäudetyp:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.specificBuildingType}</p>
                    </div>
                  )}

                  {/* {typeof adDetails?.newBuilding === 'boolean' && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Neubau:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">
                        {adDetails.newBuilding ? 'Ja' : 'Nein'}
                      </p>
                    </div>
                  )} */}

                  {adDetails?.typeOfParkingSpace && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Parkplatztyp:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.typeOfParkingSpace}</p>
                    </div>
                  )}

                  {adDetails?.pass_valid_till && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Energiepass gültig bis:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.pass_valid_till}</p>
                    </div>
                  )}

                  {adDetails?.stateOfDevelopment && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Erschließungsstand:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.stateOfDevelopment}</p>
                    </div>
                  )}

                  {adDetails?.energyPassCreationDate && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Energiepass erstellt am:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.energyPassCreationDate}</p>
                    </div>
                  )}

                  {adDetails?.secuirityCost && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Kaution:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.secuirityCost}</p>
                    </div>
                  )}

                  {adDetails?.state && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Bundesland:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.state}</p>
                    </div>
                  )}

                  {!adDetails?.hideAddress && adDetails?.address && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Adresse:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.address}</p>
                    </div>
                  )}

                  {adDetails?.contactName && adDetails?.lastName && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Kontaktperson:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{`${adDetails.contactName} ${adDetails.lastName}`}</p>
                    </div>
                  )}

                  {adDetails?.phone && (
                    <div className="flex justify-between items-center w-full">
                      <h1 className="lg:text-md text-gray-600">Telefon:</h1>
                      <p className="lg:text-md text-gray-900 font-semibold">{adDetails.phone}</p>
                    </div>
                  )}

                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col gap-5 w-full">
                <h1 className="text-left text-xl md:text-3xl lg:text:4xl text-gray-900 font-bold">
                  {adDetails.listingTitle}
                </h1>
                <div className="flex flex-row gap-2 justify-start">
                  <Badge className="px-4 py-1">{adDetails.listingType}</Badge>
                  <div className="flex flex-row justify-center items-center gap-1">
                    <LocationOn color="secondary" />
                    <span className="text-xs font-light text-gray-600">{adDetails.city}</span>
                  </div>
                </div>
                <h1 className="text-left text-xl md:text-2xl lg:text-3xl text-gray-900 font-bold">
                  {adDetails.listingPrice} €
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Beschreibung</h1>
              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Besonderheiten der Immobilie</h1>
              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.features}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">Lage der Immobilie</h1>
              <p className="text-sm md:text-base lg:text-lg font-normal text-gray-600">
                {adDetails.location}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
                Sie interessieren sich für diese Immobilie?
              </h1>
              <div className="flex flex-col gap-3 max-w-2xl">
                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder="Your name"
                  size="small"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder="Your email address"
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder="Your telephone number"
                  size="small"
                  onChange={(e) => setTelephone(e.target.value)}
                  value={telephone}
                />
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  rows={5}
                  placeholder="Your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />

                <div className="flex flex-row justify-start items-center text-black">
                  <Label check className="text-black">
                    <Input type="checkbox" />
                    <span className="ml-2">
                      I hereby confirm that I have read the General Terms and Conditions / Cancellation Policy and accept them.
                    </span>
                  </Label>
                </div>
                <div className="mt-2">
                  <Button
                    onClick={handleSendMessage}
                    className="text-black text-lg sm:text-xl px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 font-bold font-extrabold uppercase"
                    style={{
                      backgroundColor: "#6300FF",
                      color: "white",
                    }}
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
