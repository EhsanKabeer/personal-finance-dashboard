import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = { data: ChartData<'pie'> };

const PieChart: React.FC<Props> = ({ data }) => (
  <div style={{ width: 400, height: 400 }}>
    <Pie data={data} />
  </div>
);

export default PieChart;
