import { Box } from '@mui/material';

import {
  Badge,
  Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@windmill/react-ui';
import React, { useState } from 'react';
import { EditIcon, MailIcon, OutlinePersonIcon, TrashIcon } from '../../icons';
import EmailSendModal from "../Modals/EmailSendModal";



// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

function Header() {
  return (
    <TableHeader>
      <tr>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Actions</TableCell>
      </tr>
    </TableHeader>
  )
}

function Body({ dataTable, onAction }) {

  const [open, setOpen] = useState(false); 
  const [userData, setUser] = useState(''); 

const handleSendEmail = (data) =>{
   setOpen(true)
   setUser(data)
}



  return (
    <TableBody>
      {dataTable?.map((user, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center text-sm">
              <div>
                <p className="font-semibold">{`${user?.name} ${user?.lastname}`}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm">{user.email}</span>
          </TableCell>
          <TableCell>
            <Badge type={user?.authId?.role === "ADMIN" ? "primary" : "neutral"}>{user?.authId?.role}</Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-4"> 
              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'updateUser') } }} >
                <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
              </Button>

              <Button layout="link" size="icon" aria-label="Edit"  onClick={(e) => { handleSendEmail(user)}} >
                <MailIcon className="w-5 h-5" aria-hidden="true" />
              </Button>


              <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'updatePassword') } }}>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'deleteUser') } }}>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
            <EmailSendModal open={open} setOpen={setOpen} user={userData} />

          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}


function SearchUsers({ searchTable, onAction }) {

  const [open, setOpen] = useState(false); 
  const [userData, setUser] = useState(''); 

const handleSendEmail = (data) =>{
   setOpen(true)
   setUser(data)
}
  return (
    <TableBody>
      {searchTable?.map((user, i) => (

        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center text-sm">
              <div>
                <p className="font-semibold">{user?.name}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm">{user.email}</span>
          </TableCell>
          <TableCell>
            <Badge type={user?.authId?.role === "ADMIN" ? "primary" : "neutral"}>{user?.authId?.role}</Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-4">
              
              
              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'updateUser') } }} >
                <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
              </Button>

              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => { handleSendEmail(user)}}>
                <MailIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <EmailSendModal open={open} setOpen={setOpen} user={userData} />
              
              <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'updatePassword') } }}>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(user, 'deleteUser') } }}>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>

      ))}
    </TableBody>
  )
}

export default function UserTable({ users, resultsPerPage, totalResults, onAction, onPageChange, searchUsers, value }) {

  

  return (
    <Box>

       
      <Box>
        <TableContainer className="mb-8">
          <Table>
            <Header />
            {value ? <SearchUsers searchTable={searchUsers} onAction={onAction} />
              :
              <Body dataTable={users} onAction={onAction} />
            }

          </Table>
          {
            !value && <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChange}
                label="Table navigation"
              />
            </TableFooter>
          }
        </TableContainer>
      </Box>
    </Box>
  )
}