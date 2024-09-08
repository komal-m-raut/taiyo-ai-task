import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const bounds = new LatLngBounds([-90, -180], [90, 180]);

const fetchGlobalData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  return response.json();
};

const fetchHistoricalData = async () => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.json();
};

const fetchCountryData = async () => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  return response.json();
};

const ChartPage: React.FC = () => {
  const {
    data: globalData,
    isLoading: loadingGlobal,
    error: errorGlobal,
  } = useQuery("globalData", fetchGlobalData);
  const {
    data: historicalData,
    isLoading: loadingHistorical,
    error: errorHistorical,
  } = useQuery("historicalData", fetchHistoricalData);
  const {
    data: countryData,
    isLoading: loadingCountry,
    error: errorCountry,
  } = useQuery("countryData", fetchCountryData);

  // Handle state for the map data to prevent re-render issues
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (countryData && !loadingCountry) {
      setMapLoaded(true);
    }
  }, [countryData, loadingCountry]);

  if (loadingGlobal || loadingHistorical || loadingCountry)
    return <div>Loading...</div>;
  if (errorGlobal || errorHistorical || errorCountry)
    return <div>Error loading data</div>;

  // Preparing data for the Line Chart (e.g., cases over time)
  const dates = Object.keys(historicalData.cases);
  const cases = Object.values(historicalData.cases);

  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: "Total Cases",
        data: cases,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "COVID-19 Cases Over Time",
      },
    },
  };

  // Custom marker for Leaflet map
  const covidIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Covid-19 Data Dashboard
        </h1>

        {/* Worldwide Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Total Cases</h2>
            <p className="text-gray-700 text-center text-lg">
              {globalData.cases.toLocaleString()}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Total Deaths</h2>
            <p className="text-gray-700 text-center text-lg">
              {globalData.deaths.toLocaleString()}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Total Recovered</h2>
            <p className="text-gray-700 text-center text-lg">
              {globalData.recovered.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Cases Over Time</h1>
        <div className="relative h-96">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Map of COVID-19 Cases by Country
        </h1>

        {/* Render the map only when mapLoaded is true */}
        {mapLoaded && (
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={2}
            maxZoom={6}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
            className="w-full min-h-[500px] max-h-[800px]"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countryData.map((country: any) => (
              <Marker
                key={`${country.country}-${country.countryInfo._id}`}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={covidIcon}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Total Cases: {country.cases.toLocaleString()}</p>
                    <p>Active Cases: {country.active.toLocaleString()}</p>
                    <p>Recovered: {country.recovered.toLocaleString()}</p>
                    <p>Deaths: {country.deaths.toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ChartPage;