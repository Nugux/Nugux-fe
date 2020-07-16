import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { useSidebar } from "../../../contexts/sidebar-context";

import "./AppHeader.css";

function AppHeader() {
  const [ , sidebarDispatch ] = useSidebar();
  return (
    <header>
      <div className="app-title">
          <Button className="app-title-btn" onClick={() => sidebarDispatch({ type: "open" })}>
            <MenuOutlined />
          </Button>
          <span className="app-title-text">nuguX</span>
      </div>
    </header>
  );
}

export default AppHeader;