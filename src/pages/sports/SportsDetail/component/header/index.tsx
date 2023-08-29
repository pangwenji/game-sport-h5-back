import React, { useState, useRef, useEffect, } from "react";
import './header.scss';
import { DownOutline, LeftOutline } from 'antd-mobile-icons'
import { Dropdown } from "antd-mobile";
import { DropdownRef } from 'antd-mobile/es/components/dropdown'
import Left from '@/assets/images/sports/img/left-0.png';
import right from '@/assets/images/sports/img/right-0.png';
import MarchPanel from "./march-panel";
import FileOutLine from "@/components/fileline";
import { getList } from "@/api/event_details";
import { useHistoryStore, useMatchDetailStore } from "@/stores/sports-detail";
import { useNavigate } from 'react-router-dom';
import snowflake from '@/assets/images/sports/svg/snowflake.svg'
import { checkTheMarchIsProgress, getListInfo, handleScore, processTimeShip, showMarchTime } from "@/hooks/useBettings";
interface IProp {
    ref?: any,
    className?: string
    title?: string,
    isShowMatch?: boolean
}

export type listProp = {
    current?: number
    pageTotal?: number
    records?: Array<any>
    size?: number
    total?: number
}

export type resultProp = {
    code: number,
    data: listProp,
    success?: boolean
}
const Header: React.FC<IProp> = ({ title, isShowMatch }: IProp) => {

    let { ts, nsg, mg, mc, lg, bt, fmt, type, sportId } = useMatchDetailStore.getState();
    const navigate = useNavigate();
    const dropDownRef = useRef<DropdownRef>(null)
    const [show, setShow] = useState(false);
    const [point, setScorePoint] = useState([]);
    const [sessionStatus, setSessionStatus] = useState('');
    const [time, setTime] = useState(null);
    const [activeKey, setActiveKey] = useState('');
    const showListDetail = async () => {
        setShow(!show);
        if (!show) {
            let records = await getListInfo({
                type: type,
                sportId: 1,
                current: sportId,
            })
            if (records.length > 0) {
                useHistoryStore.setState({
                    list: records
                })
            }
            setActiveKey('all')
        } else {
            setActiveKey('')
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    const close = () => {
        setShow(false);
        dropDownRef.current.close();

    }

    useEffect(() => {
        if (mg.length > 0) {
            setScorePoint(handleScore(nsg, mg[0].mty, 5))//设置比分;
        }
        if (mc) {
            setSessionStatus(checkTheMarchIsProgress(mc));
        }
        const timer = setInterval(() => setTime((prevTime: number) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, [])
    return (
        <div id='header'   >
            <div className={isShowMatch ? 'header-active' : 'header-cxt'}  >
                <div className="main-left" onClick={goBack}>
                    <LeftOutline width={23} height={28} color="#ffffff" />
                </div>

                {
                    isShowMatch ? <div className="march-score">

                        <div className="home-name">
                            {ts[0].na}
                            <img src={ts[0].lurl} width={35} height={35} />
                        </div>
                        <div className="score">
                            {
                                point.length > 0 ? (
                                    <>
                                        <span>{point[0]}</span>
                                        <span style={{ marginLeft: '10px', marginRight: '10px' }}>{"-"}</span>
                                        <span>{point[1]}</span>
                                    </>
                                ) : null
                            }
                        </div>
                        <div className="home-name">
                            <img src={ts[1].lurl} width={35} height={35} />
                            {ts[1].na}
                        </div>
                    </div> : <div className="header-panels" onClick={() => showListDetail()}>
                        {/* <div><img src={snowflake} width={20} height={20} /></div> */}
                        <Dropdown
                            ref={dropDownRef}
                            className="right-dropdown"
                            arrow={<DownOutline
                                width={20}
                                height={20}
                                color="#ffffff"
                            ></DownOutline>}>
                            <Dropdown.Item key='1' title={<p className="text" > {lg?.na} </p>}>
                                <MarchPanel close={close} />
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                }


                <div className="main-right">
                    <FileOutLine />
                </div>
            </div>
            {
                isShowMatch ? (
                    <div className="scroll-header">

                        <div className="process">
                            {
                                mc && mc.s ? <>{showMarchTime(mc, bt, fmt, time)}</> : null
                            }
                        </div>

                    </div>
                ) : null
            }
        </div>
    )
}

export default Header;