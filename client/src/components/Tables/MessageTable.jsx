import { Box } from '@mui/material';

import {
    Badge,
    Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@windmill/react-ui';
import React, { useState } from 'react';
import { ChatIcon, FormsIcon, MailIcon, OutlinePersonIcon, TrashIcon } from '../../icons';
import EmailSendModal from "../Modals/EmailSendModal";


function Header() {
    return (
        <TableHeader>
            <tr>
                <TableCell>Listing Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
            </tr>
        </TableHeader>
    )
}

function Body({ dataTable, onAction }) {

    const [open, setOpen] = useState(false);
    const [messageData, setMessage] = useState('');

    const handleSendEmail = (data) => {
        setOpen(true)
        setMessage(data)
    }

    const truncateMessage = (msg, wordLimit) => {
        const words = msg.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return msg;
    };




    return (
        <TableBody>
            {dataTable?.map((message, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <div>
                                <p className="font-semibold">{`${message?.uniqId}`}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.name}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.email}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.telephone}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{truncateMessage(message?.message, 5)}</span>
                    </TableCell>
                   
                    <TableCell>
                        <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(message, 'viewMessage') } }} >
                                <ChatIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                            
                            <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(message, 'deleteMessage') } }}>
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>
                        <EmailSendModal open={open} setOpen={setOpen} message={messageData} />

                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}


function SearchMessages({ searchTable, onAction }) {

    const [open, setOpen] = useState(false);
    const [messageData, setMessage] = useState('');

    const handleSendEmail = (data) => {
        setOpen(true)
        setMessage(data)
    }

    const truncateMessage = (msg, wordLimit) => {
        const words = msg.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return msg;
    };


    return (
        <TableBody>
            {searchTable?.map((message, i) => (

                <TableRow key={i}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <div>
                                <p className="font-semibold">{`${message?.uniqId}`}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.name}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.email}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{message.telephone}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{truncateMessage(message?.message, 5)}</span>
                    </TableCell>
                    {/* <TableCell>
            <Badge type={message?.authId?.role === "ADMIN" ? "primary" : "neutral"}>{message?.authId?.role}</Badge>
          </TableCell> */}
                    <TableCell>
                        <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(message, 'viewMessage') } }} >
                                <ChatIcon className="w-5 h-5" aria-hidden="true" />
                            </Button> 
                            <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(message, 'deleteMessage') } }}>
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>
                        <EmailSendModal open={open} setOpen={setOpen} user={messageData} />

                    </TableCell>
                </TableRow>

            ))}
        </TableBody>
    )
}

export default function MessageTable({ messages, resultsPerPage, totalResults, onAction, onPageChange, searchMessages, value }) {



    return (
        <Box>
            <Box>
                <TableContainer className="mb-8">
                    <Table>
                        <Header />
                        {value ? <SearchMessages searchTable={searchMessages} onAction={onAction} />
                            :
                            <Body dataTable={messages} onAction={onAction} />
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