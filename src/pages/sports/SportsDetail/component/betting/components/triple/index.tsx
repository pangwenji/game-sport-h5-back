import { Collapse, Input } from "antd-mobile";
import { motion } from "framer-motion";
import React, { useState, PropsWithChildren, useEffect } from "react";
import singleArrow from '@/assets/images/sports/svg/single-arrow.svg';
import upArrow from '@/assets/images/sports/svg/up_arrow.svg';
import RenderTitle from "../render_title";
import CalculationPanel from "../calculation_panel";
import TopImg from '@/assets/images/sports/svg/top.svg'
import './triple.scss'
import { setActiveKey, useActiveKeyStore, useHistoryStore, useMatchDetailStore, useShowAll } from "@/stores/sports-detail";
import { checkoutOdds, draw, handleTriple, master, vist } from "@/hooks/useBettings";
import { resultMgType } from "@/interface";
import SpanRight from "../render_span_right";
interface IProp {
    everyItem: resultMgType
    isShowHeader?: boolean
    index: number
    sortData?: (e) => void
}
const Triple: React.FC<PropsWithChildren<IProp>> = ({ index, sortData, everyItem }: IProp) => {
    const { activeKeyTriple } = useActiveKeyStore.getState();
    const checkExpend = (e: any) => {
        setActiveKey('triple', e)
        setDoubleArrow(!doubleArrowFlag)
    }
    let { mg } = useMatchDetailStore.getState();
    const { showAll } = useShowAll.getState();

    const [visible, setVisible] = useState(false)
    const [doubleArrowFlag, setDoubleArrow] = useState(false);
    const [isShowHeader] = useState(true);
    let { disable } = useHistoryStore.getState()
    handleTriple(everyItem.mks);
    let { totalMaster, drawTotal, vistTotal, } = useMatchDetailStore.getState();
    useEffect(() => {
        if (showAll) {
            setActiveKey('triple', Array.from({ length: mg.length }, (_, idx) => `${idx}`));
        } else {
            setActiveKey('triple', []);
        }
    }, [showAll]);
    return <div >

        <Collapse onChange={(e) => checkExpend(e)} activeKey={activeKeyTriple} >
            <Collapse.Panel
                key={`${index}`}
                title={<RenderTitle
                    doubleArrowFlag={doubleArrowFlag}
                    title={everyItem.nm} />}
                className={activeKeyTriple.includes(`${index}`) ? 'collPanel_expands' : 'collPanel_closes'}
                arrow={
                    <div onClick={() => sortData(index)}>
                        {
                            everyItem.flag ? <img src={TopImg} width={20} height={20} ></img> : <img src={upArrow} width={20} height={20} />
                        }
                    </div>
                }
            >
                <div className="box" >
                    {
                        isShowHeader ? (
                            <div className="title">
                                <span>主</span>
                                <span>和</span>
                                <span>客</span>
                            </div>

                        ) : null
                    }

                    <div className="content">
                        <div className="content-box">
                            {
                                totalMaster.map((element, index) => {
                                    return (
                                        <CalculationPanel id={element.id} takePlay={everyItem.nm} au={element.au} ss={element.ss} nm={element.nm} od={element.od} ty={element.ty} key={index} />
                                    )
                                })
                            }
                        </div>
                        <div className="content-box">

                            {
                                drawTotal.map((element, index) => {
                                    return (
                                        <CalculationPanel id={element.id} takePlay={everyItem.nm} au={element.au} ss={element.ss} nm={element.nm} od={element.od} ty={element.ty} key={index} />
                                    )
                                })
                            }

                        </div>

                        <div className="content-box">
                            {
                                vistTotal.map((element, index) => {
                                    return (
                                        <CalculationPanel id={element.id} takePlay={everyItem.nm} au={element.au} ss={element.ss} nm={element.nm} od={element.od} ty={element.ty} key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>


                </div>
            </Collapse.Panel>
        </Collapse>
    </div>
}

export default Triple;