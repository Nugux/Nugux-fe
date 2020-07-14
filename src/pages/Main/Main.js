import React from "react";
import { DatePicker } from 'antd';
import MyMap from "../../components/MyMap";
import PlaceInfo from "../../components/PlaceInfo";
import "./Main.css";

const { RangePicker } = DatePicker;

function Main() {
  return (
    <div className="main">
      <MyMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        isMarkerShown={false}
      />
      <RangePicker
        format="YYYY-MM-DD"
        onChange={() => {}}
        onOk={() => {}}
        placeholder={["출발", "도착"]}
      />
      <PlaceInfo />
    </div>
  );
}

export default Main;