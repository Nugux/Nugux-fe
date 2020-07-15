import React from "react";

import "./AppHeader.css";
import {MenuOutlined} from "@ant-design/icons";
import {Button} from "antd";

function AppHeader(props) {
  return (
    <header>
      <div className="app-title">
          <Button className={'app-title-btn'} onClick={props.onMenuClicked}><MenuOutlined /></Button>
          <span className={'app-title-text'}>nuguX</span></div>
    </header>
  );
}

AppHeader.defaultProps = {
    onMenuClicked:()=>{}
};

export default AppHeader;