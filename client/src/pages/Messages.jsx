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
import PageError from "./Error";
import axios from "axios";
import MessageTable from "../components/Tables/MessageTable.js";
import { messageService } from "../services/message.service.js";
import MessageModal from "../components/Modals/MessageModal.js";

function Messages() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [resfreshing, setRefreshing] = useState(false);
  const [searchMessages, setSearchMessages] = useState("");
  const [value, setValue] = useState(false);
  const apiUrl = config.api.url;
  const [messageLists, setMessageLists] = useState([]);

  console.log('messageLists', messageLists)
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (resfreshing) {
      openSnackbar("Refresing messages..");
    } else {
      closeSnackbar();
    }
  }, [resfreshing, openSnackbar, closeSnackbar]);



  const refreshMessages = useCallback(() => {
    setRefreshing(true);
    return messageService
      .getMessages(currentPage)
      .then((data) => {
        setRefreshing(false);
        setMessages(data.data.results);
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
    refreshMessages().then(() => {
      setIsLoaded(true);
    });
  }, [refreshMessages]);

  const handleAction = (user, type) => {
    setActiveMessage(user);
    switch (type) {
      case "viewMessage":
        setShowMessageModal(true);
        break;
      case "deleteMessage":
        setShowDeleteModal(true);
        break;
      default:
        setActiveMessage(null);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${apiUrl}/message/all`);

        console.log("messages", response.data)
        if (response.data.statusCode === 200) {
          setMessageLists(response?.data?.data);
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
    setActiveMessage(null);
    switch (type) {
      case "viewMessage":
        setShowMessageModal(false);
        break;
      case "deleteMessage":
        setShowDeleteModal(false);
        break;
      default:
        break;
    }
  };

  const onModalAction = (type) => {
    setActiveMessage(null);
    switch (type) {
      case "viewMessage":
        setShowMessageModal(false);
        break;
      case "deleteMessage":
        setShowDeleteModal(false);
        refreshMessages();
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
            <PageError message="Unauthorized : Only admin can view/update all messages." />
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
      setSearchMessages("");
      setValue(false);
    } else {
      setValue(true);
      const searchText = event?.target.value;


      console.log("Search text: ", searchText);
      console.log("messageLists:", messageLists)

      // Escaping special characters in the search text
      const escapedSearchText = escapeRegExp(searchText);

      // Creating a case-insensitive regular expression from the escaped search text
      const regex = new RegExp(escapedSearchText, "i");

      const matchedMessages = messageLists?.filter((user) => {
        // Checking if any of the fields match the regular expression
        return (
          regex.test(user?.email) ||
          regex.test(user?.name) ||
          regex.test(user?.uniqId) ||
          regex.test(user?.telephone)
        );
      });

      console.log("matchedUers", matchedMessages)
      setSearchMessages(matchedMessages);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-16">
        <PageTitle>All Messages</PageTitle>
        <div className="w-96">
          <Label>
            <div className="relative w-full focus-within:text-blue-400">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700"
                placeholder="Search for messages..."
                component="form"
                onChange={handleSearch}
              />
            </div>
          </Label>
        </div>

        {/* <div className="my-6">
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAction(null, "createUser");
            }}
          >
            Create User
          </Button>
        </div> */}
      </div>
      <MessageTable
        messages={messages}
        resultsPerPage={config.users.resultsPerPage}
        totalResults={totalResults}
        onAction={handleAction}
        onPageChange={handlePageChange}
        value={value}
        searchMessages={searchMessages}
      />
      <MessageModal
        isOpen={showMessageModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_message={activeMessage}
      />

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_user={activeMessage}
      />
    </>
  );
}

export default Messages;