"use client";

import React, { PureComponent, useEffect, useState } from "react";
import {
  ComposedChart,
  Area,
  Scatter,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center m-9">
      <LineChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Reported Date" />
        <YAxis dataKey="Modal Price (Rs./Quintal)" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Modal Price (Rs./Quintal)"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <BarChart
        width={800}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Reported Date" />
        <YAxis dataKey="Modal Price (Rs./Quintal)" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Modal Price (Rs./Quintal)" fill="#8884d8" />
      </BarChart>

      <ComposedChart
        width={800}
        height={600}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="Reported Date" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Min Price (Rs./Quintal)" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Modal Price (Rs./Quintal)" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="Max Price (Rs./Quintal)" stroke="#ff7300" />
          <Scatter dataKey="Modal Price (Rs./Quintal)" fill="red" />
        </ComposedChart>
    </div>
  );
};

export default App;
