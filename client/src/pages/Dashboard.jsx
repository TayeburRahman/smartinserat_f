import React, { useState, useEffect } from 'react'
import '../utils/demo/chartSetup'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import { Link } from 'react-router-dom'
import GrowthCharts from '../components/Chart/ChartCard'
import axios from 'axios'
import { config } from '../assets/config/config'

function Dashboard() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([]) 
  // pagination setup
  const resultsPerPage = 10

  const [transitions, setTransitions] = useState([])
  useEffect(() => {
    async function fetchUserGrow() {
      try {
        const response = await axios.get(`${config.api.url}/dashboard/get_transitions_list`);
        setTransitions(response.data?.data?.result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchUserGrow()
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${config.api.url}/dashboard/get_total_count`);
        setData(response.data?.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, [page]);




  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value={`${data?.totalUsers ? data?.totalUsers : 0}`}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value={`${data?.totalIncome ? data?.totalIncome : 0}`}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4 "
          />
        </InfoCard>

        <InfoCard title="User Listing" value={`${data?.totalListing ? data?.totalListing : 0}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending Message" value={`${data?.unseenMessagesCount ? data?.unseenMessagesCount : 0}`}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Charts</PageTitle>

      <GrowthCharts />

      <PageTitle>New Transactions</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {transitions?.length && transitions?.slice(0, 8).map((txn, i) => (
              <TableRow key={txn._id || i}>
                <TableCell>
                  <span className="text-sm">{txn.transactionId || 'N/A'}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={txn.user?.profile_image || ''}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{txn.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {txn.user?.email || 'No Email'}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">${txn.amount?.toFixed(2) || '0.00'}</span>
                </TableCell>

                <TableCell>
                  <Badge type={txn.status === 'completed' ? 'success' : 'danger'}>
                    {txn.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {txn.createdAt
                      ? new Date(txn.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="w-full flex justify-start">
                  <Link
                    to="/app/transactions"
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    See more →
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default Dashboard