import React from "react";
import { BarChartOutlined } from "@ant-design/icons";

import { getCongestionColor, getDayColor } from "../../utils/getColor";

const days = ["월", "화", "수", "목", "금", "토", "일"];

function PlaceInfoGraph({ congestionList }) {
  return (
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
  )
}

export default PlaceInfoGraph;