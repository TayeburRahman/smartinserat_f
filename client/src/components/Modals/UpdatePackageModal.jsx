import React from "react"
import SimpleModal from './SimpleModal'
import UpdateUserForm from '../Forms/UpdateUserForm'
import UpdatePackageForm from "../Forms/UpdatePackageForm"

export default function UpdatePackageModal({isOpen, onClose, onAction, m_package}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('updatePackage')
  }

  const handleModalAction = () => {
    if (formRef.current) {
      formRef.current.validateForm()
      .then(() => {
        setEnabled(!formRef.current.isValid)
        formRef.current.handleSubmit()
      })
    }
  }

  const formSubmitCallback = (val) => {
    setEnabled(true)
    if(val) onAction('updatePackage')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Update Package"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<UpdatePackageForm formRef={formRef} callback={formSubmitCallback} m_package={m_package} />} />
  );
}