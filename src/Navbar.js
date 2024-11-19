import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ setGroupBy }) {
  const [display, setDisplay] = useState(false);

  const handleGroupChange = (groupType) => {
    setGroupBy(groupType);
    setDisplay(false); // Close the dropdown after selection
  };

  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => setDisplay(!display)}>
          Display
        </button>
        {display && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <button onClick={() => handleGroupChange("status")}>Group by Status</button>
              <div className="submenu">
                <button onClick={() => handleGroupChange("status")}>Status</button>
                <button onClick={() => handleGroupChange("user")}>User</button>
                <button onClick={() => handleGroupChange("priority")}>Priority</button>
              </div>
            </div>
            <div className="dropdown-item">
              <button onClick={() => handleGroupChange("ordering")}>Order by</button>
              <div className="submenu">
                <button onClick={() => handleGroupChange("priority")}>Priority</button>
                <button onClick={() => handleGroupChange("title")}>Title</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
