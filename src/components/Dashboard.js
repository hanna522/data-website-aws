import React, { useState, useEffect, useCallback } from "react";
import { get } from "aws-amplify/api";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import SummaryComponent from "./SummaryComponent";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchFilteredOrSortedData = useCallback(async () => {
    const hasFilters = Object.keys(filters).length > 0;
    const hasSorting = sortField && sortOrder;

    let path = "/data-fetching";
    const queryParams = {
      page: page,
      page_size: pageSize,
    };

    if (hasFilters) {
      path = "/data-filtering";
      queryParams.filter = Object.entries(filters)
        .map(([key, value]) => {
          if (key === "temperature") {
            return `((temperature > '${value.from}') AND (temperature < '${value.to}'))`;
          } else if (key === "timestamp") {
            return `((timestamp >= '${value.from}') AND (timestamp < '${value.to}'))`;
          } else {
            return `(${key}='${value}')`;
          }
        })
        .join("&");
    }

    if (hasSorting) {
      path = hasFilters ? "/data-filtering-sorting" : "/data-sorting";
      queryParams.sort_field = sortField;
      queryParams.sort_order = sortOrder;
    }
    console.log("Fetching data with", path, queryParams);

    try {
      const filterQueries = Object.entries(filters)
        .map(([key, value]) => {
          if (key === "temperature") {
            return `((temperature > '${value.from}') AND (temperature < '${value.to}'))`;
          } else if (key === "timestamp") {
            return `((timestamp >= '${value.from}') AND (timestamp < '${value.to}'))`;
          } else {
            return `(${key}='${value}')`;
          }
        })
        .join("&");
      const response = await get({
        apiName: "dashboardAppAPI",
        path: path,
        options: {
          queryParams: {
            sort_field: sortField,
            sort_order: sortOrder,
            filter: filterQueries,
            page: page,
            page_size: pageSize,
          },
        },
      }).response;
      const result = await response.body.json();
      setTempData(JSON.parse(result.body).data);
      setTotalPages(JSON.parse(result.body).total_pages);
      console.log("Fetched Data: ", result);

      if (path === "/data-filtering" || path === "/data-filtering-sorting") {
        setLoading(true);
        fetchAnalysis(filterQueries);
        setLoading(false);
      } else {
        setAnalysis();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [filters, sortField, sortOrder, page, pageSize]);

  const fetchAnalysis = async (filterQueries) => {
    setLoading(true);
    console.log("Fetching analysis");
    try {
      const response = await get({
        apiName: "dashboardAppAPI",
        path: "/update-data",
        options: {
          queryParams: {
            filter: filterQueries,
          },
        },
      }).response;
      const result = await response.body.json();
      setAnalysis(JSON.parse(result.body).data);
      console.log("Fetched analysis: ", analysis);
    } catch (error) {
      console.error("Error fetching analysis", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredOrSortedData();
  }, [fetchFilteredOrSortedData]);

  useEffect(() => {
    if (!loading) {
      setData(tempData);
    }
  }, [loading, tempData]);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  const handleFetchAnalysis = () => {
    const filterQueries =
      Object.keys(filters).length === 0
        ? "1=1"
        : Object.entries(filters)
            .map(([key, value]) => {
              if (key === "temperature") {
                return `((temperature > '${value.from}') AND (temperature < '${value.to}'))`;
              } else if (key === "timestamp") {
                return `((timestamp >= '${value.from}') AND (timestamp < '${value.to}'))`;
              } else {
                return `(${key}='${value}')`;
              }
            })
            .join("&");
    fetchAnalysis(filterQueries);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFilterChange = (field, value, isRange = false) => {
    if (isRange) {
      setFilters((prevFilters) => {
        const newFilters = {
          ...prevFilters,
          [field]: {
            ...prevFilters[field],
            ...value,
          },
        };
        if (!newFilters[field].from && !newFilters[field].to) {
          delete newFilters[field];
        }
        return newFilters;
      });
    } else {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters, [field]: value };
        if (!newFilters[field]) {
          delete newFilters[field];
        }
        return newFilters;
      });
    }
  };

  const renderPagination = () => {
    const pages = [];
    let start = Math.max(1, page - 5);
    let end = Math.min(totalPages, page + 4);

    if (page <= 5) {
      end = Math.min(10, totalPages);
    } else if (page > totalPages - 5) {
      start = Math.max(totalPages - 9, 1);
      end = totalPages;
    } else {
      start = page - 5;
      end = page + 4;
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={page === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const getSortIcon = (field) => {
    if (field === sortField) {
      return sortOrder === "ASC" ? (
        <i className="fas fa-sort-up"></i>
      ) : (
        <i className="fas fa-sort-down"></i>
      );
    }
    return <i className="fas fa-sort"></i>;
  };

  return (
    <>
      <FilterComponent handleFilterChange={handleFilterChange} />
      <SummaryComponent
        analysis={analysis}
        loading={loading}
        handleFetchAnalysis={handleFetchAnalysis}
      />
      <div className="page-container">
        <h2>Data</h2>
        <div className="page-content">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            <i className="fas fa-angle-left"></i>
          </button>
          {page} / {totalPages}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
      <SortComponent handleSort={handleSort} getSortIcon={getSortIcon} />
      {Array.isArray(data) &&
        data.map((item, index) => (
          <div className="grid-container" key={index}>
            <p>{index + 1 + (page - 1) * pageSize}</p>
            <p>{item.device_id}</p>
            <p>{item.timestamp}</p>
            <p>{item.temperature}</p>
            <p>{item.light}</p>
            <p>{item.motion}</p>
          </div>
        ))}
      <div className="pagination">{renderPagination()}</div>
    </>
  );
};

export default Dashboard;
