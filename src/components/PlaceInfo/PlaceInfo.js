import React from "react";
import { Card, Button } from "antd";

import { EnvironmentTwoTone, CarOutlined } from "@ant-design/icons";

import "./PlaceInfo.css";

function PlaceInfo() {
  return (
    <div className="place-info">
      <Card bordered={false}>
        <h1>
          <EnvironmentTwoTone /> 롯데월드
        </h1>
        <p className="address">서울특별시 송파구 잠실동 올림픽로 240</p>
        <div className="light">
          <div className="light-color red" />
          <div className="light-color yellow" />
          <div className="light-color green" />
        </div>
        <div className="button-container">
          <Button
            shape="round"
            type="primary"
            icon={<CarOutlined />}>길찾기</Button>
        </div>
      </Card>
    </div>
  );
}

export default PlaceInfo;