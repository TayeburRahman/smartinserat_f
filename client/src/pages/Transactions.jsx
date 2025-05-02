import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../assets/config/config";
// import CreateUserModal from "../components/Modals/CreateUserModal";
// import DeleteUserModal from "../components/Modals/DeleteUserModal";
// import UpdatePasswordModal from "../components/Modals/UpdatePasswordModal";
// import UpdateUserModal from "../components/Modals/UpdateUserModal"; 
import ThemedSuspense from "../components/ThemedSuspense";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext"; 
import PageError from "./Error";
import axios from "axios";
import { userListService } from "../services/userList.service.jsx"; 
import TransactionsTable from "../components/Tables/TransactionsTable.jsx";
import response from '../utils/demo/tableData'

function Transactions() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false); 
  const [userLists, setUserLists] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [resfreshing, setRefreshing] = useState(false);  
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
 


  return (
    <>
      <div className="flex justify-between items-center gap-16">
        <PageTitle>Transactions</PageTitle>
        <div className="w-96"> 
        </div>
      </div>
      <TransactionsTable
        userLists={userLists}
        resultsPerPage={config.users.resultsPerPage}
        totalResults={totalResults} 
        onPageChange={handlePageChange} 
      />
     
    </>
  );
}

export default Transactions;