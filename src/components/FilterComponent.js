import React from "react";

const FilterComponent = ({ handleFilterChange }) => {
  return (
    <div className="filter-container">
      <h2>Filter</h2>
      <div className="filter-list-container">
        <div className="filter-list-content">
          <label>Device ID</label>
          <select
            onChange={(e) => handleFilterChange("device_id", e.target.value)}
          >
            <option value="">Select Device ID</option>
            {[...Array(20).keys()].map((i) => (
              <option
                key={i}
                value={`device_${String(i + 1).padStart(3, "0")}`}
              >
                device_{String(i + 1).padStart(3, "0")}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-list-content">
          <label>Timestamp</label>
          <div>
            <input
              type="datetime-local"
              placeholder="From"
              onChange={(e) =>
                handleFilterChange("timestamp", { from: e.target.value }, true)
              }
            />
            ~
            <input
              type="datetime-local"
              placeholder="To"
              onChange={(e) =>
                handleFilterChange("timestamp", { to: e.target.value }, true)
              }
            />
          </div>
        </div>
        <div className="filter-list-content">
          <label>Temperature</label>
          <div>
            <input
              type="number"
              placeholder="From"
              onChange={(e) =>
                handleFilterChange(
                  "temperature",
                  { from: e.target.value },
                  true
                )
              }
            />
            ~
            <input
              type="number"
              placeholder="To"
              onChange={(e) =>
                handleFilterChange("temperature", { to: e.target.value }, true)
              }
            />
          </div>
        </div>
        <div className="filter-list-content">
          <label>Light</label>
          <select onChange={(e) => handleFilterChange("light", e.target.value)}>
            <option value="">Select Light</option>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="filter-list-content">
          <label>Motion</label>
          <select
            onChange={(e) => handleFilterChange("motion", e.target.value)}
          >
            <option value="">Select Motion</option>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
