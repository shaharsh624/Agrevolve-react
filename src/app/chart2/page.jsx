
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PriceChart = () => {
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [graphData, setGraphData] = useState([]);

  // Commodities
  const fetchCommodities = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_commodities");
      const jsonData = await response.json();
      setCommodities(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommodities();
  }, []);

  // States
  const fetchStates = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_states");
      const jsonData = await response.json();
      setStates(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCommodity) {
      fetchStates();
    }
  }, [selectedCommodity]);

  // Districts
  const fetchDistricts = async (selectedState) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_districts/${selectedState}`
      );
      const jsonData = await response.json();
      setDistricts(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState);
    }
  }, [selectedState]);

  // Markets
  const fetchMarkets = async (selectedState, selectedDistrict) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_markets/${selectedState}/${selectedDistrict}`
      );
      const jsonData = await response.json();
      setMarkets(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchMarkets(selectedState, selectedDistrict);
    }
  }, [selectedState, selectedDistrict]);

  // Data
  const fetchGraphData = async (
    selectedCommodity,
    selectedState,
    selectedDistrict,
    selectedMarket
  ) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/getData/${selectedCommodity}/${selectedState}/${selectedDistrict}/${selectedMarket}`
      );
      const jsonData = await response.json();
      if (jsonData.length === 0) {
        alert("No data available for the selected market");
      }
      setGraphData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedMarket) {
      fetchGraphData(
        selectedCommodity,
        selectedState,
        selectedDistrict,
        selectedMarket
      );
    }
  }, [selectedCommodity, selectedState, selectedDistrict, selectedMarket]);

  const options = {
    chart: {
      id: "price-chart",
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Reported Date",
      },
      categories: graphData.map((item) => item["Reported Date"]),
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
      data: graphData.map((item) => item["Modal Price (Rs./Quintal)"]),
    },
  ];

  return (
    <div>
      <div>
        <h1>Charts</h1>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <select
              className="select select-bordered max-w-xs"
              id="commodity"
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
            >
              <option value="" disabled>
                Select Commodity
              </option>
              {commodities.map((commodity) => (
                <option key={commodity.id} value={commodity.commodity}>
                  {commodity.commodity}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <select
              className="select select-bordered max-w-xs"
              id="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCommodity}
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <select
              className="select select-bordered max-w-xs"
              id="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
            >
              <option value="" disabled>
                Select District
              </option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <select
              className="select select-bordered max-w-xs"
              id="market"
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="" disabled>
                Select Market
              </option>
              {markets.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* <label className="form-control max-w-xs" htmlFor="commodity">
          <div className="label">
            <span className="label-text">Select Commodity</span>
          </div> */}

        {/* </label>


        <label className="form-control max-w-xs" htmlFor="state">
          <div className="label">
            <span className="label-text">Select State</span>
          </div> */}

        {/* </label>

        <label className="form-control max-w-xs" htmlFor="district">
          <div className="label">
            <span className="label-text">Select District</span>
          </div> */}

        {/* </label>

        <label className="form-control max-w-xs" htmlFor="market">
          <div className="label">
            <span className="label-text">Select Market</span>
          </div> */}

        {/* </label> */}
      </div>
      <div className="price-chart">
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height="400"
        />
      </div>
    </div>
  );
};

export default PriceChart;
