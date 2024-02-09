"use client"

// chart.jsx
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://agrevolve-flask.vercel.app/get/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return data;
}

export default function DataSelectionPage() {
  const data = Data();

  const options = {
    chart: {
      id: "price-chart",
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Reported Date",
      },
      categories: data.map(item => item['Reported Date']),
    },
    yaxis: {
      title: {
        text: "Modal Price (Rs./Quintal)",
      },
    },
  };

  const series = [
    {
      name: "Modal Price",
      data: data.map(item => item['Modal Price (Rs./Quintal)']),
    },
  ];

  return (
    <div className="price-chart">
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height="400"
      />
    </div>
  );
}