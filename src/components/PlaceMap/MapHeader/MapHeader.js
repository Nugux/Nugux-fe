import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

import "./MapHeader.scss";

function MapHeader({ handleSelectDate = () => {} }) {
  return (
    <div className="map-header">
      <DatePicker
        locale={{
          today: "오늘"
        }}
        format="YYYY-MM-DD"
        onChange={(date, dateString) => { handleSelectDate(dateString); }}
        placeholder={"언제 여행 가시나요?"}
        disabledDate={(date) => date && date < moment().endOf("day").subtract(1, "day")}
        inputReadOnly={true}
      />
    </div>
  );
}

export default MapHeader;