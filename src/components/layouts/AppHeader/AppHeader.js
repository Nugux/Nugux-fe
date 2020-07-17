import React from "react";
import Logo from "../../../assets/logo.png";

import "./AppHeader.css";

function AppHeader() {
  return (
    <header>
      <img src={Logo} className="app-logo" alt="logo-image" />
    </header>
  );
}

export default AppHeader;