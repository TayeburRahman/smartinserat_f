import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { config } from "../assets/config/config";
import CreateUserModal from "../components/Modals/CreateUserModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";
import UpdatePasswordModal from "../components/Modals/UpdatePasswordModal";
import UpdateUserModal from "../components/Modals/UpdateUserModal";
import UserTable from "../components/Tables/UserTable";
import ThemedSuspense from "../components/ThemedSuspense";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { SearchIcon } from "../icons/index.js";
import { userService } from "../services";
import PageError from "./Error";
import axios from "axios";

function Users() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [resfreshing, setRefreshing] = useState(false);
  const [searchUsers, setSearchUsers] = useState("");
  const [value, setValue] = useState(false);
  const apiUrl = config.api.url;
  const [userLists, setUserLists] = useState([]);

  console.log('userLists', userLists)
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (resfreshing) {
      openSnackbar("Refresing users..");
    } else {
      closeSnackbar();
    }
  }, [resfreshing, openSnackbar, closeSnackbar]);



  const refreshUsers = useCallback(() => {
    setRefreshing(true);
    return userService
      .getUsers(currentPage)
      .then((data) => {
        setRefreshing(false);
        setUsers(data.data.results);
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
    refreshUsers().then(() => {
      setIsLoaded(true);
    });
  }, [refreshUsers]);

  const handleAction = (user, type) => {
    setActiveUser(user);
    switch (type) {
      case "createUser":
        setShowCreateModal(true);
        break;
      case "updateUser":
        setShowUpdateModal(true);
        break;
      case "updatePassword":
        setShowUpdatePasswordModal(true);
        break;
      case "deleteUser":
        setShowDeleteModal(true);
        break;
      default:
        setActiveUser(null);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${apiUrl}/admin/users`);

        console.log("userLists", response.data)
        if (response.data.statusCode === 200) {
          setUserLists(response?.data?.data?.results);
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
    setActiveUser(null);
    switch (type) {
      case "createUser":
        setShowCreateModal(false);
        break;
      case "updateUser":
        setShowUpdateModal(false);
        break;
      case "updatePassword":
        setShowUpdatePasswordModal(false);
        break;
      case "deleteUser":
        setShowDeleteModal(false);
        break;
      default:
        break;
    }
  };

  const onModalAction = (type) => {
    setActiveUser(null);
    switch (type) {
      case "createUser":
        setShowCreateModal(false);
        refreshUsers();
        break;
      case "updateUser":
        setShowUpdateModal(false);
        refreshUsers();
        break;
      case "updatePassword":
        setShowUpdatePasswordModal(false);
        break;
      case "deleteUser":
        setShowDeleteModal(false);
        refreshUsers();
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
          return <Redirect to="/auth" />;
        case 403:
          return (
            <PageError message="Unauthorized : Only admin can view/update all users." />
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
      setSearchUsers("");
      setValue(false);
    } else {
      setValue(true);
      const searchText = event?.target.value;


      console.log("Search text: ", searchText);
      console.log("userLists:", userLists)

      // Escaping special characters in the search text
      const escapedSearchText = escapeRegExp(searchText);

      // Creating a case-insensitive regular expression from the escaped search text
      const regex = new RegExp(escapedSearchText, "i");

      const matchedUsers = userLists?.filter((user) => {
        // Checking if any of the fields match the regular expression
        return (
          regex.test(user?.email) ||
          regex.test(user?.name) ||
          regex.test(user?.lastname) ||
          regex.test(user?.phone_number) ||
          regex.test(user?.authId?.role)
        );
      });

      console.log("matchedUers", matchedUsers)
      setSearchUsers(matchedUsers);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-16">
        <PageTitle>All Users</PageTitle>
        <div className="w-96">
          <Label>
            <div className="relative w-full focus-within:text-blue-400">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700"
                placeholder="Search for users..."
                component="form"
                onChange={handleSearch}
              />
            </div>
          </Label>
        </div>

        <div className="my-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAction(null, "createUser");
            }}
          >
            Create User
          </Button>
        </div>
      </div>
      <UserTable
        users={users}
        resultsPerPage={config.users.resultsPerPage}
        totalResults={totalResults}
        onAction={handleAction}
        onPageChange={handlePageChange}
        value={value}
        searchUsers={searchUsers}
      />
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={onModalClose}
        onAction={onModalAction}
      />
      <UpdateUserModal
        isOpen={showUpdateModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_user={activeUser}
      />
      <UpdatePasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_user={activeUser}
      />
      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_user={activeUser}
      />
    </>
  );
}

export default Users;