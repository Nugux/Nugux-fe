import React, {useEffect, useState} from "react";

import "./TourSpotList.css";
import {Button, List, Skeleton} from "antd";
import {Swipeable} from "react-swipeable";
import {ReloadOutlined} from "@ant-design/icons";
let tmpCnt = 0;
function TourSpotList(props) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([...new Array(3)].map(() => ({ loading: true, name: {} })));
    const [data, setData] = useState([]);

    useEffect(() => {
        getData(res => {
            setInitLoading(false);
            setList(res);
            setData(res);
        });
    }, []);

    const getData = (callback) => { //dummy...
        //props.getData(callback);
        setTimeout(()=>{
            callback([...new Array(3)].map(() => ({
                title: `가게 ${++tmpCnt}`,
                congestion: 2.3,
                description: '모 가게입니다...',
            })))
        }, 3000);
    };

    const onLoadMore = () => {
        setLoading(true);
        setList(data.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))));
        getData(res => {
            const tmp = data.concat(res);
            setData(tmp);
            setList(tmp);
            setLoading(false);
        });
    };

    const loadMore = () => {
        return (!initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}><ReloadOutlined/></Button>
            </div>
        ) : null);
    };

    return (
        <Swipeable
            className={'tour-spot-list-view'}
            onSwipedLeft={eventData => {
                props.onClose()
            }}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                dataSource={list}
                loading={initLoading}
                loadMore={loadMore()}
                renderItem={item => (<List.Item
                        key={item.title}
                        actions={[]}
                        extra={(<div>
                        </div>)}
                    >
                        <Skeleton loading={item.loading}>
                            <List.Item.Meta
                                title={<span>{item.title}</span>}
                                description={item.description}
                            />
                            <span>혼잡도 : {item.congestion}</span>
                        </Skeleton>
                    </List.Item>
                )}/>
        </Swipeable>
    );
}

TourSpotList.defaultProps = {
    open: false,
    onClose: ()=>{},
    getData: (callback)=>{}
};

export default TourSpotList;