import React, { useState, useEffect, useMemo } from 'react';
import { viewDashboard } from '../../api/LeadershipAPI';

const Dashboard = ({ userRoles }) => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);


//   const metrics = [
//     {
//       title: "Team Performance",
//       value: "87%",
//       description: "Monthly target achievement",
//     },
//     {
//       title: "Active Projects",
//       value: "12",
//       description: "Ongoing strategic initiatives",
//     },
//     {
//       title: "Engagement Score",
//       value: "75%",
//       description: "Team sentiment rating",
//     },
//     { title: "Retention Rate", value: "92%", description: "Past 12 months" },
//   ];

//   const leaderboard = [
//     { name: "Alice Johnson", score: "95%" },
//     { name: "Mark Thompson", score: "91%" },
//     { name: "Sophia Lee", score: "89%" },
//   ];

//   const activities = [
//     "Townhall scheduled for June 15",
//     "New KPIs released",
//     "Quarterly reviews underway",
//     "Team expansion plan approved",
//   ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await viewDashboard();
        setMetrics(res?.data?.metrics || []);
      } catch (err) {
        if (err.response?.status === 401) {
          console.log('Session Expired! Please login again.');
        } else {
          console.log('Something went wrong.');
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

          {/* <div className="dashboard-sections">
            <div className="section">
              <h3>Team Leaderboard</h3>
              <ul className="list">
                {leaderboard.map((person, index) => (
                  <li key={index} className="list-item">
                    {person.name} — <strong>{person.score}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>Recent Activity</h3>
              <ul className="list">
                {activities.map((activity, index) => (
                  <li key={index} className="list-item">
                    {activity}
                  </li>
                ))}
              </ul>
            </div> 
          </div>*/}
    </>
  );
};

export default Dashboard;
