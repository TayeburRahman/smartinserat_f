import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import UpdateUserForm from '../components/Forms/UpdateUserForm'
import UpdatePasswordForm from '../components/Forms/UpdatePasswordForm'
import { AuthContext } from '../context/AuthContext'
import { Helmet } from "react-helmet";
import { dictionary } from '../resources/multiLanguages'

function SetTitleTag () {
  return (
    <Helmet>
      <title>Einstellungen - Smartinserat</title>
    </Helmet>
  )
}

function Profile() {
  const { user } = useContext(AuthContext)
  const { t } = useTranslation();
  const languageReducer = "de";

  return (
    <>
      <SetTitleTag />
      <PageTitle>{dictionary["profile"][languageReducer]["settings"]}</PageTitle>
     

      <div className='flex flex-wrap gap-4'>
      <div className="w-full md:w-5/12 p-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <SectionTitle>{dictionary["profile"][languageReducer]["editProfile"]}</SectionTitle>

        <UpdateUserForm m_user={user}/>
      </div>

    

      <div className="w-full md:w-5/12 p-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <SectionTitle>{t("Passwort ändern")}</SectionTitle>
        <UpdatePasswordForm m_user={user}/>
      </div>
      </div>
    </>
  )
}

export default Profile