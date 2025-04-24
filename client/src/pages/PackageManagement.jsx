import { Button, Input, Label } from "@windmill/react-ui";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { config } from "../assets/config/config"; 
import ThemedSuspense from "../components/ThemedSuspense";
import PageTitle from "../components/Typography/PageTitle";
import { AuthContext } from "../context/AuthContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { SearchIcon } from "../icons/index.js";
import { packageService, userService } from "../services";
import PageError from "./Error";
import axios from "axios";
import PackagesTable from "../components/Tables/PackagesTable.js";
import DeletePackageModal from "../components/Modals/DeletePackageModal.js";
import UpdatePackageModal from "../components/Modals/UpdatePackageModal.js";
import CreatePackageModal from "../components/Modals/CreatePackageModal.js";

function PackageManagement() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const { logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activePackage, setActivePackage] = useState(null);
  const [packages, setPackages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [resfreshing, setRefreshing] = useState(false);
  const [searchPackages, setSearchPackages] = useState("");
  const [value, setValue] = useState(false);
  const apiUrl = config.api.url;
  const [packageLists, setPackageLists] = useState([]);

  console.log('packageLists', packageLists)
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (resfreshing) {
      openSnackbar("Refresing packages..");
    } else {
      closeSnackbar();
    }
  }, [resfreshing, openSnackbar, closeSnackbar]);



  const refreshPackages = useCallback(() => {
    setRefreshing(true);
    return packageService
      .getPackages(currentPage)
      .then((data) => {
        setRefreshing(false);
        setPackages(data.data.results);
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
    refreshPackages().then(() => {
      setIsLoaded(true);
    });
  }, [refreshPackages]);

  const handleAction = (user, type) => {
    setActivePackage(user);
    switch (type) {
      case "createPackage":
        setShowCreateModal(true);
        break;
      case "updatePackage":
        setShowUpdateModal(true);
        break;
      case "deletePackage":
        setShowDeleteModal(true);
        break;
      default:
        setActivePackage(null);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      try {
        // const response = await axios.get(`${apiUrl}/admin/packages`);
        const response = await axios.get(`${apiUrl}/package/getAllPackages`);
        

        console.log("First fetch packages", response.data)
        if(response.data.status === '200') {
          setPackageLists(response?.data?.data);
        } else {
          setNoData(true);
        }
      } catch (error) {
        console.log(error);
      }
      // axios
      //   .get(`${apiUrl}/v1/auth/get/users`)
      //   .then((response) => {

      //     if (response.data.message === 'success') {
      //       setUserLists(response?.data?.user);
      //       return
      //     }
      //     setNoData(true);
      //   })
      //   .catch((error) => console.log(error));
    }

    fetchData()
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onModalClose = (type) => {
    setActivePackage(null);
    switch (type) {
      case "createPackage":
        setShowCreateModal(false);
        break;
      case "updatePackage":
        setShowUpdateModal(false);
        break;
      case "deletePackage":
        setShowDeleteModal(false);
        break;
      default:
        break;
    }
  };

  const onModalAction = (type) => {
    setActivePackage(null);
    switch (type) {
      case "createPackage":
        setShowCreateModal(false);
        refreshPackages();
        break;
      case "updatePackage":
        setShowUpdateModal(false);
        refreshPackages();
        break;
      case "deletePackage":
        setShowDeleteModal(false);
        refreshPackages();
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
            <PageError message="Unauthorized : Only admin can view/update all packages." />
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
      setSearchPackages("");
      setValue(false);
    } else {
      setValue(true);
      const searchText = event?.target.value;


      console.log("Search text: ", searchText);
      console.log("In search Packages packageLists:", packageLists)

        // Escaping special characters in the search text
        const escapedSearchText = escapeRegExp(searchText);

        // Creating a case-insensitive regular expression from the escaped search text
        const regex = new RegExp(escapedSearchText, "i");
  
        const matchedPackages = packageLists?.filter((user) => {
          // Checking if any of the fields match the regular expression
          return (
            regex.test(user?.packageName) ||
            regex.test(user?.packageDescription) ||
            regex.test(user?.listingType) ||
            regex.test(user?.subscriptionType) ||
            regex.test(user?.subscriptionDuration) ||
            regex.test(user?.price)
          );
        });
  


      // const matchedPackages = packageLists?.filter((pkg) =>
      //   pkg?.packageName.toLowerCase().includes(searchText.toLowerCase())
      // );

      console.log("matchedPackages", matchedPackages)
      setSearchPackages(matchedPackages);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-16">
        <PageTitle>All Packages</PageTitle>
        <div className="w-96">
          <Label>
            <div className="relative w-full focus-within:text-blue-400">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700"
                placeholder="Search for packages..."
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
              handleAction(null, "createPackage");
            }}
          >
            Create Package
          </Button>
        </div>
      </div>
      <PackagesTable
        packages={packages}
        resultsPerPage={config.users.resultsPerPage}
        totalResults={totalResults}
        onAction={handleAction}
        onPageChange={handlePageChange}
        value={value}
        searchPackages={searchPackages}
      />
      <CreatePackageModal
        isOpen={showCreateModal}
        onClose={onModalClose}
        onAction={onModalAction}
      />
      <UpdatePackageModal
        isOpen={showUpdateModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_package={activePackage}
      />
      <DeletePackageModal
        isOpen={showDeleteModal}
        onClose={onModalClose}
        onAction={onModalAction}
        m_package={activePackage}
      />
    </>
  );
}

export default PackageManagement;