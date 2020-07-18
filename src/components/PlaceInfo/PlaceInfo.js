import React from "react";
import { Card, Button } from "antd";
import {
  EnvironmentTwoTone,
  CarOutlined,
  SearchOutlined,
  BarChartOutlined
} from "@ant-design/icons";

import { usePlaceInfo } from "../../contexts/place-info-context";
import { getCongestionColor, getDayColor } from "../../utils/getColor";

import "./PlaceInfo.scss";
import {zipQueryString} from "../../api/api";

const IMAGE_SERVER = process.env.REACT_APP_SERVER;

/**
 * @return {null}
 */
const days = ["일", "월", "화", "수", "목", "금", "토"];
function PlaceInfo() {
  const [placeInfoState] = usePlaceInfo();

  // 선택된 장소가 있을 때만 영역이 표시되도록 함
  if (!placeInfoState.selectedPlaceId) {
    return (
      <div className="place-info inactive">
        <Card bordered={false} />
      </div>
    );
  }

  const { name, congestionList, address, description, image } = placeInfoState.placeInfo;

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
              icon={<CarOutlined />}>
            <a href={`https://api2.sktelecom.com/tmap/app/routes?${zipQueryString({
              appKey:process.env.REACT_APP_TMAP_KEY,
              name:name,
              lat:lat,
              lon:lng
            })}`}
               target="_blank">길찾기</a>
          </Button>
          <Button
            shape="round"
            danger
            icon={<SearchOutlined />}>
            <a href={`https://search.naver.com/search.naver?query=${name}`} target="_blank">네이버 검색</a>
          </Button>
        </div>
        <div className="place-description">
          <img src={`${IMAGE_SERVER}${image}`} alt="장소 이미지" />
          <span>{description}</span>
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
                        height: `${congestionList[idx] * 20}px`,
                        backgroundColor: getCongestionColor(congestionList[idx]),
                      }} />
                    <span
                      className="graph-item-day"
                      style={{ color: getDayColor(day) }}>{day}</span>
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

export default PlaceInfo;