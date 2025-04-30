import React from "react"
import SimpleModal from "./SimpleModal.js"
import { packageService, userService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeletePackageModal({isOpen, onClose, onAction, m_package}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deletePackage')
  }

  const handleModalAction = () => {
    setEnabled(false)
    packageService.deletePackage(m_package._id)
    .then(() => {
      setEnabled(true)
      setError(null)
      onAction('deletePackage')
    })
    .catch(err => {
      setEnabled(true)
      if(err.response) {
        setError(err.response.data.message);
      } else {
        setError('Some error occured.');
      }
    })
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Delete Package"
      neg_text="Cancel" 
      pos_text="Delete Package"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to delete this package?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}