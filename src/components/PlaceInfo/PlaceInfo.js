import React from "react";
import { Card, Button } from "antd";
import {
  EnvironmentTwoTone,
  CarOutlined,
  SearchOutlined,
  BarChartOutlined
} from "@ant-design/icons";

import { usePlaceInfo } from "../../contexts/place-info-context";

import "./PlaceInfo.scss";

/**
 * @return {null}
 */
const days = ["월", "화", "수", "목", "금", "토", "일"];
function PlaceInfo() {
  const [placeInfoState] = usePlaceInfo();
  console.log(placeInfoState.placeInfo);
  // 선택된 장소가 있을 때만 영역이 표시되도록 함
  if (!placeInfoState.selectedPlaceId) {
    return (
      <div className="place-info inactive">
        <Card bordered={false} />
      </div>
    );
  }

  const { name, congestionList, address } = placeInfoState.placeInfo;

  return (
    <div className="place-info">
      <Card bordered={false}>
        <h1 className="place-title">
          <EnvironmentTwoTone twoToneColor="red" /> {name}
        </h1>
        <p className="address">{address}</p>
        <div className="button-container">
          <Button
            shape="round"
            danger
            icon={<CarOutlined />}>길찾기</Button>
          <Button
            shape="round"
            danger
            icon={<SearchOutlined />}>
            <a href={`https://search.naver.com/search.naver?query=${name}`} target="_blank">네이버 검색</a>
          </Button>
        </div>
        <div className="place-graph">
          <h2 className="place-graph-title">
            <BarChartOutlined /> 요일별 혼잡도
          </h2>
          <div className="graph-container">
            {
              days.map((day, idx) => {
                return (
                  <div className="graph-item">
                    <span
                      className="graph-item-bar"
                      style={{
                        height: `${congestionList[idx] * 20}px`
                      }} />
                    <span className="graph-item-day">{day}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Card>
    </div>
  );
}

PlaceInfo.defaultProps = {
  onClose: ()=>{}
};

export default PlaceInfo;