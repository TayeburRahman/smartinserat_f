import { Box } from '@mui/material';
import {
    Badge,
    Button, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow
} from '@windmill/react-ui';
import React from 'react';
import { EditIcon, TrashIcon } from '../../icons';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery from Material-UI

function Header() {
    return (
        <TableHeader>
            <tr>
                <TableCell className="hidden sm:table-cell text-sm">Name</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">Description</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">Price</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">Listing Type</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">Subscription Type</TableCell>
                <TableCell className="hidden sm:table-cell text-sm">Subscription Duration</TableCell>
                <TableCell className="text-sm">Actions</TableCell>
            </tr>
        </TableHeader>
    )
}

function Body({ dataTable, onAction }) {
    return (
        <TableBody>
            {dataTable?.map((pkg, i) => (
                <TableRow key={i}>
                    <TableCell className="sm:table-cell text-sm">
                        <div className="flex items-center text-sm">
                            <div>
                                <p className="font-semibold">{pkg?.packageName}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg.packageDescription}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>&#8364;{pkg.price}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg.listingType}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <Badge type={pkg?.subscriptionType === "PREMIUM" ? "warning" : pkg?.subscriptionType === "MEDIUM" ? "primary" : "neutral"}>{pkg?.subscriptionType}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg?.subscriptionDuration} {pkg?.subscriptionDuration === 1 ? "month" : "months"}</span>
                    </TableCell>
                    <TableCell className="text-sm">
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
                    <TableCell className="sm:table-cell text-sm">
                        <div className="flex items-center">
                            <p className="font-semibold">{pkg?.packageName}</p>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg.packageDescription}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>&#8364;{pkg.price}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg.listingType}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <Badge type={pkg?.subscriptionType === "PREMIUM" ? "warning" : pkg?.subscriptionType === "MEDIUM" ? "primary" : "neutral"}>{pkg?.subscriptionType}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                        <span>{pkg?.subscriptionDuration} {pkg?.subscriptionDuration === 1 ? "month" : "months"}</span>
                    </TableCell>
                    <TableCell className="text-sm">
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
    const isSmallScreen = useMediaQuery('(max-width:600px)'); // Use MediaQuery for small screens
    return (
        <Box className="overflow-x-auto custom-scrollbar">
            <Box>
                <TableContainer className="mb-8">
                    <Table className={`min-w-full ${isSmallScreen ? 'table-auto' : ''}`}> 
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
