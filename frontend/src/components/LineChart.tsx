import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = { data: ChartData<'line'> };

const LineChart: React.FC<Props> = ({ data }) => (
  <div style={{ width: 600, height: 400 }}>
    <Line data={data} />
  </div>
);

export default LineChart;
