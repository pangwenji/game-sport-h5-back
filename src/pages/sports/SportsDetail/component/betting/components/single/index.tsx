import { Collapse, Input } from "antd-mobile"
import { useState, PropsWithChildren, useEffect } from "react";
import RenderTitle from "../render_title";
import upArrow from '@/assets/images/sports/svg/up_arrow.svg';
import './single.scss'
import CalculationPanel from "../calculation_panel";
import TopImg from '@/assets/images/sports/svg/top.svg'
import { handleSingleData } from "@/hooks/useBettings";
import { changesShowKeyboardStatus, setActiveKey, useActiveKeyStore, useHistoryStore, useMatchDetailStore, useShowAll } from "@/stores/sports-detail";
import { resultMgType } from "@/interface";
import SpanRight from "../render_span_right";

interface IProp {
    everyItem: resultMgType
    sortData?: (e) => void
    index: number
}
const Single: React.FC<PropsWithChildren<IProp>> = ({ everyItem, index, sortData }: IProp) => {
    const [doubleArrowFlag, setDoubleArrow] = useState(false)
    const [visible, setVisible] = useState(false);
    const { activeKeySingle } = useActiveKeyStore.getState();
    let [list, setList] = useState([]);
    let { disable } = useHistoryStore.getState()
    const { showAll } = useShowAll.getState();
    let { mg } = useMatchDetailStore.getState();
    const checkExpend = (e: any) => {
        setActiveKey('single', e)
        setDoubleArrow(!doubleArrowFlag)
    }

    useEffect(() => {
        setList(handleSingleData(everyItem.mks))
        if (showAll) {
            setActiveKey('single', Array.from({ length: mg.length }, (_, index) => `${index}`));
        } else {
            setActiveKey('single', []);
        }
    }, [
        list.length,
        showAll
    ])
    return <div  >

        <Collapse onChange={(e) => checkExpend(e)} activeKey={activeKeySingle}>
            <Collapse.Panel key={`${index}`} title={<RenderTitle doubleArrowFlag={doubleArrowFlag} title={everyItem.nm} />} arrow={
                <div onClick={() => sortData(index)}>
                    {
                        everyItem.flag ? <img src={TopImg} width={20} height={20} ></img> : <img src={upArrow} width={20} height={20} />
                    }
                </div>
            } className={activeKeySingle.includes(`${index}`) ? 'collPanel_expands' : 'collPanel_closes'}>
                {
                    everyItem.mks.length > 0 ? (
                        everyItem.mks[0].op.map((options, index) => {
                            return (
                                <CalculationPanel takePlay={everyItem.nm} id={everyItem.mks[0].id} au={everyItem.mks[0].au} ss={everyItem.mks[0].ss} nm={options.nm} od={options.od} ty={options.ty} key={index} />
                            )
                        })
                    ) : null
                }
            </Collapse.Panel>
        </Collapse>
    </div>
}

export default Single