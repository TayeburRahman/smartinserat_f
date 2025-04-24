import React from "react";
import { MultiStepForm } from "../components/Forms/MultiStepForm";
import PageTitle from "../components/Typography/PageTitle";
import { Helmet } from "react-helmet";
import { dictionary } from "../resources/multiLanguages";

function SetTitleTag () {
  const languageReducer = "de";
  return (
    <Helmet>
      <title>{dictionary["createAds"][languageReducer]["title"]} - Smartinserat</title>
    </Helmet>
  )
}

function Dashboard() {
  const languageReducer = "de";

  return (
    <div style={{ position: 'relative'}}>
      <SetTitleTag />
      <PageTitle>{dictionary["createAds"][languageReducer]["title"]}</PageTitle>
      <div className="w-full sm:w-11/12 lg:w-3/4 p-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <MultiStepForm />
      </div>
    </div>
  );
}

export default Dashboard;