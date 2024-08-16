import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartProps = {
  totalItemsSold: number;
  totalSaleValue: number;
};

const Chart: React.FC<ChartProps> = ({ totalItemsSold, totalSaleValue }) => {
  const data = [
    { name: "Total Items Sold", value: totalItemsSold },
    { name: "Total Sales Value", value: totalSaleValue },
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ width: "100%" }}>
        {" "}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
