import React from "react";
import { List } from "antd";
import { Swipeable } from "react-swipeable";

import { usePlaceList } from "../../contexts/place-list-context";
import { useSidebar } from "../../contexts/sidebar-context";
import TourSpotItem from "./TourSpotItem";

import "./TourSpotList.css";

function TourSpotList() {
    const [placeListState] = usePlaceList();
    const [, sidebarDispatch] = useSidebar();

    return (
        <Swipeable
            className={'tour-spot-list-view'}
            onSwipedLeft={() => { sidebarDispatch({ type: "close" }); }}
        >
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