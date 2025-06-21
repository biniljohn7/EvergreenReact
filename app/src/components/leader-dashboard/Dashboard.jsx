import React, { useState, useEffect } from "react";
import { viewDashboard } from "../../api/LeadershipAPI";

const Dashboard = ({ userRoles }) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [leadershipTitles, setLeadershipTitles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewDashboard();
        setMetrics(res?.data?.metrics || []);
        setLeadershipTitles(res?.data?.learshipTitles || []);
      } catch (err) {
        if (err.response?.status === 401) {
          console.log("Session Expired! Please login again.");
        } else {
          console.log("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <>
      <h4>My Leadership Circle</h4>
      {metrics.length > 0 && (
        <div className="kpi-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="kpi-card">
              <h4>{metric.title}</h4>
              <p className="kpi-value">{metric.value}</p>
              <p className="kpi-description">{metric.description}</p>
            </div>
          ))}
        </div>
      )}

      {leadershipTitles.length > 0 && (
        <div className="leadership-section mt-6">
          <ul className="list-disc pl-6">
            {leadershipTitles.map((item, idx) => (
              <li key={idx}>
                <h3>{item.title}</h3> – {item.circle?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Dashboard;
