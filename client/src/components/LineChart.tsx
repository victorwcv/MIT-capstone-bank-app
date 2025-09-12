import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  data: { day: string; amount: number }[];
}

export const LineChart = ({ data }: Props) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: (v) => `$${v}` } } },
  };

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Balance",
        data: data.map((d) => d.amount),
        borderColor: "#06b5d4",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};
