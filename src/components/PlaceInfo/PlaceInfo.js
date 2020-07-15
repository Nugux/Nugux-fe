import React from "react";
import { Card, Button } from "antd";

import { EnvironmentTwoTone, CarOutlined } from "@ant-design/icons";

import "./PlaceInfo.css";

function PlaceInfo(props) {
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
        <button className={'btn-close'} onClick={props.onClose}>
          <span>&times;</span>
        </button>
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

PlaceInfo.propTypes = {
  onClose: ()=>{}
};

export default PlaceInfo;