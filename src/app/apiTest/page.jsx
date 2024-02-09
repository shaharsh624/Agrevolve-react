"use client";

import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://agrevolve-flask.vercel.app/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Front End</h1>
      <h4>Data from API: {data.message}</h4>
    </div>
  );
}

export default App;
