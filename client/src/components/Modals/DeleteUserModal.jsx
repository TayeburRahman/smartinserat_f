import React from "react"
import SimpleModal from "./SimpleModal.jsx"
import { userService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeleteUserModal({isOpen, onClose, onAction, m_user, types}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deleteUser')
    if(types==="message"){
      onClose('deleteMessage')
    }
  }

  const handleModalAction = () => {
    // setEnabled(false)
    // userService.deleteUser(m_user._id)
    // .then(() => {
    //   setEnabled(true)
    //   setError(null)
    //   onAction('deleteUser')
    //   if(types==="message"){
    //     onAction('deleteMessage')
    //   }
    // })
    // .catch(err => {
    //   setEnabled(true)
    //   if(err.response) {
    //     setError(err.response.data.message);
    //   } else {
    //     setError('Some error occured.');
    //   }
    // })
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Delete User"
      neg_text="Cancel" 
      pos_text="Delete User"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to delete this user?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}