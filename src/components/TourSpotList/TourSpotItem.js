import React from "react";
import { List } from "antd";

function TourSpotItem({ title, congestion, description }) {
  return (
    <List.Item key={title}>
      <List.Item.Meta
        title={<span>{title}</span>}
        description={description} />
      <span>혼잡도 : {congestion}</span>
    </List.Item>
  );
}

export default TourSpotItem;
