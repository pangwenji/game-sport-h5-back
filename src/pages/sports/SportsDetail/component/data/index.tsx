import { Tabs } from "antd-mobile";
import React, { useState, useEffect } from "react";

import './data.scss'
import RealTime from "./RealTime";
import LineUp from "./LineUp";
import Analysis from "./Analysis";
import CuttingEdgeNews from "./CuttingEdgeNews";
import { getTextLive, getWeatherInfo, handlerTabs } from "@/hooks/useBettings";
import { useMatchDetailStore } from "@/stores/sports-detail";

enum TabType {
    REALTIME = 'realTime',//实时
    LINE_UP = 'lineup',//整容
    ANALYSIS = 'analysis',
    CUTTING_EDGE_NEWS = 'cuttingEdgeNews'
}
const Data: React.FC = () => {
    const [showTab, setShowTab] = useState('realTime');
    const [tabList, setTabList] = useState([])
    const { fmt } = useMatchDetailStore.getState();


    const renderTab = () => {
        switch (showTab) {
            case TabType.REALTIME:
                return <RealTime />;
            case TabType.LINE_UP:
                return <LineUp />;
            case TabType.ANALYSIS:
                return <Analysis />;
            case TabType.CUTTING_EDGE_NEWS:
                return <CuttingEdgeNews />;
            default:
                return <div></div>
        }
    }
    // getTextLive({ id: 1558245, plat: 'st' });
    useEffect(() => {
        // getWeatherInfo({ id: 1558245, plat: 'st' });
        setTabList(handlerTabs(fmt));
    }, [tabList.length])
    return (
        <div className="data-main">
            <div className="data_tab">
                <Tabs onChange={(e) => setShowTab(e)}>
                    {
                        tabList.map((res, index) => {
                            return (
                                <Tabs.Tab title={res.name} key={res.key} />
                            )
                        })
                    }
                </Tabs>
            </div>
            {renderTab()}
        </div>
    )
}

export default Data;