import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import { dictionary } from '../../resources/multiLanguages'
import { useNavigate } from 'react-router-dom'

function ActiveAccountOTPForm() {
  const { accountActive, resendActiveOtp } = useContext(AuthContext)
  const [saved, setSaved] = useState(false)
  const { t } = useTranslation()
  const languageReducer = "de";
  const history = useNavigate();

  const email = localStorage.getItem("active_email");


  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds

  const handleClick = () => {
    setIsDisabled(true);
    setTimeLeft(60); // 1 minutes in seconds

    resendActiveOtp(email);

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



  if (saved) {
    return (
      <p className="text-sm font-medium text-gray-600">
        {dictionary["activeAccountOTPForm"][languageReducer]["savedMessage"]}
      </p>
    )
  }

  return (
    <Formik
      initialValues={{
        code: ''
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().min(1).required(dictionary["activeAccountOTPForm"][languageReducer]["requiredMessage"]),
      })}
      onSubmit={({ code }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        console.log("form", email);
        accountActive(code, email)
          .then(response => {
            setSubmitting(false);
            setSaved(true);
            console.log("accountactive ", response)
            if (response.data.data.user.authId.role === "ADMIN") {
              history("/app/admin_dashboard");
            } else {
              history("/app/user_dashboard");
            }
          })
          .catch(error => {
            if (error.response) {
              setStatus(error.response.data.message)
            } else {
              setStatus(dictionary["activeAccountOTPForm"][languageReducer]["errorMessage"])
            }
            setSubmitting(false)
          })
      }}
    >
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label>
            {/* <span>{dictionary["activeAccountOTPForm"][languageReducer]["em"]}:</span> */}
            <Field className="mt-1" as={Input} name="code" type="text" placeholder={dictionary["activeAccountOTPForm"][languageReducer]["codePlaceholder"]} />
            {errors.code && touched.code ? (
              <div>
                <HelperText valid={false}>{t(errors.code)}</HelperText>
              </div>
            ) : null}

          </Label>


          <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting} >
            {dictionary["activeAccountOTPForm"][languageReducer]["confirmButton"]}
          </Button>
          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}

          <Button className='p-0 mt-2 text-blue-600' onClick={handleClick} disabled={isDisabled} layout="link">
            {isDisabled ? `Wait ${timeLeft} seconds` : 'Resend OTP'}
          </Button>

        </Form>
      )}
    </Formik>
  )
}

export default ActiveAccountOTPForm