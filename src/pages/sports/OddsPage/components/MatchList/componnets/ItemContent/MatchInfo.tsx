import React, { useMemo } from 'react';
import { useSportsContext } from '@/pages/sports/OddsPage/context/SportsProvider';
import { getCurrentSc, getMks } from './utils';

import {
    //是否串关
    useIsSelectSeriesStore,
    useBetOptionListStore,
    updatedBetOptionListStatus,
    useBetMatchMarketListStore,
} from "@/stores/bet";
// import { useMatchDetailStore } from "@/stores/sports-detail";


const defaultImg = 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/bb.png';

const MatchInfo = ({ item }) => {
    const [contextValue] = useSportsContext();
    const { marketType, prevLists, query } = contextValue;
    const { type, orderBy, sportId } = query;


    const updateBetMatchMarketList = useBetMatchMarketListStore((state) => state.updateBetMatchMarketList);
    // let { Marchid } = useMatchDetailStore.getState()
    let { betOptionList } = useBetOptionListStore.getState()
    let { betMatchMarketList } = useBetMatchMarketListStore.getState()
    let { isSelectSeries } = useIsSelectSeriesStore.getState()
    const betOptionListArr = betOptionList;
    const betMatchMarketListArr = betMatchMarketList;


    // 所获黄牌
    const yellowCardScore = useMemo(() => {
        return getCurrentSc(item.nsg, marketType, 7);
    }, [item]);

    // 实时比分
    const realTimeScore = useMemo(() => {
        return getCurrentSc(item.nsg, marketType, 5);
    }, [item]);

    // 当前玩法赔率
    const currentOp = useMemo(() => {
        return getMks(item.mg, marketType)?.op;
    }, [item, marketType]);

    // 当前玩法ID
    const currentId = useMemo(() => {
        return getMks(item.mg, marketType)?.id;
    }, [item, marketType]);

    // 上一次数据玩法赔率
    const prevOp = useMemo(() => {
        if (prevLists.length === 0) return null;
        const findItem = prevLists.find((innerItem) => innerItem.id === item.id);
        if (!findItem) return null;
        return getMks(findItem.mg, marketType)?.op;
    }, [prevLists, item, marketType, orderBy]);

    const allScore = useMemo(() => {
        return getCurrentSc(item.nsg, 5001);
    }, [sportId, item]);

    const openBetting = (innerItem: any) => {


        //如果是串关状态
        if (isSelectSeries) {
            betOptionListArr.push({ marketId: currentId, matchId: item.id, odds: innerItem.od, optionType: innerItem.ty, oddsFormat: 1 })
            updatedBetOptionListStatus(betOptionListArr);
            betMatchMarketListArr.push({ marketId: currentId, matchId: item.id, type: innerItem.ty })
            updateBetMatchMarketList(betMatchMarketListArr);
            console.log("==betOptionList==", betOptionList)
            console.log("==betMatchMarketList==", betMatchMarketList)
        }
    }


    return (
        <div className="main-info">
            <div className="main-info-center">
                <div className="team-item-info">
                    <p className="home">
                        <img alt="" className="logo" src={item.ts[0]?.lurl ? item.ts[0]?.lurl : defaultImg} />
                        <b className="name">{item.ts[0]?.na}</b>
                        <span className="for-football">{yellowCardScore && <i className="yellow-card">{yellowCardScore[0]}</i>}</span>
                    </p>
                    <p className="away">
                        <img alt="" className="logo" src={item.ts[1]?.lurl ? item.ts[1]?.lurl : defaultImg} />
                        <b className="name">{item.ts[1]?.na}</b>
                        <span className="for-football">{yellowCardScore && <i className="yellow-card">{yellowCardScore[1]}</i>}</span>
                    </p>
                </div>

                {type === 1 && (
                    <div className="score-area">
                        <p className="home">
                            <span className="score">{realTimeScore && realTimeScore[0]}</span>
                        </p>
                        <p className="away">
                            <span className="score">{realTimeScore && realTimeScore[1]}</span>
                        </p>
                    </div>
                )}

                <div className="markets-wrap">
                    <div className="markets">
                        <div className="handicap-item">
                            <div className="options len22">
                                {currentOp.map((innerItem, index) => {
                                    let isCompare = 0;
                                    if (prevOp && innerItem) {
                                        let prevOd = prevOp[index];
                                        if (innerItem?.od && prevOd?.od) {
                                            isCompare = innerItem?.od > prevOd?.od ? 1 : innerItem?.od < prevOd?.od ? -1 : 0;
                                        }
                                    }
                                    return (
                                        <div className="option-item" key={index} onClick={(event) => {
                                            event.stopPropagation();
                                            openBetting(innerItem);
                                        }}>
                                            <div className="name">{innerItem?.nm}</div>
                                            <div className="odd">
                                                {innerItem ? (
                                                    <>
                                                        {innerItem.od}
                                                        {isCompare !== 0 && <img className="odd-change odd-up" src={isCompare === 1 ? 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/up-arrow.png' : 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/down-arrow.png'} />}
                                                    </>
                                                ) : (
                                                    <img
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                        src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/lock.svg"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {[5].includes(sportId) && allScore && (
                <div className="main-set">
                    <div className="match-format">
                        三盘二胜&nbsp; |&nbsp;总分{allScore[0]}-{allScore[1]}({allScore[0] + allScore[1]})
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchInfo;
