// src/utils/chartSetup.js
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js'
  
  ChartJS.register(
    ArcElement,      // For Doughnut chart
    LineElement,     // For Line chart
    CategoryScale,   // X axis
    LinearScale,     // Y axis
    PointElement,    // Points in Line chart
    Tooltip,
    Legend
  )
  