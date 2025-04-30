import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "@windmill/react-ui";
import axios from 'axios';
import * as React from 'react';
import { config } from "../../assets/config/config";
import './SendModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper', 
  p: 4,
  borderRadius: 2
};


export default function EmailSendModal({user , setOpen, open}) { 
  const handleClose = () => setOpen(false); 
  const apiUrl = config.api.url;

const [sendData , setSendEmailData] = React.useState('')

React.useEffect(()=>{ 
  const name = user?.name  
  const data = `Hey ${name}, wir danken für dein Vertrauen! Natürlich hoffen wir, dass unser Service dir gefällt. Du solltest demnächst eine automatische Feedback E-Mail von Trustpilot erhalten. Wir freuen uns falls du uns dort deine ehrliche Meinung mitteilst! 🙂`

  setSendEmailData(data) 
},[user])

const handleSendMail = () =>{ 
  const email = user?.email   
    axios.post(`${apiUrl}/v1/auth/send-email`, { email, data: sendData })
      .then(res => {
          setOpen(false);
      })
      .catch(e => { 
        alert('Send Mail Success')
        setOpen(false);
      })
}

  return (
    <div>  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="transition-modal-title" variant="body2" component="body2">
          Do you really want to send a review invite to {user?.email}?
          </p>
          <div className='flex flex-row justify-between mt-8'>
           <Button variant="contained" onClick={ handleSendMail}>Send invite</Button>
           <Button layout="outline" className="outline" onClick={handleClose}>Cancel</Button>
          </div> 
        </Box>
      </Modal>
    </div> 
    
  );
}