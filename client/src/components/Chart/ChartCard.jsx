import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { config } from '../../assets/config/config'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
}

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function mapApiDataToChart(apiData) {
  const counts = new Array(12).fill(0)
  const monthToIndex = monthLabels.reduce((acc, month, idx) => {
    acc[month] = idx
    return acc
  }, {})

  apiData.forEach(({ month, count }) => {
    const idx = monthToIndex[month]
    if (idx !== undefined) counts[idx] = count ?? 0
  })

  return {
    labels: monthLabels,
    datasets: [
      {
        label: 'Count',
        data: counts,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }
}

export default function GrowthCharts() {
  const [paymentYear, setPaymentYear] = useState(new Date().getFullYear())
  const [userYear, setUserYear] = useState(new Date().getFullYear())
  const [userGrowthData, setUserGrowthData] = useState(null)
  const [paymentGrowthData, setPaymentGrowthData] = useState(null)

  useEffect(() => {
    async function fetchUserGrow() {
      try {
        const res = await axios.get(`${config.api.url}/dashboard/get_user_growth`, {
          params: { year: userYear },
        })
        const data = res.data?.data?.data || []
        setUserGrowthData(mapApiDataToChart(data))
      } catch (error) {
        console.error('Failed to fetch user growth:', error)
      }
    }

    fetchUserGrow()
  }, [userYear])

  useEffect(() => {
    async function fetchPaymentGrow() {
      try {
        const res = await axios.get(`${config.api.url}/dashboard/get_payment_growth`, {
          params: { year: paymentYear },
        })
        const data = res.data?.data?.data || []
        setPaymentGrowthData(mapApiDataToChart(data))
      } catch (error) {
        console.error('Failed to fetch payment growth:', error)
      }
    }

    fetchPaymentGrow()
  }, [paymentYear])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Payment Growth */}
      <div className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4 h-full min-h-[250px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center justify-between">
            Payment Growth
            <select
              id="year-payment"
              value={paymentYear}
              onChange={(e) => setPaymentYear(parseInt(e.target.value, 10))}
              className="border rounded p-1"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </h3>
          <div className="h_custom_300" style={{ minHeight: 250 }}>
            {paymentGrowthData ? (
              <Bar data={paymentGrowthData} options={chartOptions} />
            ) : (
              <p>Loading payment growth...</p>
            )}
          </div>
        </div>
      </div>

      {/* User Growth */}
      <div className="w-full">
        <div className="bg-white shadow-md rounded-lg p-4 h-full min-h-[250px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center justify-between">
            User Growth
            <select
              id="year-user"
              value={userYear}
              onChange={(e) => setUserYear(parseInt(e.target.value, 10))}
              className="border rounded p-1"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </h3>
          <div className="h_custom_300" style={{ minHeight: 250 }}>
            {userGrowthData ? (
              <Bar data={userGrowthData} options={chartOptions} />
            ) : (
              <p>Loading user growth...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
