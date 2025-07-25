import React from "react"
import SimpleModal from "./SimpleModal.jsx"
import { userListService, userService } from "../../services/index.jsx"
import { HelperText } from '@windmill/react-ui'

export default function PauseUserListModal({isOpen, onClose, onAction, m_list}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('pauseListing')
  }

  const handleModalAction = () => {
    console.log("======ll", m_list?._id)
    setEnabled(false)
    userListService.pauseUserlist(m_list?._id)
    .then(() => {
      setEnabled(true)
      setError(null)
      onAction('pauseListing')
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
      title="Pause Listing?"
      neg_text="Cancel" 
      pos_text="Pause"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to pause this listing?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}