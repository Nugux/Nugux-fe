import React from "react";
import { List } from "antd";
import { Swipeable } from "react-swipeable";
import { BarsOutlined } from "@ant-design/icons";

import { usePlaceList } from "../../contexts/place-list-context";
import { useSidebar } from "../../contexts/sidebar-context";
import TourSpotItem from "./TourSpotItem";

import "./TourSpotList.scss";

function TourSpotList() {
    const [placeListState] = usePlaceList();
    const [, sidebarDispatch] = useSidebar();

    return (
        <Swipeable
            className={'tour-spot-list-view'}
            onSwipedLeft={() => { sidebarDispatch({ type: "close" }); }}
        >
            <h2 className="title">
                <BarsOutlined style={{ marginRight: '7px' }} />
                주변 관광지
            </h2>
            <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                dataSource={placeListState.placeList || []}
                renderItem={({ props: item }) => (
                  <TourSpotItem {...item} />
                )}/>
        </Swipeable>
    );
}

TourSpotList.defaultProps = {
    open: false
};

export default TourSpotList;