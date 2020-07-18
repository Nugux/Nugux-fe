import React from "react";
import { List } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

import { getCongestionColor } from "../../utils/getColor";

function TourSpotItem({ title, congestion, description, id, shortDesc }) {
  return (
    <List.Item key={title}>
      <List.Item.Meta
        title={(
          <span className="item-title">
            <RightCircleOutlined
              style={{
                color: getCongestionColor(congestion),
                stroke: getCongestionColor(congestion),
                strokeWidth: "30px"
              }}/> {title}
          </span>
        )}
        description={description} />
      <span className="item-description">{shortDesc}...</span>
    </List.Item>
  );
}

export default TourSpotItem;
