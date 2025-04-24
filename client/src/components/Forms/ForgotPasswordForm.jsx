import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import { dictionary } from '../../resources/multiLanguages'
import { useNavigate } from 'react-router-dom'

function ForgotPasswordForm() {
  const { forgotPassword, verifyOtp, resendForgetOtp } = useContext(AuthContext)
  const [saved, setSaved] = useState(false)
  const { t } = useTranslation()
  const languageReducer = "de";

  const history = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds

  const handleClick = (email) => {
    
    setIsDisabled(true);
    setTimeLeft(180); // 3 minutes in seconds

    resendForgetOtp(email);

    const countdownInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(countdownInterval); // Stop the interval when the countdown finishes
          setIsDisabled(false); // Re-enable the button
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Decrease time left every second
  };

  // AFTER CODE SENT ENTER CODE FORM
  if (saved) {
    const email = localStorage.getItem("forgot_password_account");
    return (
      <div className='flex flex-col gap-5'>
        <p className="text-sm font-medium text-gray-600">
          {dictionary["forgotPasswordForm"][languageReducer]["savedMessage"]}
        </p>

        <Formik
          initialValues={{
            code: '',
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string().required(dictionary["forgotPasswordOtpForm"][languageReducer]["requiredMessage"]),
          })}
          onSubmit={({ code }, { setStatus, setSubmitting }) => {
            setSubmitting(true)
            setStatus()
            verifyOtp(code, email)
              .then(response => {
                setSubmitting(false);
                setSaved(true);
                localStorage.setItem("forgot_password_account", email);
                history("/auth/recover-password");
              })
              .catch(error => {
                if (error.response) {
                  setStatus(error.response.data.message)
                } else {
                  setStatus(dictionary["forgotPasswordOtpForm"][languageReducer]["errorMessage"])
                }
                setSubmitting(false)
              })
          }}
        >
          {({ errors, status, touched, isSubmitting }) => (
            <Form>
              <Label>
                <span>{dictionary["forgotPasswordOtpForm"][languageReducer]["code"]}:</span>
                <Field className="mt-1" as={Input} name="code" type="text" placeholder={dictionary["forgotPasswordOtpForm"][languageReducer]["codePlaceholder"]} />
                {errors.code && touched.code ? (
                  <div>
                    <HelperText valid={false}>{t(errors.code)}</HelperText>
                  </div>
                ) : null}

              </Label>

              <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
                {dictionary["forgotPasswordOtpForm"][languageReducer]["cofirmButton"]}
              </Button>
              {status && (
                <HelperText valid={false}>{status}</HelperText>
              )}

              <Button className='p-0 mt-2 text-blue-600' onClick={() =>handleClick(email)} disabled={isDisabled} layout="link">
                {isDisabled ? `Wait ${timeLeft} seconds` : 'Resend OTP'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>



    )
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(dictionary["forgotPasswordForm"][languageReducer]["emailIsRequired"]),
      })}
      onSubmit={({ email }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        forgotPassword(email)
          .then(response => {
            setSubmitting(false)
            setSaved(true)
          })
          .catch(error => {
            if (error.response) {
              setStatus(error.response.data.message)
            } else {
              setStatus(dictionary["forgotPasswordForm"][languageReducer]["errorMessage"])
            }
            setSubmitting(false)
          })
      }}
    >
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label>
            <span>{dictionary["forgotPasswordForm"][languageReducer]["email"]}:</span>
            <Field className="mt-1" as={Input} name="email" type="email" placeholder={t("max.mustermann@gmail.com")} />
            {errors.email && touched.email ? (
              <div>
                <HelperText valid={false}>{t(errors.email)}</HelperText>
              </div>
            ) : null}

          </Label>

          <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
            {dictionary["forgotPasswordForm"][languageReducer]["recoverPassword"]}
          </Button>
          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm