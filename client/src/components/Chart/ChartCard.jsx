import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const subscriptionGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
  datasets: [
    {
      label: 'Subscriptions',
      data: [20, 90, 50, 100, 60, 90, 70, 55],
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.3)', // Tailwind blue-500 with opacity
      borderColor: 'rgba(59, 130, 246, 1)',
      tension: 0.4,
    },
  ],
}

const subscriptionOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { drawBorder: false } },
  },
}

const userGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Active Users',
      data: [60, 55, 50, 52, 54, 53, 70, 65, 60, 62, 61, 63],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      label: 'New Users',
      data: [40, 30, 25, 20, 28, 25, 35, 32, 30, 28, 29, 30],
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
  ],
}

const userGrowthOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, beginAtZero: true },
  },
}

export default function GrowthCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {/* Subscription Growth */}
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg p-4 h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
        <h3 className="text-lg font-semibold mb-4  text-gray-700">Subscription Growth</h3>
        <div className="h_custom_300">
          <Line data={subscriptionGrowthData} options={subscriptionOptions} />
        </div>
      </div>
    </div>
  
    {/* User Growth */}
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg p-4 h-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
        <h3 className="text-lg font-semibold mb-4  text-gray-700">User Growth</h3>
        <div className="h_custom_300">
          <Bar data={userGrowthData} options={userGrowthOptions} />
        </div>
      </div>
    </div>
  </div>  
  )
}
