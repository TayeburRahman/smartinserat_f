import { Box } from '@mui/material';

import {
    Badge,
    Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow, Avatar
} from '@windmill/react-ui';
import React, { useState } from 'react'; 


function Header() {
    return (
        <TableHeader>
            <tr>
                <TableCell>Id</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>DATE</TableCell>
            </tr>
        </TableHeader>
    )
}

function Body({ dataTable }) {
    console.log("dataTable", dataTable)
    return (
        <TableBody>
            {dataTable?.map((userList, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <span className="text-sm">Id</span>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <Avatar className="hidden mr-3 md:block" src={userList?.user?.profile_image} alt="USER image" />
                            <div>
                                <p className="font-semibold">{userList?.user?.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{userList?.user?.email}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{userList?.amount}</span>
                    </TableCell>
                    <TableCell>
                        <Badge type={`${userList?.status === "completed"? "success": "warning"}`}>{userList?.status}</Badge>
                    </TableCell>

                    <TableCell>
                        <span className="text-sm">{new Date(userList?.createdAt).toLocaleDateString()}</span>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default function TransactionsTable({ userLists, resultsPerPage, totalResults, onPageChange }) {

    return (
        <Box>


            <Box>
                <TableContainer className="mb-8">
                    <Table>
                        <Header />

                        <Body dataTable={userLists} />
                    </Table>
                    <TableFooter>
                        <Pagination
                            totalResults={totalResults}
                            resultsPerPage={resultsPerPage}
                            onChange={onPageChange}
                            label="Table navigation"
                        />
                    </TableFooter>
                </TableContainer>
            </Box>
        </Box>
    )
}