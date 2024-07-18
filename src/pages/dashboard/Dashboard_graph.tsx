import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // Explicitly specify the type as 'top'
    },
    title: {
      display: true,
      text: 'Monthly Usage'
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Rolling Average",
      data: [
        15000, 10000, 14000, 11000, 16000, 12000, 8000, 14000, 11000, 12000,
        23000, 12000,
      ],
      backgroundColor: "rgba(103, 58, 183, 0.5)",
      borderColor: "rgb(103, 58, 183)",
      borderWidth: 1,
    },
  ],
};

const textStyle = {
  margin: '0px',
  color: 'rgba(34, 51, 84, 0.7)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: '400',
  lineHeight: '1.75',
  fontSize: '12px'
};
const subHeading = {
  margin: 0,
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 700,
  fontSize: '22px',
  color: ' rgb(63, 81, 117)',
};
const subtextStyle = {
  margin: '0px',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: '1.5',
  fontSize: '18px',
  fontWeight: '700',
  color: "rgb(34, 51, 84)",
};
const headingContent = {
  fontSize: '14px',
  color: 'rgba(34, 51, 84, 0.7)',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: 400,
  lineHeight: 2.75
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(value);
}

export default function DashboardGraph() {
  const rollingAverage = 0.00; // Example value
  const currentSpendRate = 0.00; // Example value

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-4" style={subHeading}>Usage</h1>
          <p className="text-gray-600 mb-4 mt-4" style={headingContent}>
            Keep an eye on your daily spend with real-time insights.
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-lg font-bold mb-2" style={textStyle}>Rolling Average</p>
              <p className="text-gray-600" style={subtextStyle}>{formatCurrency(rollingAverage)} / day</p>
            </div>
            <div>
              <p className="text-lg font-bold mb-2" style={textStyle}>Current Spend Rate</p>
              <p className="text-gray-600" style={subtextStyle}>{formatCurrency(currentSpendRate)} / hr</p>
            </div>
          </div>
        </div>
      </div>
      <Bar options={options} data={data} style={{ marginTop: "-50px" }} />
    </div>
  );
}
