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
  console.log('   m_user',   m_user)

  const handleModalAction = () => {
    setEnabled(false);
    const deleteFn = types === "message" 
      ? userService.deleteMessage 
      : userService.deleteUser;
  
    deleteFn(m_user._id)
      .then(() => {
        setEnabled(true);
        setError(null);
  
        if (types === "message") {
          onAction("deleteMessage");
        } else {
          onAction("deleteUser");
        }
      })
      .catch((err) => {
        setEnabled(true);
        setError(err?.response?.data?.message || "Some error occurred.");
      });
  };
  

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