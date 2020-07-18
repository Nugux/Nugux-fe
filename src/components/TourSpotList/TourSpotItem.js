import React from "react";
import { List } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

function TourSpotItem({ title, congestion, description, id, shortDesc }) {
  return (
    <List.Item key={title}>
      <List.Item.Meta
        title={(
          <span className="item-title">
            <RightCircleOutlined /> {title}
          </span>
        )}
        description={description} />
      <span className="item-description">{shortDesc}...</span>
    </List.Item>
  );
}

export default TourSpotItem;
