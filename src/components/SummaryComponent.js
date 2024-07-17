import React from "react";

const SummaryComponent = ({ analysis, loading, handleFetchAnalysis }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Filter Summary</h2>
        <button onClick={handleFetchAnalysis} disabled={loading}>
          {loading ? (
            <span>
              <i className="fas fa-spinner fa-spin"></i> Loading
            </span>
          ) : (
            <span>
              <i className="fas fa-sync"></i>
            </span>
          )}
        </button>
      </div>
      {loading ? (
        <div className="dashboard-content">
          <div>
            <h3>Value</h3>
            <h3>Device ID</h3>
            <h3>Timestamp</h3>
            <h3>Temperature</h3>
            <h3>Light</h3>
            <h3>Motion</h3>
          </div>
          <div>
            <h3>Count</h3>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
          <div>
            <h3>Average</h3>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
      ) : analysis &&
        analysis.temperature &&
        analysis.motion &&
        analysis.light ? (
        <div className="dashboard-content">
          <div>
            <h3>Value</h3>
            <h3>Device ID</h3>
            <h3>Timestamp</h3>
            <h3>Temperature</h3>
            <h3>Light</h3>
            <h3>Motion</h3>
          </div>
          <div>
            <h3>Count</h3>
            <p>{analysis.total_records || 0}</p>
            <p>{analysis.total_records || 0}</p>
            <p>{analysis.total_records || 0}</p>
            <p>{analysis.total_records || 0}</p>
            <p>{analysis.total_records || 0}</p>
          </div>
          <div>
            <h3>Average</h3>
            <p>-</p>
            <p>-</p>
            <p>{(analysis.temperature.average || 0).toFixed(2)}</p>
            <p>{(analysis.light.average || 0).toFixed(2)}</p>
            <p>{(analysis.motion.average || 0).toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          <div>
            <h3>Value</h3>
            <h3>Device ID</h3>
            <h3>Timestamp</h3>
            <h3>Temperature</h3>
            <h3>Light</h3>
            <h3>Motion</h3>
          </div>
          <div>
            <h3>Count</h3>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
          <div>
            <h3>Average</h3>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryComponent;
