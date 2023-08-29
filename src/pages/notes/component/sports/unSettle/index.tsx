import { marqueedata } from "@/hooks/notes/sports/useSports";
import { Empty, } from "antd-mobile";
import Marquee from "react-fast-marquee";
import horn from '@/assets/images/sports/svg/horn.svg';
import { useEffect, useRef, useState, } from "react";
import SettlePanel from "../../settlePanel";
import './un-settle.scss'
import { cache, fetchGameBetByChannel } from "@/hooks/useNotes";
import dayjs from 'dayjs';
import { useNotesStore } from "@/stores/notes";
import { throttle } from 'lodash'
import { WindowScroller, AutoSizer, List, CellMeasurer, InfiniteLoader } from 'react-virtualized'
import EventNotify from "../../eventNotify";
import { pageData } from "@/interface";

let countPage: number = 1;
let pageStatus: 'nextPage' | 'lastPage' = 'lastPage'
const UnSettle = () => {
    let [list, setList] = useState([])
    let time = {
        startTime: new Date(`${dayjs().startOf('date')}`).getTime(),
        endTime: new Date(`${dayjs().endOf('date')}`).getTime()
    }

    const listRef = useRef(null);
    let params = {
        data: {
            isSettled: false,//是否结算 未结算
            currencyId: 1000,//币种
            startTime: time.startTime,//开始时间
            endTime: time.endTime,//结束时间
            languageType: "CMN",
            userName: localStorage.getItem('userName'),
        },
        current: countPage,
        size: 50
    }


    const _rowRenderer = ({ index, key, style, parent }) => {
        let row = list[index]
        return <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>

            {({ registerChild, measure }) => (
                <div style={style} ref={registerChild}
                >
                    <div style={{ width: '100%' }}>
                        <SettlePanel item={row} index={index} isShowButton={true} />
                    </div>
                </div>
            )}
        </CellMeasurer>
    }


    const onSrcoll = ({ scrollHeight, scrollTop, clientHeight }) => {
        if (clientHeight === 0 || scrollTop === 0) return;
        let BottomDistance = Number(parseFloat(`${scrollHeight - scrollTop - clientHeight}`).toFixed(0))
        let { totalPage } = useNotesStore.getState()
        if (BottomDistance === -0 && totalPage > 1) {
            // params.current++;
            countPage++;
            getGameBetByChannel()
            pageStatus = 'nextPage';
        }
        let TopDistance = Number(parseFloat(`${scrollTop}`).toFixed(0))
        if (TopDistance === 414 && pageStatus == 'nextPage') {
            // params.current--;
            countPage--;
            getGameBetByChannel()
            pageStatus = 'lastPage';
        }

    };

    const throttleOnScroll = throttle(onSrcoll, 700);
    const getGameBetByChannel = async () => {
        let array = await fetchGameBetByChannel(params, 'unSettle');
        setList(array)
    }
    useEffect(() => {
        getGameBetByChannel()
        let timer = setInterval(() => getGameBetByChannel(), 5000)
        return () => clearInterval(timer)
    }, [])


    //  判断数据是否快要滚动完毕
    const isRowLoaded = ({ index }) => {
        return !!list[index]
    }

    // 加载更多的数据,当数据快要被滚动完毕时执行 
    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        console.log(startIndex, 'start')
        console.log(stopIndex, 'stopIndex')
    }


    //初始化
    useEffect(() => {
        getGameBetByChannel();
    }, [])
    return <div className="list-unSettle">
        <div className="ann">
            <EventNotify />
        </div>
        {
            list && list.length > 0 ?
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    rowCount={list.length}
                    loadMoreRows={loadMoreRows}
                >
                    {
                        ({ onRowsRendered, registerChild }) => (

                            <WindowScroller scrollElement={window}>
                                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                    <div className="WindowScrollerWrapper" >
                                        <AutoSizer disableHeight>
                                            {({ width }) => (
                                                <div ref={registerChild}>
                                                    <List
                                                        ref={listRef}
                                                        autoHeight
                                                        list={list}
                                                        className="rowList"
                                                        height={height}
                                                        isScrolling={isScrolling}
                                                        onScroll={
                                                            (event) => {
                                                                throttleOnScroll(event)
                                                                onChildScroll(event)
                                                            }
                                                        }
                                                        overscanRowCount={5}
                                                        rowCount={list.length}
                                                        deferredMeasurementCache={cache}
                                                        rowHeight={cache.rowHeight}
                                                        rowRenderer={_rowRenderer}
                                                        scrollTop={scrollTop}
                                                        onRowsRendered={onRowsRendered}
                                                        width={width}
                                                    />
                                                </div>
                                            )}
                                        </AutoSizer>
                                    </div>
                                )}
                            </WindowScroller>
                        )}
                </InfiniteLoader>
                :
                <div className="data-empty">
                    <Empty description='暂无数据' />
                </div>
        }
    </div>
}

export default UnSettle