import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface props {
  labels: Array<Array<string> | Array<any>>
  datasets: Array<Array<number> | Array<any>>
  title: string
  userNames: string[]
}

export function BarChart({ labels, datasets, title, userNames }: props) {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            color: '#1d4ed8',
            text: title,
          },
        },
      }}
      data={{
        labels: labels[0],
        datasets: [
          {
            label: userNames[0],
            data: datasets[0][0],
            backgroundColor: '#dc2626',
            stack: 'Stack 0',
          },
          {
            label: userNames[1],
            data: datasets[1][0],
            backgroundColor: '#2563eb',
            stack: 'Stack 0',
          },
        ],
      }}
    />
  )
}
