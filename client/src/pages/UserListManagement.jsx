import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../assets/config/config";
// import CreateUserModal from "../components/Modals/CreateUserModal";
// import DeleteUserModal from "../components/Modals/DeleteUserModal";
// import UpdatePasswordModal from "../components/Modals/UpdatePasswordModal";
// import UpdateUserModal from "../components/Modals/UpdateUserModal";
import UserListTable from "../components/Tables/UserListTable.jsx";
import ThemedSuspense from "../components/ThemedSuspense";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { SearchIcon } from "../icons/index.js";
import PageError from "./Error";
import axios from "axios";
import { userListService } from "../services/userList.service.jsx";
import DeleteUserListModal from "../components/Modals/DeleteUserListModal.jsx";
import PauseUserListModal from "../components/Modals/PauseUserListModal.jsx";
import UnpauseUserListModal from "../components/Modals/UnpauseUserListModal.jsx";

function UserListManagement() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeUserList, setActiveUserList] = useState(null);
  const [userLists, setUserLists] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [resfreshing, setRefreshing] = useState(false);
  const [searchUserLists, setSearchUserLists] = useState("");
  const [value, setValue] = useState(false);
  const apiUrl = config.api.url;
  const [userListings, setUserListings] = useState([]);

  console.log('userLists', userLists)

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (resfreshing) {
      openSnackbar("Refresing UserLists..");
    } else {
      closeSnackbar();
    }
  }, [resfreshing, openSnackbar, closeSnackbar]);

  const refreshUserLists = useCallback(() => {
    setRefreshing(true);
    return userListService
      .getUserLists(currentPage)
      .then((data) => {
        setRefreshing(false);
        setUserLists(data.data.results);
        setTotalResults(data.data.totalResults);
        return null;
      })
      .catch((err) => {
        setRefreshing(false);
        setError(err);
        return null;
      });
  }, [currentPage]);

  useEffect(() => {
    refreshUserLists().then(() => {
      setIsLoaded(true);
    });
  }, [refreshUserLists]);

  const handleAction = (userList, type) => {
    setActiveUserList(userList);
    switch (type) {
      case "pauseListing":
        setShowApproveModal(true);
        break;
      case "unpauseListing":
        setShowCancelModal(true);
        break;
      case "deleteListing":
        setShowDeleteModal(true);
        break;
      default:
        setActiveUserList(null);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${apiUrl}/admin/userlists`);

        console.log("userLists", response.data)
        if (response.data.statusCode === 200) {
          setUserListings(response?.data?.data?.results);
        } else {
          setNoData(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onModalClose = (type) => {
    setActiveUserList(null);
    switch (type) {
      case "pauseListing":
        setShowApproveModal(false);
        break;
      case "unpauseListing":
        setShowCancelModal(false);
        break;
      case "deleteListing":
        setShowDeleteModal(false);
        break;
      default:
        break;
    }
  };

  const onModalAction = (type) => {
    setActiveUserList(null);
    switch (type) {
      case "pauseListing":
        setShowApproveModal(false);
        refreshUserLists();
        break;
      case "unpauseListing":
        setShowCancelModal(false);
        refreshUserLists();
        break;
      case "deleteUser":
        setShowDeleteModal(false);
        refreshUserLists();
        break;
      default:
        break;
    }
  };

  if (!isLoaded) {
    return <ThemedSuspense />;
  }

  if (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logout();
          return <Navigate to="/auth" />;
        case 403:
          return (
            <PageError message="Unauthorized : Only admin can view/update all UserLists." />
          );
        default:
          return <PageError message="Some error occured : please try again." />;
      }
    } else {
      return <PageError message="Some error occured : please try again." />;
    }
  }

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
  };

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setSearchUserLists("");
      setValue(false);
    } else {
      setValue(true);
      const searchText = event?.target.value;

      console.log("Search text: ", searchText);
      console.log("userListings:", userListings)

      // Escaping special characters in the search text
      const escapedSearchText = escapeRegExp(searchText);

      // Creating a case-insensitive regular expression from the escaped search text
      const regex = new RegExp(escapedSearchText, "i");

      const matchedUserLists = userLists?.filter((user) => {
        // Checking if any of the fields match the regular expression
        return (
          regex.test(user?.uniqId) ||
          regex.test(user?.listingTitle) ||
          regex.test(user?.listingType) ||
          regex.test(user?.city) ||
          regex.test(user?.listingPrice) ||
          regex.test(user?.email) ||
          regex.test(user?.subscription?.type)
        );
      });

      console.log("matchedUers", matchedUserLists)
      setSearchUserLists(matchedUserLists);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-16">
        <PageTitle>All User Listing</PageTitle>
        <div className="w-full sm:w-96">
          <Label>
            <div className="relative w-full focus-within:text-blue-400">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700"
                placeholder="Search for UserLists..."
                component="form"
                onChange={handleSearch}
              />
            </div>
          </Label>
        </div>
        {/* 
        <div className="my-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAction(null, "createUser");
            }}
          >
            Create UserList
          </Button>
        </div> */}
      </div>
      <UserListTable
        userLists={userLists}
        resultsPerPage={config.users.resultsPerPage}
        totalResults={totalResults}
        onAction={handleAction}
        onPageChange={handlePageChange}
        value={value}
        searchUserLists={searchUserLists}
      />
      <PauseUserListModal
        isOpen={showApproveModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_list={activeUserList}
      />
      <UnpauseUserListModal
        isOpen={showCancelModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_list={activeUserList}
      />
      <DeleteUserListModal
        isOpen={showDeleteModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_list={activeUserList}
      />
    </>
  );
}

export default UserListManagement;
