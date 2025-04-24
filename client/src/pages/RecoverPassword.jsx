import React from "react";
import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import logo from "../assets/images/logo.png";
import ImageLight from "../assets/images/forgot-password-office.jpeg";
import ImageDark from "../assets/images/forgot-password-office-dark.jpeg";
import { Helmet } from "react-helmet";
import { dictionary } from "../resources/multiLanguages";
import RecoverPasswordForm from "../components/Forms/RecoverPasswordForm";

function RecoverPassword() {
  // const { t } = useTranslation();
  const languageReducer = "de";
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>{dictionary["recoverPasswordPage"][languageReducer]["title"]} - Smartinserat</title>
      </Helmet>
      <Link
        to="/"
        className="px-8 pt-4 text-xl font-bold text-gray-800 dark:text-gray-200"
      >
        <img src={logo} className="w-40" alt="My logo" />
      </Link>
      <div className="flex flex-1 h-full items-center mt-4 lg:mt-0 p-6">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
          <div className="bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div className="flex flex-col overflow-y-auto md:flex-row">
              <div className="h-32 md:h-auto md:w-1/2">
                <img
                  aria-hidden="true"
                  className="object-cover w-full h-full dark:hidden"
                  src={ImageLight}
                  alt="Office"
                />
                <img
                  aria-hidden="true"
                  className="hidden object-cover w-full h-full dark:block"
                  src={ImageDark}
                  alt="Office"
                />
              </div>
              <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                   {dictionary["recoverPasswordPage"][languageReducer]["title"]} 
                  </h1>

                  <RecoverPasswordForm />

                  <hr className="my-8" />

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      to="/auth/create-account"
                    >
                      {dictionary["recoverPasswordPage"][languageReducer]["createAcount"]}
                    </Link>
                  </p>
                  <div className="mt-16 flex">
                    <p className="">
                      <Link
                        className="text-xs font-medium text-gray-700 dark:text-gray-100 hover:underline"
                        to="/impressum"
                      >
                        {dictionary["recoverPasswordPage"][languageReducer]["imprint"]}
                      </Link>
                    </p>
                    <p className="ml-2">
                      <Link
                        className="text-xs font-medium text-gray-700 dark:text-gray-100 hover:underline"
                        to="/datenschutz"
                      >
                        {dictionary["recoverPasswordPage"][languageReducer]["dataProtection"]}
                      </Link>
                    </p>
                    <p className="ml-2">
                      <Link
                        className="text-xs font-medium text-gray-700 dark:text-gray-100 hover:underline"
                        to="/agb"
                      >
                        {dictionary["recoverPasswordPage"][languageReducer]["termsAndConditionZ"]}
                      </Link>
                    </p>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;