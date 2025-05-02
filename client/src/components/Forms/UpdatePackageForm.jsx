import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { packageService, userService } from '../../services'
import { AuthContext } from '../../context/AuthContext'
import { Input, Label, HelperText, Button, Select } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { dictionary } from '../../resources/multiLanguages';

function UpdatePackageForm({ formRef, callback, m_package }) {
  const { user, setUser } = useContext(AuthContext)
  const [saved, setSaved] = useState(false)
  const { t } = useTranslation()
  const languageReducer = "de";

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        packageName: m_package?.packageName ? m_package.packageName : '',
        packageDescription: m_package?.packageDescription ? m_package.packageDescription : '',
        price: m_package?.price ? m_package.price : '',
        listingType: m_package?.listingType ? m_package.listingType : '',
        subscriptionType: m_package?.subscriptionType ? m_package.subscriptionType : '',
        subscriptionDuration: m_package?.subscriptionDuration ? m_package.subscriptionDuration : null,
      }}
      validationSchema={Yup.object().shape({
        packageName: Yup.string().required("Package name is required"),
        packageDescription: Yup.string().required("PackageDescription is required"),
        price: Yup.string().required(),
        listingType: Yup.string().required(),
        subscriptionType: Yup.string().required(),
        subscriptionDuration: Yup.number().required(),
      })}
      onSubmit={({ packageName, packageDescription, price, listingType, subscriptionType, subscriptionDuration }, { setStatus, setSubmitting }) => {
        setSaved(false)
        setStatus()
        packageService.updatePackage(m_package._id, {
          packageName,
          packageDescription,
          price,
          listingType,
          subscriptionType,
          subscriptionDuration
        })
          .then(
            response => {
              setSaved(true)
              setSubmitting(false)

              console.log("Updatform response.data", response.data);

              //   if (user._id === m_package._id) {
              //     setUser(response.data.data)
              //     localStorage.setItem("user", JSON.stringify(response.data.data));
              //   } 
              if (callback) callback(response.data)
            },
            error => {
              setSubmitting(false);
              if (error.response) {
                setStatus(t(error.response.data));
              } else {
                setStatus(t('Some error occured.'));
              }
              if (callback) callback(null)
            }
          );
      }}
    >
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <div className='flex flex-col gap-4'>
            <Label className='flex-1'>
              <span>Package Name:</span>
              <Field className="mt-1" as={Input} name="packageName" type="text" placeholder="Enter package name" />
              {errors.packageName && touched.packageName ? (
                <div>
                  <HelperText valid={false}>{t(errors.packageName)}</HelperText>
                </div>
              ) : null}
            </Label>

            <Label className='flex-1'>
              <span>Package Description:</span>
              <Field className="mt-1" as={Input} name="packageDescription" type="text" placeholder="Enter package description" />
              {errors.packageDescription && touched.packageDescription ? (
                <div>
                  <HelperText valid={false}>{t(errors.packageDescription)}</HelperText>
                </div>
              ) : null}
            </Label>

            <Label className='flex-1'>
              <span>{"Price"}:</span>
              <Field className="mt-1" as={Input} name="price" type="text" placeholder="Enter package price" />
              {errors.price && touched.price ? (
                <div>
                  <HelperText valid={false}>{t(errors.price)}</HelperText>
                </div>
              ) : null}
            </Label>

            <Label className='flex-1'>
              <span>Listing Type:</span>
              <div className='mt-2 flex items-center'>
                <Label radio className='flex items-center'>
                  <Field className="mt-1"
                    as={Input}
                    name="listingType"
                    type="radio"
                    value="rent"
                  />
                  <span className='ml-2 mt-1'>Rent</span>
                </Label>
                <Label radio className='ml-6 flex items-center'>
                  <Field className="mt-1"
                    as={Input}
                    name="listingType"
                    type="radio"
                    value="sale"
                  />
                  <span className='ml-2 mt-1'>Sale</span>
                </Label>
              </div>
              {errors.address && touched.address ? (
                <div>
                  <HelperText valid={false}>{t(errors.address)}</HelperText>
                </div>
              ) : null}
            </Label>

            <Label className="flex-1">
              <span>Subscription Type</span>
              <Field as={Select} name="subscriptionType" className="mt-1">
                <option value="BASIC">Basic</option>
                <option value="MEDIUM">Medium</option>
                <option value="PREMIUM">Premium</option>
              </Field>
              {errors.subscriptionType && touched.subscriptionType ? (
                <div>
                  <HelperText valid={false}>{errors.subscriptionType}</HelperText>
                </div>
              ) : null}
            </Label>

            <Label className="flex-1">
              <span>Subscription Duration</span>
              <Field as={Select} name="subscriptionDuration" className="mt-1">
                <option value={1}>1 month</option>
                <option value={2}>2 months</option>
                <option value={3}>3 months</option>
              </Field>
              {errors.subscriptionDuration && touched.subscriptionDuration ? (
                <div>
                  <HelperText valid={false}>{errors.subscriptionDuration}</HelperText>
                </div>
              ) : null}
            </Label>


          </div>


          {!formRef &&
            <Button className="mt-6" block type="submit" value="submit" disabled={isSubmitting}>
              {t("Save Details")}
            </Button>
          }

          {status && (
            <HelperText valid={false}>{status.message}</HelperText>
          )}

          {saved && (
            <HelperText valid={true}>Saved!</HelperText>
          )}

        </Form>
      )}
    </Formik>
  )
}

export default UpdatePackageForm