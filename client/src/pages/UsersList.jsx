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
import { SnackbarContext } from "../context/SnackbarContext";

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
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const languageReducer = "de";
    const { openSnackbar, closeSnackbar, setIsSnackbarOpen } =
      useContext(SnackbarContext);

  const [userLists, setUserLists] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");
    const canceled = queryParams.get("canceled");


    if (success) {
      toast.success("Payment was successful!");
    }

    if (canceled) {
      toast.error("Payment was canceled.");
    }
  }, [location.search]);

  const handlePush = () => {
    history("/app/create_ads");
  };

  const handledeleteList = (listId) => {
    userListService
      .deleteUserList(listId)
      .then(() => {
        fetchUserLists(); 
        openSnackbar(t("Listing was successfully deleted!"), "success", 2000);
        history("/app");
        history("/app/userLists");
      })
      .catch((err) =>{ openSnackbar(t("Failed to delete the listing."), "danger", 2000); console.log(err)});
  };

  const fetchUserLists = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/userList/my-properties`)
      .then((response) => {
        if (response.data.data.length === 0) {
          setNoData(true);
          setUserLists([]);
        } else {
          setUserLists(response.data.data.sort((a, b) => b.listNumber - a.listNumber));
          setNoData(false);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };


useEffect(() => {
  fetchUserLists();
}, [user]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <SetTitleTag />
        <PageTitle>{t("Meine Anzeigen")}</PageTitle>
        <div>
          <Button layout="outline" size="small" onClick={handlePush}>
            {dictionary["userLists"][languageReducer]["createAdBtn"]}
          </Button>
        </div>
      </div>

      {loading ? (
        // ✅ Loader
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-lg font-medium text-gray-600">Lade deine Immobilien…</span>
        </div>
      ) : (
        <>
          {userLists.length === 0 && noData ? (
            <div className="p-6 mb-4 w-2/3 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <p className="text-xl font-semibold">Du hast noch keine Immobilienanzeige erstellt.</p>
              <p className="my-5">Leg los &amp; erstelle deine erste Immobilienanzeige.</p>
              <Button size="regular" onClick={handlePush}>
                Anzeige erstellen
              </Button>
            </div>
          ) : (
            <div className="grid overflow-hidden">
              {userLists.map((data) => (
                <UserListDetails
                  key={data._id}
                  formData={data}
                  handledeleteList={handledeleteList}
                  isOpen={activeId === data?._id}
                  onToggle={() => setActiveId(activeId === data?._id ? null : data?._id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
