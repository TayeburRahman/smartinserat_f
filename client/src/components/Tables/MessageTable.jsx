import { Box, useMediaQuery } from '@mui/material';
import {
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow
} from '@windmill/react-ui';
import React, { useState } from 'react';
import { ChatIcon, TrashIcon } from '../../icons';
import EmailSendModal from '../Modals/EmailSendModal';

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
  );
}

function Body({ dataTable, onAction }) {
  const [open, setOpen] = useState(false);
  const [messageData, setMessage] = useState('');

  const truncateMessage = (msg, wordLimit) => {
    const words = msg.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : msg;
  };

  return (
    <TableBody>
      {dataTable?.map((message, i) => (
        <TableRow key={i}>
          <TableCell>
            <p className="font-semibold">{message?.uniqId}</p>
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
              <Button
                layout="link"
                size="icon"
                aria-label="View"
                onClick={(e) => {
                  e.preventDefault();
                  onAction?.(message, 'viewMessage');
                }}
              >
                <ChatIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                layout="link"
                size="icon"
                aria-label="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  onAction?.(message, 'deleteMessage');
                }}
              >
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
            <EmailSendModal open={open} setOpen={setOpen} message={messageData} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function SearchMessages({ searchTable, onAction }) {
  const [open, setOpen] = useState(false);
  const [messageData, setMessage] = useState('');

  const truncateMessage = (msg, wordLimit) => {
    const words = msg.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : msg;
  };

  return (
    <TableBody>
      {searchTable?.map((message, i) => (
        <TableRow key={i}>
          <TableCell>
            <p className="font-semibold">{message?.uniqId}</p>
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
              <Button
                layout="link"
                size="icon"
                aria-label="View"
                onClick={(e) => {
                  e.preventDefault();
                  onAction?.(message, 'viewMessage');
                }}
              >
                <ChatIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                layout="link"
                size="icon"
                aria-label="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  onAction?.(message, 'deleteMessage');
                }}
              >
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
            <EmailSendModal open={open} setOpen={setOpen} message={messageData} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function MessageTable({
  messages,
  resultsPerPage,
  totalResults,
  onAction,
  onPageChange,
  searchMessages,
  value
}) {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <Box className="overflow-x-auto custom-scrollbar">
      <Box>
        <TableContainer className="mb-8">
          <Table className={`min-w-full ${isSmallScreen ? 'table-auto' : ''}`}>
            <Header />
            {value ? (
              <SearchMessages searchTable={searchMessages} onAction={onAction} />
            ) : (
              <Body dataTable={messages} onAction={onAction} />
            )}
          </Table>
          {!value && (
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={onPageChange}
                label="Table navigation"
              />
            </TableFooter>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
}
