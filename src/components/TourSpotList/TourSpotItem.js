import React from "react";
import { List } from "antd";

function TourSpotItem({ title, city, congestion, description }) {
  return (
    <List.Item
      key={title}
      actions={[]}
      extra={(<div>
      </div>)}
    >
      <List.Item.Meta
        title={<span>{title.concat(`(${city})`)}</span>}
        description={description}
      />
      <span>혼잡도 : {congestion}</span>
    </List.Item>
  );
}

export default TourSpotItem;
