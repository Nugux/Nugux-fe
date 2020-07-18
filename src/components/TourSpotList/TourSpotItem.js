import React from "react";
import { List } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

import { getCongestionColor } from "../../utils/getColor";
import { useSidebar } from "../../contexts/sidebar-context";
import { usePlaceInfo } from "../../contexts/place-info-context";
import { getTouristSpotDetail } from "../../api/api";

const IMAGE_SERVER = process.env.REACT_APP_SERVER;

function TourSpotItem({ title, congestion, description, id, shortDesc, image }) {
  const [, sidebarDispatch] = useSidebar();
  const [, placeInfoDispatch] = usePlaceInfo();
  return (
    <List.Item
      key={title}
      onClick={async () => {
        sidebarDispatch({ type: "close" });
        const result = await getTouristSpotDetail(id);
        placeInfoDispatch({
          type: "fetch",
          payload: {
            id,
            placeInfo: result,
          }
        });
      }}>
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
        description={<span className="item-description">{shortDesc}...</span>} />
      <div className="item-image-container">
        <img src={`${IMAGE_SERVER}${image}`} alt="관광지 사진"/>
      </div>
    </List.Item>
  );
}

export default TourSpotItem;
