"use client";

import { Point } from "@/lib/sessions";
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
} from "recharts";

const LineChart = ({ data }: { data: Point[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[29, 40]} allowDataOverflow={true} />
        <Tooltip />
        <Legend />
        {Object.keys(data[0])
          .splice(1)
          .map((_, i: number) => (
            <Line
              dot={false}
              key={i}
              dataKey={`heat${i + 1}`}
              type="monotone"
              stroke={["#8884d8", "#a8c340"][i % 2]}
            />
          ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
