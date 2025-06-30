"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getColor from "../lib/get-color";
import { fetchContributions } from "../api/github";
import { colors as defaultColors } from "../lib/constants";
import "../styles/index.css";

const ReactGreenGraph = ({ username, token, colors = defaultColors }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Convert colors array to the expected format for getColor function
  const colorMap = Array.isArray(colors)
    ? {
        0: colors[0] || "#ebedf0", // No contributions
        1: colors[1] || "#c6e48b", // 1-3 contributions
        2: colors[2] || "#7bc96f", // 4-6 contributions
        5: colors[3] || "#239a3b", // 7-9 contributions
        10: colors[4] || "#196127", // 10+ contributions
      }
    : colors;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!username || !token) {
        throw new Error("Username and token are required");
      }

      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      );

      const result = await Promise.race([
        fetchContributions(username, token),
        timeoutPromise,
      ]);

      if (!result || !result.contributionCalendar) {
        throw new Error("Invalid data received from GitHub API");
      }

      setData(result);
    } catch (err) {
      console.error("Error fetching contributions:", err);
      console.error("Error details:", {
        username,
        hasToken: !!token,
        errorType: err.name,
        errorMessage: err.message,
      });

      // Handle errors
      let errorMessage = "Failed to fetch contribution data";

      if (err.message.includes("Request timeout")) {
        errorMessage =
          "Request timed out. Please check your connection and try again.";
      } else if (
        err.message.includes("401") ||
        err.message.includes("Unauthorized")
      ) {
        errorMessage =
          "Invalid GitHub token. Please check your authentication.";
      } else if (
        err.message.includes("404") ||
        err.message.includes("Not Found")
      ) {
        errorMessage = `User "${username}" not found. Please check the username.`;
      } else if (
        err.message.includes("403") ||
        err.message.includes("Forbidden")
      ) {
        errorMessage = "Rate limit exceeded. Please try again later.";
      } else if (
        err.message.includes("Network") ||
        err.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (err.message.includes("Username and token are required")) {
        errorMessage = "Please provide both username and GitHub token.";
      } else if (err.message.includes("Invalid data")) {
        errorMessage = "Received invalid data from GitHub. Please try again.";
      }

      setError({ message: errorMessage, originalError: err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username, token]);

  // Show loading state
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading contribution data"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          gap: "10px",
        }}>
        <div style={{ fontSize: "16px", color: "#586069" }}>
          Loading contribution data...
        </div>
        <div
          role="progressbar"
          aria-label="Loading spinner"
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid #f3f3f3",
            borderTop: "2px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        aria-label="Error loading contributions"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          gap: "15px",
          padding: "20px",
          textAlign: "center",
        }}>
        <div
          style={{
            fontSize: "18px",
            color: "#d73a49",
            fontWeight: "bold",
          }}>
          Error Loading Contributions
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#586069",
            maxWidth: "400px",
            lineHeight: "1.4",
          }}>
          {error.message}
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (!data || !data.contributionCalendar || !data.contributionCalendar.weeks) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          gap: "10px",
        }}>
        <div style={{ fontSize: "16px", color: "#586069" }}>
          No contribution data available
        </div>
        <div style={{ fontSize: "12px", color: "#586069" }}>
          This user may not have any public contributions or the account might
          be private.
        </div>
      </div>
    );
  }

  // Extract the weeks data
  const weeks = data.contributionCalendar.weeks || [];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get contribution text
  const getContributionText = (count) => {
    if (count === 0) return "No contributions";
    if (count === 1) return "1 contribution";
    return `${count} contributions`;
  };

  return (
    <div className="contribution-graph">
      <div className="legend">
        <span className="legend-text">Less</span>
        {Object.values(colorMap).map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
            }}
            className="legend-color"
          />
        ))}
        <span className="legend-text">More</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "3px",
          position: "relative",
        }}>
        {/* Day labels */}
        <div className="day-labels">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div
                key={day}
                style={{
                  opacity: index % 2 === 0 ? 1 : 0,
                }}
                className="day-label">
                {day}
              </div>
            )
          )}
        </div>

        {/* Contribution grid */}
        <div className="contribution-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week-column">
              {week.contributionDays.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  style={{
                    backgroundColor: getColor(day.contributionCount, colorMap),
                    border:
                      hoveredDay === `${weekIndex}-${dayIndex}`
                        ? "1px solid #000"
                        : "1px solid transparent",
                  }}
                  className="contribution-day"
                  onMouseEnter={() => setHoveredDay(`${weekIndex}-${dayIndex}`)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${formatDate(day.date)}: ${getContributionText(
                    day.contributionCount
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div className="tooltip">
          {(() => {
            const [weekIndex, dayIndex] = hoveredDay.split("-").map(Number);
            const day = weeks[weekIndex]?.contributionDays[dayIndex];
            if (!day) return "";
            return `${formatDate(day.date)}: ${getContributionText(
              day.contributionCount
            )}`;
          })()}
        </div>
      )}

      {/* Total contributions */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#586069",
        }}>
        Total contributions: {data.contributionCalendar.totalContributions || 0}
      </div>
    </div>
  );
};

ReactGreenGraph.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default ReactGreenGraph;
