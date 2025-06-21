import { Button } from "@windmill/react-ui";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { config } from "../assets/config/config";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { userListService } from "../services";
import UserListDetails from "./UserListDetails";
import toast from "react-hot-toast";
import { dictionary } from "../resources/multiLanguages";

function SetTitleTag () {
  return (
    <Helmet>
      <title>Meine Immobilien - 321maklerfrei</title>
    </Helmet>
  )
}
const apiUrl = config.api.url;

export default function UserList() {
  const history = useNavigate();
  const [activeId, setActiveId] = useState(null); 
  const location = useLocation();

  const languageReducer = "de";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");
    const canceled = queryParams.get("canceled");

    if (success) {
      toast.success("Payment was successful!");
      console.log("I was success UserList.js")
    }

    if (canceled) {
      toast.error("Payment was canceled.");
      console.log("I was canceled UserList.js")
    }
  }, [location.search]);

  const handlePush = () => {
    history.push("/app/create_ads");
  };

  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  // const email = user.email;

  const handledeleteList = (listId) => {
    userListService
      .deleteUserList(listId)
      .then((res) => {
        history.push("/app");
        history.replace("/app/userLists");
      })
      .catch((err) => console.log(err));
  };


  const [userLists, setUserLists] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiUrl}/userList/my-properties`)
      .then((response) => {

        console.log("MyList", response.data.data);

        if(response.data.data.length === 0){
          setNoData(true);
          setUserLists([]);
          return
        }
        setUserLists(response.data.data.sort((a,b) => b.listNumber - a.listNumber));
      })
      .catch((error) => console.log(error));
  }, [user]);

  // response.data.sort((a,b) => b.listNumber - a.listNumber)

  return (
    <div>
      <div className="flex gap-4 items-center">
        <SetTitleTag />
        <PageTitle>{t("my listings")}</PageTitle>
        <div>
          <Button
            layout="outline"
            size="small"
            component="span"
            onClick={handlePush}
            // className="text-gray-900"
          >
           {dictionary["userLists"][languageReducer]["createAdBtn"]}
          </Button>
        </div>
      </div>
      <div>
        <div>
          {userLists?.length === 0 && noData && (
            <div className="p-6 mb-4 w-2/3 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <p className="text-xl font-semibold">Du hast noch keine Immobilienanzeige erstellt.</p>
              <p className="my-5">
                Leg los &amp; erstelle deine erste Immobilienanzeige.
              </p>
              <Button size="regular" component="span" onClick={handlePush}>
                Anzeige erstellen
              </Button>
            </div>
          )}
        </div>
        <div className="grid overflow-hidden ">

          {userLists.length > 0 &&
            userLists?.map((data) => (
              <UserListDetails
                key={data._id}
                formData={data}
                handledeleteList={handledeleteList}
                isOpen={activeId === data?._id}
                onToggle={() =>
                  setActiveId(activeId === data?._id ? null : data?._id)
                }
              />
            ))}
        </div>
      </div>
      </div>
  );
}