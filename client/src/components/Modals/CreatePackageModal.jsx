import React from "react"
import SimpleModal from './SimpleModal.js'
import CreatePackageForm from '../Forms/CreatePackageForm.js'

export default function CreatePackageModal({isOpen, onClose, onAction}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('createPackage')
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
    if(val) onAction('createPackage')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Create Package"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<CreatePackageForm formRef={formRef} callback={formSubmitCallback} />} />
  );
}