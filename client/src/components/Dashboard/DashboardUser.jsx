import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import RoundIcon from "../../components/RoundIcon";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { MultiStepFormValuation } from "../components/Forms/MultiStepFormValuation";
// import { MultiStepFormEnergy } from "../components/Forms/MultiStepFormEnergy"
// import  LineLeftIcon from "../icons/line-angle-left.svg";
import { HomeIcon } from "../../icons";
import { Button, Badge, Card, CardBody } from "@windmill/react-ui";
import axios from "axios";
import { config } from "../../assets/config/config";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { dictionary } from "../../resources/multiLanguages";
import { AuthContext } from "../../context/AuthContext";
// import { PricingCardEnergy } from "../components/Cards/PricingCardEnergy";

function SetTitleTag() {
  return (
    <Helmet>
      <title>Home - Smartinserat</title>
    </Helmet>
  );
}

const apiUrl = config.api.url;

function Dashboard() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  const history = useNavigate();
  const [userLists, setUserLists] = useState([]);

  const [valuation, setValuation] = useState(false);
  const [energy, setEnergyForm] = useState(false);

  const handlePush = () => {
    history("/app/create_ads");
  };

  const viewListings = () => {
    history("/app/userLists");
  };

  const [activeListLength, setActiveListLength] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios
        .get(`${apiUrl}/userList/my-properties`)
        .then((response) => {
          setUserLists(response.data.data);
          const activeList = response.data.data.filter(
            (list) =>
              list.subscription.type === "BASIC" ||
              list.subscription.type === "MEDIUM" ||
              list.subscription.type === "PREMIUM"
          );
          setActiveListLength(activeList.length);

        })
        .catch((error) => console.log(error));
    }
    return () => {
      isMounted = false;
    };
  }, [user]);
  const languageReducer = "de";

  return (
    <>
      {!valuation && !energy &&
        <>
          <div className="flex items-center">
            <SetTitleTag />
            <PageTitle className="mr-5">Home</PageTitle>

          </div>

          {/* <!-- Cards --> */}
          <div className="block flex flex-wrap gap-4 mb-10">
            <div className="md:w-5/12 sm:w-12">
              <div className="whitespace h-4"></div>
              <InfoCard title={dictionary["userDashboard"][languageReducer]["totalAds"]} value={userLists.length ? userLists.length : "0"}>
                <RoundIcon
                  icon={HomeIcon}
                  iconColorClass="text-blue-500 dark:text-blue-100"
                  bgColorClass="bg-blue-100 dark:bg-blue-500"
                  className="mr-4"
                />
              </InfoCard>
            </div>
            <div className="md:w-5/12 sm:w-12">
              <div className="whitespace h-4"></div>
              <InfoCard title={dictionary["userDashboard"][languageReducer]["activeAds"]} value={activeListLength}>
                <RoundIcon
                  icon={HomeIcon}
                  iconColorClass="text-blue-500 dark:text-blue-100"
                  bgColorClass="bg-blue-100 dark:bg-blue-500"
                  className="mr-4"
                />
              </InfoCard>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="flex flex-wrap gap-4 items-start">
            {userLists.length >= 1 ? (
              <Card className="lg:flex w-full md:w-8/12 mb-8">
                <CardBody className="mt-0 pt-0 pr-4 md:pr-0">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 pt-4">

                      <p className="mb-6 font-semibold text-gray-600 dark:text-gray-300">
                        Hey {user?.name} 👋, {dictionary["userDashboard"][languageReducer]["welcomeGreeting"]}
                      </p>
                      <p>
                        {" "}
                        {dictionary["userDashboard"][languageReducer]["interactMessage"]}{" "}
                      </p>
                      <Button onClick={viewListings} className="mt-6">
                        {t("view listings")}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <Card className="lg:flex w-full md:w-10/12 mb-8">
                <CardBody className="mt-0 pt-0 pr-0">
                  <div>
                    <div className="md:flex block gap-8">
                      <div className="text-gray-600 dark:text-gray-400 pt-4">
                        <div>
                          <p className="mb-6 font-semibold text-gray-600 dark:text-gray-300">
                            Hey {user?.name} 👋, {t("Herzlich willkommen!")}
                          </p>{" "}
                          {dictionary["userDashboard"][languageReducer]["noListingMessage"]}{" "}
                        </div>
                        <Button onClick={handlePush} className="mt-6">
                          {dictionary["userDashboard"][languageReducer]["createAdBtn"]}
                        </Button>
                      </div>
                      {/* <div className="block md:hidden mt-8">
                        <ReactPlayer
                          controls={true}
                          width="300px"
                          height="168px"
                          url="https://info-at-Smartinserat.wistia.com/medias/zcyat9qnce"
                          playsinline={true}
                        />
                      </div>
                      <div className="hidden md:block">
                        <ReactPlayer
                          controls={true}
                          width="300px"
                          height="168px"
                          url="https://info-at-Smartinserat.wistia.com/medias/zcyat9qnce"
                        />
                      </div> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}


          </div>

        </>
      }
      {/* {valuation &&
        <>
        <Button onClick={()=> setValuation(false)} className="mt-6 mr-4 text-left w-3/12" layout="link">
             <img className="w-1 mr-2" src={LineLeftIcon}/> {t("Zurück zum Dashboard")}
            </Button>
        <PageTitle className="mr-5">{t("Immobilie bewerten")}</PageTitle>
          <Card className="mt-4 mb-4  md:w-9/12">
            <CardBody>
            <MultiStepFormValuation setValuation={setValuation}/>
            </CardBody>
          </Card>
        </>
      }
       {energy &&
        <>
        <Button onClick={()=> setEnergyForm(false)} className="mt-6 mr-4 text-left w-3/12" layout="link">
             <img className="w-1 mr-2" src={LineLeftIcon}/> {t("Zurück zum Dashboard")}
            </Button>
        <PageTitle className="mr-5">{t("Energieausweis bestellen")}</PageTitle>
          <Card className="mt-4 mb-4  md:w-9/12">
            <CardBody>
            <MultiStepFormEnergy setEnergyForm = {setEnergyForm}/>
            </CardBody>
          </Card>
        </>
      } */}
    </>
  );
}

export default Dashboard;