import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import mapImage from "../assets/images/map.png"; // Adjust path if necessary
import "./HiveMap.css";

function HiveMap() {
  const [hives, setHives] = useState([]);

  // Fetch hive details from the backend API.
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

  return (
    <div className="hivemap-page">
      <Navbar />
      <div className="hive-map-container">
        {/* Sidebar */}
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

        {/* Main Map Area */}
        <main className="map">
          <img src={mapImage} alt="Map" className="map-image" />
        </main>
      </div>
    </div>
  );
}

export default HiveMap;
