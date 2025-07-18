import React from "react"
import SimpleModal from "./SimpleModal.jsx"
import { userListService, userService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeleteUserListModal({isOpen, onClose, onAction, m_list}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deleteListing')
  }

  const handleModalAction = () => {
    setEnabled(false)
    userListService.deleteUserList(m_list._id)
    .then(() => {
      setEnabled(true)
      setError(null)
      onAction('deleteListing'); // Notify parent to refresh
      handleModalClose(); // Close modal after success
      // onAction('deleteListing')
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
      title="Anzeige löschen"
      neg_text="Cancel" 
      pos_text="Delete"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to delete this listing?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}