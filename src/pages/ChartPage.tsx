import React from "react";
import { useQuery } from "react-query";

const fetchCovidData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  return response.json();
};

const ChartPage: React.FC = () => {
  const { data, isLoading, error } = useQuery("covidData", fetchCovidData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Covid-19 Data</h1>
      <div>
        <p>Cases: {data.cases}</p>
        <p>Deaths: {data.deaths}</p>
        <p>Recovered: {data.recovered}</p>
      </div>

      {/* Add charts for visualization here */}
    </div>
  );
};

export default ChartPage;
