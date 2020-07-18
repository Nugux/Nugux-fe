import React from "react";
import { Card, Button } from "antd";
import {
  EnvironmentTwoTone,
  CarOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { usePlaceInfo } from "../../contexts/place-info-context";
import PlaceInfoGraph from "./PlaceInfoGraph";
import {zipQueryString} from "../../api/api";

import "./PlaceInfo.scss";

const IMAGE_SERVER = process.env.REACT_APP_SERVER;

/**
 * @return {null}
 */
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

  const {
    name,
    address,
    description,
    image,
    lat,
    lng
  } = placeInfoState.placeInfo;

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
        <PlaceInfoGraph {...placeInfoState.placeInfo} />
      </Card>
    </div>
  );
}

export default PlaceInfo;