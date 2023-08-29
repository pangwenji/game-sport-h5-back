import React, { useRef, useState, useEffect } from "react";
import { Empty } from "antd-mobile";
import './settle.scss'
import '../unSettle/un-settle.scss'
import { useNotesStore } from "@/stores/notes";
import SettlePanel from "../../settlePanel";
import { WindowScroller, AutoSizer, List, CellMeasurer, InfiniteLoader } from 'react-virtualized';
import { throttle } from 'lodash'
import { cache, fetchGameBetByChannel } from "@/hooks/useNotes";
let countPage: number = 1;
const Settle: React.FC = () => {
    let [list, setList] = useState([])
    const listRef = useRef(null);
    let { timesShip, betTotalAmount, winOrLoss, orderNumber, settleList } = useNotesStore.getState()
    let params = {
        data: {
            isSettled: true,//是否结算 未结算
            currencyId: 1000,//币种
            startTime: timesShip.startTime,//开始时间
            endTime: timesShip.endTime,//结束时间
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
                        <SettlePanel item={row} index={index} isShowButton={false} />
                    </div>
                </div>
            )}
        </CellMeasurer>
    }

    const onSrcoll = ({ scrollHeight, scrollTop, clientHeight }) => {


    };

    const getGameBetByChannel = async () => {
        let array = await fetchGameBetByChannel(params, 'settle');
        setList(array);
    }

    const throttleOnScroll = throttle(onSrcoll, 700);

    //  判断数据是否快要滚动完毕
    const isRowLoaded = ({ index }) => {
        return !!list[index]
    }

    // 加载更多的数据,当数据快要被滚动完毕时执行 
    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        console.log(startIndex, '看一下数据')
        console.log(stopIndex, 'stopIndex')
    }

    useEffect(() => {
        getGameBetByChannel()
        let timer = setInterval(() => getGameBetByChannel(), 5000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        getGameBetByChannel();
    }, [])
    return <div>
        <div className="money-level" >
            <span>
                总计 <span>{orderNumber}</span> 单，投注额  <span>{betTotalAmount}</span> 元，输赢 <span>{winOrLoss}</span>元
            </span>
        </div>
        {
            list && list.length > 0 ?
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    rowCount={list.length}
                    loadMoreRows={loadMoreRows}
                >

                    {({ onRowsRendered, registerChild }) => (

                        <WindowScroller scrollElement={window}>
                            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                <div className="scroll" >
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
                                                    overscanRowCount={120}
                                                    rowCount={list.length}
                                                    deferredMeasurementCache={cache}
                                                    rowHeight={cache.rowHeight}
                                                    rowRenderer={_rowRenderer}
                                                    scrollTop={scrollTop}
                                                    width={width}
                                                    onRowsRendered={onRowsRendered}
                                                />
                                            </div>
                                        )}
                                    </AutoSizer>
                                </div>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
                : <div className="data-empty">
                    <Empty description='暂无数据' />
                </div>
        }
    </div>
}

export default Settle