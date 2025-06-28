import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../assets/config/config";
import DeleteUserModal from "../components/Modals/DeleteUserModal";
import ThemedSuspense from "../components/ThemedSuspense";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { SearchIcon } from "../icons/index.js";
import PageError from "./Error";
import axios from "axios";
import MessageTable from "../components/Tables/MessageTable.jsx";
import { messageService } from "../services/message.service.jsx";
import MessageModal from "../components/Modals/MessageModal.jsx";

function Messages() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchMessages, setSearchMessages] = useState([]);
  const [value, setValue] = useState(false);
  const [messageLists, setMessageLists] = useState([]);
  const [noData, setNoData] = useState(false);

  const apiUrl = config.api.url;

  useEffect(() => {
    if (refreshing) openSnackbar("Refreshing messages...");
    else closeSnackbar();
  }, [refreshing, openSnackbar, closeSnackbar]);

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
    refreshMessages().then(() => setIsLoaded(true));
  }, [refreshMessages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/message/all`);
        if (response.data.statusCode === 200) {
          setMessageLists(response.data.data);
        } else {
          setNoData(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleAction = (message, type) => {
    setActiveMessage(message);
    if (type === "viewMessage") setShowMessageModal(true);
    else if (type === "deleteMessage") setShowDeleteModal(true);
    else setActiveMessage(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onModalClose = (type) => {
    setActiveMessage(null);
    if (type === "viewMessage") setShowMessageModal(false);
    else if (type === "deleteMessage") setShowDeleteModal(false);
  };

  const onModalAction = (type) => {
    setActiveMessage(null);
    if (type === "viewMessage") setShowMessageModal(false);
    else if (type === "deleteMessage") {
      setShowDeleteModal(false);
      refreshMessages();
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const handleSearch = (event) => {
    const input = event.target.value;
    if (!input) {
      setSearchMessages([]);
      setValue(false);
      return;
    }

    const regex = new RegExp(escapeRegExp(input), "i");
    const matchedMessages = messageLists.filter(
      (msg) =>
        regex.test(msg?.email) ||
        regex.test(msg?.name) ||
        regex.test(msg?.uniqId) ||
        regex.test(msg?.telephone)
    );

    setSearchMessages(matchedMessages);
    setValue(true);
  };

  if (!isLoaded) return <ThemedSuspense />;

  if (error) {
    const status = error?.response?.status;
    if (status === 401) {
      logout();
      return <Navigate to="/auth" />;
    }
    if (status === 403)
      return <PageError message="Unauthorized: Only admin can view/update all messages." />;
    return <PageError message="Some error occurred: please try again." />;
  }

  console.log("messageLists",messageLists)

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
                onChange={handleSearch}
              />
            </div>
          </Label>
        </div>
      </div>

      <MessageTable
        messages={value ? searchMessages : messages}
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
        types="message"
        onClose={onModalClose}
        onAction={onModalAction}
        m_user={activeMessage}
      />
    </>
  );
}

export default Messages;
