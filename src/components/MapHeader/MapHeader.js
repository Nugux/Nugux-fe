import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

import "./MapHeader.scss";

function MapHeader() {
  console.log(moment().endOf('day'));
  return (
    <div className="map-header">
      <DatePicker
        locale={{
          today: "오늘"
        }}
        format="YYYY-MM-DD"
        onChange={(date, dateString) => { window.alert(`개발자는 ${dateString}으로 API 요청하슈`) }}
        placeholder={"언제 여행 가시나요?"}
        disabledDate={(date) => date && date < moment().endOf("day").subtract(1, "day")}
      />
    </div>
  );
}

export default MapHeader;