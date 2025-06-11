import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import "./LeadershipDashboard.css";
import Dashboard from "./Dashboard";
import Sections from "./Sections";
import Officers from "./Officers";
import Members from "./Members";
import Dues from "./Dues";

const LeadershipDashboard = (props) => {
  const userRoles = useSelector((state) => state.auth.userRoles);
  const menuItems = [
    "Dashboard",
    userRoles.includes("state-leader") ? "Sections" : null,
    userRoles.includes("section-leader") ||
    userRoles.includes("section-president") ||
    userRoles.includes("collegiate-leaders") ||
    userRoles.includes("affiliate-leader")
      ? "Elected Officers"
      : null,
    "Members",
    "Dues",
  ];

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [show, setShow] = useState(false);

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":
        return <Dashboard userRoles={userRoles} />;
      case "Sections":
        return <Sections />;
      case "Elected Officers":
        return <Officers />;
      case "Members":
        return <Members />;
      case "Dues":
        return <Dues />;

      default:
        return (
          <div className="section">
            <p>Select a section from the menu.</p>
          </div>
        );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && show === true) {
        setShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [show]);

  return (
    <div className="dashboard-layout">
      <div className={`side-column ${show ? "mob" : ""}`}>
        <span
          class="material-symbols-outlined sidebar-icn"
          onClick={() => {
            setShow(!show);
          }}
        >
          dehaze
        </span>
        <ul className="menu-list">
          {menuItems.map(
            (item) =>
              item != null && (
                <li
                  key={item}
                  className={selectedMenu === item ? "active" : ""}
                  onClick={() => {
                    setSelectedMenu(item);
                    setShow(!show);
                  }}
                >
                  {item}
                </li>
              )
          )}
        </ul>
      </div>

      <div className="dashboard-main">
        <h2>{selectedMenu}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default LeadershipDashboard;
