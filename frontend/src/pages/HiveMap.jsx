import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./HiveMap.css";

function HiveMap() {
  const [hives, setHives] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [formData, setFormData] = useState({
    hive_lat: "",
    hive_lng: "",
    dist_to_water_source: "",
    dist_to_feeding_station: "",
    dist_to_flowering_area: "",
    humidity: "",
    temperature: "",
  });
  const [predictions, setPredictions] = useState({});

  const fetchHives = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/hives");
      setHives(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching hives:", error);
    }
  };

  useEffect(() => {
    fetchHives();
  }, []);

  const handleCellClick = (row, col) => {
    setSelectedCell(`${row}-${col}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      hive_lat: [parseFloat(formData.hive_lat)],
      hive_lng: [parseFloat(formData.hive_lng)],
      dist_to_water_source: [parseFloat(formData.dist_to_water_source)],
      dist_to_feeding_station: [parseFloat(formData.dist_to_feeding_station)],
      dist_to_flowering_area: [parseFloat(formData.dist_to_flowering_area)],
      humidity: [parseFloat(formData.humidity)],
      temperature: [parseFloat(formData.temperature)],
    };

    try {
      const res = await axios.post("http://localhost:5000/predict", data, {
        headers: { "Content-Type": "application/json" },
      });
      const prediction = res.data.predictions[0];
      setPredictions((prev) => ({ ...prev, [selectedCell]: prediction }));
      setSelectedCell(null);
      setFormData({
        hive_lat: "",
        hive_lng: "",
        dist_to_water_source: "",
        dist_to_feeding_station: "",
        dist_to_flowering_area: "",
        humidity: "",
        temperature: "",
      });
    } catch (error) {
      console.error("Error details:", error.response || error.message);
      alert("Failed to get prediction. Check the server and console.");
    }
  };

  // Render 5x4 grid
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        const cellId = `${row}-${col}`;
        const prediction = predictions[cellId];
        let cellClass = "grid-cell";
        if (prediction !== undefined) {
          if (prediction > 32) cellClass += " green";
          else if (prediction >= 30 && prediction < 32) cellClass += " blue";
        }

        grid.push(
          <div
            key={cellId}
            className={cellClass}
            onClick={() => handleCellClick(row, col)}
          >
            {prediction !== undefined ? (
              <span className="prediction-text">{prediction.toFixed(2)}</span>
            ) : (
              <span className="placeholder-text">Click to Predict</span>
            )}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="hivemap-page">
      <Navbar />
      <div className="hive-map-container">
        <aside className="sidebar">
          <h2 className="sidebar-title">Bee Hives</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search hives..."
              className="search-input"
            />
          </div>
          <ul className="hive-list">
            {hives.map((hive) => (
              <li key={hive.id} className="hive-list-item">
                <h3>{hive.name}</h3>
                <p>{new Date(hive.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </aside>

        <main className="map-container">
          <div className="grid-container">{renderGrid()}</div>
          {selectedCell && (
            <div className="popup-overlay">
              <div className="popup-content">
                <h3>Enter Hive Data</h3>
                <form onSubmit={handleSubmit} className="prediction-form">
                  <input
                    type="number"
                    name="hive_lat"
                    placeholder="Latitude"
                    value={formData.hive_lat}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="hive_lng"
                    placeholder="Longitude"
                    value={formData.hive_lng}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="dist_to_water_source"
                    placeholder="Dist. to Water (km)"
                    value={formData.dist_to_water_source}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="dist_to_feeding_station"
                    placeholder="Dist. to Feeding (km)"
                    value={formData.dist_to_feeding_station}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="dist_to_flowering_area"
                    placeholder="Dist. to Flowers (km)"
                    value={formData.dist_to_flowering_area}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="humidity"
                    placeholder="Humidity (%)"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <input
                    type="number"
                    name="temperature"
                    placeholder="Temperature (°C)"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    step="any"
                    required
                  />
                  <div className="form-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setSelectedCell(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default HiveMap;