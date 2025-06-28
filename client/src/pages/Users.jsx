import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../assets/config/config";
import CreateUserModal from "../components/Modals/CreateUserModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";
import UpdatePasswordModal from "../components/Modals/UpdateUserModal.jsx";
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
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLists, setUserLists] = useState([]);
  const [noData, setNoData] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false)
const [selectedUser, setSelectedUser] = useState(null)

const handleClose = () => {
  setUpdateOpen(false)
  setSelectedUser(null)
}
  const apiUrl = config.api.url;

  const refreshUsers = useCallback(() => {
    setRefreshing(true);
    return userService
      .getUsers(currentPage)
      .then((data) => {
        setRefreshing(false);
        setUsers(data.data.results);
        setTotalResults(data.data.totalResults);
      })
      .catch((err) => {
        setRefreshing(false);
        setError(err);
      });
  }, [currentPage]);

  useEffect(() => {
    refreshUsers().then(() => setIsLoaded(true));
  }, [refreshUsers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/admin/users`);
        if (response.data.statusCode === 200) {
          setUserLists(response.data.data.results);
        } else {
          setNoData(true);
        }
      } catch (error) {
        console.log(error);
        setNoData(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (refreshing) {
      openSnackbar("Refreshing users...");
    } else {
      closeSnackbar();
    }
  }, [refreshing, openSnackbar, closeSnackbar]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 

  const onModalClose = (type) => {
    const modalSetters = {
      createUser: setShowCreateModal,
      updateUser: setShowUpdateModal,
      updatePassword: setShowUpdatePasswordModal,
      deleteUser: setShowDeleteModal,
    };
    setActiveUser(null);
    modalSetters[type]?.(false);
  };

  const onModalAction = (type) => {
    const modalSetters = {
      createUser: setShowCreateModal,
      updateUser: setShowUpdateModal,
      deleteUser: setShowDeleteModal,
      updatePassword: setShowUpdatePasswordModal,
    };
    
    setActiveUser(null);
    modalSetters[type]?.(false);
  
    if (["createUser", "updateUser", "deleteUser"].includes(type)) {
      refreshUsers();
    }
  };
 
 
  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchQuery(searchText);

    if (searchText === "") {
      setSearchQuery("");
    } else {
      const regex = new RegExp(escapeRegExp(searchText), "i");

      const matchedUsers = userLists.filter((user) =>
        [user?.email, user?.name, user?.lastname, user?.phone_number, user?.authId?.role].some((field) =>
          regex.test(field)
        )
      );

      setUsers(matchedUsers);
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  if (!isLoaded) {
    return <ThemedSuspense />;
  }

  if (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logout();
          return <Navigate to="/auth/login" />;
        case 403:
          return <PageError message="Unauthorized: Only admin can view/update all users." />;
        default:
          return <PageError message="An error occurred. Please try again." />;
      }
    } else {
      return <PageError message="An error occurred. Please try again." />;
    }
  }

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
                value={searchQuery}
              />
            </div>
          </Label>
        </div>

        <div className="my-6">
          <Button onClick={(e) => {
            e.preventDefault();
            handleAction(null, "createUser");
          }}>
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
      />

      <CreateUserModal isOpen={showCreateModal} onClose={onModalClose} onAction={onModalAction} />
      <UpdateUserModal isOpen={showUpdateModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser} /> 
      
      <UpdatePasswordModal isOpen={showUpdatePasswordModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser} />
      <DeleteUserModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser} />
    </>
  );
}

export default Users;
