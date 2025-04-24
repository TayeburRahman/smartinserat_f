import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import { dictionary } from '../../resources/multiLanguages'
import { useNavigate } from 'react-router-dom'

function RecoverPasswordForm() {
    const { resetPassword } = useContext(AuthContext)
    const [saved, setSaved] = useState(false)
    const { t } = useTranslation()
    const languageReducer = "de";

    const email = localStorage.getItem("forgot_password_account");
    const history = useNavigate();

    // AFTER CODE SENT ENTER CODE FORM
    if (saved) {
        return (

            <p className="text-sm font-medium text-gray-600">
                {dictionary["recoverPasswordForm"][languageReducer]["savedMessage"]}
            </p>
        )

    }

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .min(8)
                    .matches("^.*[0-9].*$", (dictionary["recoverPasswordForm"][languageReducer]["passwordRequiredMessage1"]))
                    .matches("^.*[a-zA-Z].*$", (dictionary["recoverPasswordForm"][languageReducer]["passwordRequiredMessage2"]))
                    .required(t("Required")),
                confirmPassword: Yup.string()
                    .min(8)
                    .matches("^.*[0-9].*$", (dictionary["recoverPasswordForm"][languageReducer]["passwordRequiredMessage1"]))
                    .matches("^.*[a-zA-Z].*$", (dictionary["recoverPasswordForm"][languageReducer]["passwordRequiredMessage2"]))
            })}
            onSubmit={({ password, confirmPassword }, { setStatus, setSubmitting }) => {
                setSubmitting(true)
                setStatus()
                resetPassword(email, password, confirmPassword)
                    .then(response => {
                        setSubmitting(false)
                        setSaved(true)
                        history("/auth/login");
                    })
                    .catch(error => {
                        if (error.response) {
                            setStatus(error.response.data.message)
                        } else {
                            setStatus(dictionary["recoverPasswordForm"][languageReducer]["errorMessage"])
                        }
                        setSubmitting(false)
                    })
            }}
        >
            {({ errors, status, touched, isSubmitting }) => (
                <Form>
                    <Label>
                        <span>{dictionary["recoverPasswordForm"][languageReducer]["newPassword"]}:</span>
                        <Field className="mt-1" as={Input} name="password" type="password" placeholder={"***************"} />
                        {errors.password && touched.password ? (
                            <div>
                                <HelperText valid={false}>{t(errors.password)}</HelperText>
                            </div>
                        ) : null}

                    </Label>
                    <Label className='mt-2'>
                        <span>{dictionary["recoverPasswordForm"][languageReducer]["confirmPassword"]}:</span>
                        <Field className="mt-1" as={Input} name="confirmPassword" type="password" placeholder={"***************"} />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div>
                                <HelperText valid={false}>{t(errors.confirmPassword)}</HelperText>
                            </div>
                        ) : null}

                    </Label>

                    <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
                        {dictionary["recoverPasswordForm"][languageReducer]["cofirmButton"]}
                    </Button>
                    {status && (
                        <HelperText valid={false}>{status}</HelperText>
                    )}
                </Form>
            )}
        </Formik>
    )
}

export default RecoverPasswordForm;