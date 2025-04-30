import { Box } from '@mui/material';

import {
    Badge,
    Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@windmill/react-ui';
import React from 'react';
import { EditIcon, TrashIcon } from '../../icons';



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
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Listing Type</TableCell>
                <TableCell>Subscription Type</TableCell>
                <TableCell>Subscription Duration</TableCell>
                <TableCell>Actions</TableCell>
            </tr>
        </TableHeader>
    )
}

function Body({ dataTable, onAction }) {

    return (
        <TableBody>
            {dataTable?.map((pkg, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <div>
                                <p className="font-semibold">{pkg?.packageName}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg.packageDescription}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">&#8364;{pkg.price}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg.listingType}</span>
                    </TableCell>
                    <TableCell>
                        <Badge type={pkg?.subscriptionType === "PREMIUM" ? "warning" : pkg?.subscriptionType === "MEDIUM" ? "primary" : "neutral"}>{pkg?.subscriptionType}</Badge>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg?.subscriptionDuration}{pkg?.subscriptionDuration === 1 ? " month" : " months"}</span>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(pkg, 'updatePackage') } }}>
                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                            <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(pkg, 'deletePackage') } }}>
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}


function SearchPackages({ searchTable, onAction }) {
    return (
        <TableBody>
            {searchTable?.map((pkg, i) => (

                <TableRow key={i}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                            <div>
                                <p className="font-semibold">{pkg?.packageName}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg.packageDescription}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">&#8364;{pkg.price}</span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg.listingType}</span>
                    </TableCell>
                    <TableCell>
                        <Badge type={pkg?.subscriptionType === "PREMIUM" ? "warning" : pkg?.subscriptionType === "MEDIUM" ? "primary" : "neutral"}>{pkg?.subscriptionType}</Badge>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{pkg?.subscriptionDuration}{pkg?.subscriptionDuration === 1 ? " month" : " months"}</span>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(pkg, 'updatePackage') } }}>
                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                            <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => { e.preventDefault(); if (onAction) { onAction(pkg, 'deletePackage') } }}>
                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>

            ))}
        </TableBody>
    )
}

export default function PackagesTable({ packages, resultsPerPage, totalResults, onAction, onPageChange, searchPackages, value }) {



    return (
        <Box>


            <Box>
                <TableContainer className="mb-8">
                    <Table>
                        <Header />
                        {value ? <SearchPackages searchTable={searchPackages} onAction={onAction} />
                            :
                            <Body dataTable={packages} onAction={onAction} />
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