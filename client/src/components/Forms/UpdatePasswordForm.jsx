import React, { useState } from 'react'
import { Input, Label, HelperText, Button } from '@windmill/react-ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { userService } from '../../services'
import { useTranslation } from 'react-i18next'
import { dictionary } from '../../resources/multiLanguages'

function UpdatePasswordForm({formRef, callback, m_user}) {
  const [saved, setSaved] = useState(false)
  const { t } = useTranslation();
  const languageReducer = "de";
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        oldPassword: ''
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required(t('Password is required')),
        newPassword: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required(t('Password is required')),
        confirmPassword: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required(t('Password is required')),
      })}
      onSubmit={({ oldPassword, newPassword, confirmPassword }, { setStatus, setSubmitting }) => {

        if(newPassword !== confirmPassword) {
          return setStatus("Password doesn't match.")
        }

        setSaved(false)
        setStatus()
        userService.updateUserPassword(oldPassword, newPassword, confirmPassword, m_user.email)
        .then(
          result => {
            setSaved(true)
            setSubmitting(false)
            if(callback) callback(result.data)
          },
          error => {
            console.log("ERRROR")
            console.log(error.response)
            setSubmitting(false);
            if(error.response) {
              setStatus(error.response.data.message)
            } else {
              setStatus("Some error occured.")
            }
            if(callback) callback(null)
          }
        )
      }}
    >  
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
           <Label>
            <span>{dictionary["profile"][languageReducer]["passwordForm"]["oldPassword"]}:</span>
            <Field className="mt-1" as={Input} name="oldPassword" type="password" placeholder="***************" />
            {errors.oldPassword && touched.oldPassword ? (
              <div>   
                <HelperText valid={false}>{t(errors.oldPassword)}</HelperText>
              </div>
            ) : null}
          </Label>

          <Label className='mt-5'>
            <span>{dictionary["profile"][languageReducer]["passwordForm"]["typeNewPassword"]}:</span>
            <Field className="mt-1" as={Input} name="newPassword" type="password" placeholder="***************" />
            {errors.newPassword && touched.newPassword ? (
              <div>   
                <HelperText valid={false}>{t(errors.newPassword)}</HelperText>
              </div>
            ) : null}
          </Label>
          <Label className='mt-5'>
            <span>{dictionary["profile"][languageReducer]["passwordForm"]["typeNewPassword"]}:</span>
            <Field className="mt-1" as={Input} name="confirmPassword" type="password" placeholder="***************" />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>   
                <HelperText valid={false}>{t(errors.confirmPassword)}</HelperText>
              </div>
            ) : null}
          </Label>

          {!formRef && 
            <Button className="mt-6" block type="submit" value="submit" disabled={isSubmitting}>
              {dictionary["profile"][languageReducer]["passwordForm"]["savePassword"]}
            </Button> 
          }

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}

          {saved && (
            <HelperText valid={true}>Saved!</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
  );
}

export default UpdatePasswordForm