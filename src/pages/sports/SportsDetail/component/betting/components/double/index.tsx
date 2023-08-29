import { Collapse, Input } from "antd-mobile"
import { useState, PropsWithChildren, useEffect } from "react";
import RenderTitle from "../render_title";
import upArrow from '@/assets/images/sports/svg/up_arrow.svg';
import './double.scss';
import Left from '@/assets/images/sports/img/left-0.png';
import CalculationPanel from "../calculation_panel";
import { changesShowKeyboardStatus, setActiveKey, useActiveKeyStore, useHistoryStore, useMatchDetailStore, useShowAll } from "@/stores/sports-detail";
import { handleDouble, handleShowTitle } from "@/hooks/useBettings";
import TopImg from '@/assets/images/sports/svg/top.svg'
import { resultMgType } from "@/interface";
import SpanRight from "../render_span_right";
interface IProp {

    index: number
    everyItem: resultMgType
    sortData?: (e) => void
}
const Double: React.FC<PropsWithChildren<IProp>> = ({ everyItem, index, sortData }: IProp) => {
    const [doubleArrowFlag, setDoubleArrow] = useState(false)
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const { activeKeyDouble } = useActiveKeyStore.getState();
    const [isShowHeader, setIsShowHeader] = useState(false);
    let { mg, ts } = useMatchDetailStore.getState();
    const { showAll } = useShowAll.getState();
    const checkExpend = (e: any) => {
        setActiveKey('double', e);
        setDoubleArrow(!doubleArrowFlag);
    }
    useEffect(() => {
        if (showAll) {
            setActiveKey('double', Array.from({ length: mg.length }, (_, index) => `${index}`));
        } else {
            setActiveKey('double', []);
        }
        setIsShowHeader(handleShowTitle(everyItem))
    }, [showAll]);
    return <div >

        <Collapse onChange={(e) => checkExpend(e)} activeKey={activeKeyDouble} >
            <Collapse.Panel key={`${index}`} title={<RenderTitle doubleArrowFlag={doubleArrowFlag} title={everyItem.nm} />} arrow={
                <div onClick={() => sortData(index)}>
                    {
                        everyItem.flag ? <img src={TopImg} width={20} height={20} ></img> : <img src={upArrow} width={20} height={20} />
                    }
                </div>
            } className={activeKeyDouble.includes(`${index}`) ? 'collPanel_expands' : 'collPanel_closes'}>
                <div className="box" >
                    {

                        isShowHeader ? (

                            <div className="title">
                                <div className="title-content">
                                    <img src={ts[0].lurl} width={20} height={20} />
                                    <span>{everyItem.mks[0].op[0].na}</span>
                                </div>
                                <div className="title-content">
                                    <img src={ts[1].lurl} width={20} height={20} />
                                    <span>{everyItem.mks[0].op[1].na}</span>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        everyItem.mks.length !== 0 ? (
                            <div className="list" >
                                {
                                    everyItem.mks.map((element, index) => {
                                        return (
                                            <div className="content" key={index} >
                                                {/* 主队 */}
                                                <div className="content-item" >
                                                    <CalculationPanel takePlay={everyItem.nm} nm={element.op[0].nm} id={element.id} au={element.au} ss={element.ss} od={element.op[0].od} ty={element.op[0].ty} />
                                                </div>
                                                {/* 客队 */}
                                                <div className="content-item" >
                                                    {

                                                        element.op && element.op[1] ? <CalculationPanel takePlay={everyItem.nm} id={element.id} au={element.au} ss={element.ss} nm={element.op[1].nm} ele={element} od={element.op[1].od} ty={element.op[1].ty} /> : <></>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : <></>
                    }

                </div>


            </Collapse.Panel>

        </Collapse>
    </div>
}

export default Double