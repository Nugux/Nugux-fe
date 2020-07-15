import React from "react";

import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./AppHeader.css";

function AppHeader({ onMenuClicked = () => { } }) {
  return (
    <header>
      <div className="app-title">
          <Button className="app-title-btn" onClick={onMenuClicked}>
            <MenuOutlined />
          </Button>
          <span className="app-title-text">nuguX</span>
      </div>
    </header>
  );
}

export default AppHeader;