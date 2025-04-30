import React from "react"
import SimpleModal from './SimpleModal'
import UpdateUserForm from '../Forms/UpdateUserForm'

export default function MessageModal({isOpen, onClose, onAction, m_message}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('viewMessage')
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
    if(val) onAction('viewMessage')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Message"
    //   neg_text="Cancel" 
    //   pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={ <div>
        {m_message?.message}
      </div>} />
  );
}