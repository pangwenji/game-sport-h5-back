import React, { useState, useEffect } from "react";
import './bettings.scss'
import { Badge, Collapse, Divider, Empty, Input, Mask, Modal, Tabs } from "antd-mobile";
import doubleArrow from '@/assets/images/sports/svg/duble_arrow.svg';
import { motion } from "framer-motion";
import { useCallback } from 'react'
import RightTips from '@/assets/images/sports/svg/right-tips.svg'
import CalculationPanel from "./components/calculation_panel";
import { changesShowKeyboardStatus, useHistoryStore, useMatchDetailStore, useShowAll } from "@/stores/sports-detail";
import { marketType } from "@/utils/market_type";
import Triple from "./components/triple";
import Double from "./components/double";
import Single from "./components/single";
import TopImg from '@/assets/images/sports/svg/top.svg'
import { dealType, handleTab, setListTopOrBottom, translate } from "@/hooks/useBettings";
import { useIsSelectSeriesStore, useBetOptionListStore, useBetMatchMarketListStore } from "@/stores/bet";
import eventBus from "@/utils/events";

const Betting: React.FC = () => {

    const [doubleArrowFlag, setDoubleArrow] = useState(false);
    const [tabs, setTabs] = useState([]);
    let { isSelectSeries } = useIsSelectSeriesStore.getState()

    const renderBlank = () => {
        return <div className="empty">
            <Empty description='盘口没开' />
        </div>
    }
    const choose = (idx) => {
        if (idx === '0') {
            useMatchDetailStore.setState({ mg: useMatchDetailStore.getState().total })
            return
        }
        tabs.forEach((element, index) => {
            if (String(index) === idx) {
                useMatchDetailStore.setState({
                    mg: dealType(mg, element)
                })
            }
        })

    }

    const { mg } = useMatchDetailStore.getState();

    let { betMatchMarketList } = useBetMatchMarketListStore.getState()
    //点击之后排序
    const sortData = (idx) => {
        useMatchDetailStore.setState({ mg: setListTopOrBottom(mg, idx) })
    }
    const showAllOrClose = () => {
        setDoubleArrow(!doubleArrowFlag);
        useShowAll.setState({ showAll: !useShowAll.getState().showAll })
    }
    useEffect(() => {
        setTabs(handleTab(JSON.parse(JSON.stringify(mg))));
    }, [tabs.length]);

    return (
        <div className="betting-mains">
            <div >
                {
                    tabs.length > 0 ? (
                        <div className="tab_choose">
                            <div className="left" >
                                <div className="motion" onClick={showAllOrClose} style={{ borderRight: '1px solid #f0f0f0' }}>
                                    <motion.div animate={{ rotate: doubleArrowFlag ? 0 : 180 }}>
                                        <img src={doubleArrow} width={20} height={20} />
                                    </motion.div>
                                </div>
                            </div>
                            <Tabs onChange={(e) => choose(e)} defaultActiveKey="0" >
                                {
                                    tabs.map((element, index) => {
                                        return (
                                            <Tabs.Tab key={index} title={translate(element)} />
                                        )
                                    })
                                }
                            </Tabs>
                        </div>
                    ) : null
                }
            </div>
            <div className="list-content">
                {
                    mg.length > 0 ? (
                        mg.map((res, index) => {
                            if (marketType[res.mty] === 3) {
                                return <Triple everyItem={res} key={index} index={index} sortData={(e) => sortData(e)} />
                            } else if (marketType[res.mty] === 2) {
                                return <Double everyItem={res} key={index} index={index} sortData={(e) => sortData(e)} />
                            } else if (marketType[res.mty] === 1) {
                                return <Single everyItem={res} key={index} index={index} sortData={(e) => sortData(e)} />
                            } else {
                                return <div></div>
                            }
                        })) : renderBlank()
                }
            </div>
            {
                isSelectSeries && (betMatchMarketList?.length > 0) ? (
                    <label>
                        <div className="right-tips"  >
                            <div className="contexts">
                                <div className="panel" >
                                    <CalculationPanel nm={""} od={null} isShowBackground={true} />
                                </div>
                                <Badge content={betMatchMarketList?.length} color="#2B44B1" className="badge" >
                                    <img src={RightTips} width={34} height={32} className="img" />
                                </Badge>
                            </div>
                        </div>
                    </label>
                ) : null
            }


        </div>
    )
}

export default Betting;

