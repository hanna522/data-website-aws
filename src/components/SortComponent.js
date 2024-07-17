import React from "react";

const SortComponent = ({ handleSort, getSortIcon }) => {
  return (
    <div className="grid-container">
      <button>#</button>
      <button onClick={() => handleSort("device_id")}>
        Device ID {getSortIcon("device_id")}
      </button>
      <button onClick={() => handleSort("timestamp")}>
        Timestamp {getSortIcon("timestamp")}
      </button>
      <button onClick={() => handleSort("temperature")}>
        Temperature {getSortIcon("temperature")}
      </button>
      <button onClick={() => handleSort("light")}>
        Light {getSortIcon("light")}
      </button>
      <button onClick={() => handleSort("motion")}>
        Motion {getSortIcon("motion")}
      </button>
    </div>
  );
};

export default SortComponent;
