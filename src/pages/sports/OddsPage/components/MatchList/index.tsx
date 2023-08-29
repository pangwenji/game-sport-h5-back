import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { WindowScroller, AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import ItemHeader from './componnets/ItemHeader';
import ItemContent from './componnets/ItemContent';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSportsContext } from '../../context/SportsProvider';
import { getMatchList } from '@/api/match';
import { useInView } from 'react-intersection-observer';
import { orderBy, throttle } from 'lodash';
import FullPageSpinner from '@/components/FullPageSpinner';
import { useNavigate } from 'react-router-dom';
import { useSportsStore } from '@/stores/sports';
import clx from 'classnames';
import _ from 'lodash';
import './new.scss';
import { useMatchDetailStore } from '@/stores/sports-detail';

const ActivityKeysContext = createContext<[any[], React.Dispatch<React.SetStateAction<any[]>>]>([[], () => { }]);
const VisiblePageIdxsContext = createContext<[any[], React.Dispatch<React.SetStateAction<any[]>>]>([[], () => { }]);

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 146,
});

function Collapsible({ children, item, id, onChange }) {
    const [activityKeys, setActivityKeys] = useContext(ActivityKeysContext);
    const [, setVisiblePageIdxs] = useContext(VisiblePageIdxsContext);
    const [contextValue, dispatch] = useSportsContext();
    const { query } = contextValue;
    const { type } = query;

    const navigate = useNavigate();
    const { ref, inView } = useInView();
    React.useEffect(() => {
        const currentInView = document.querySelectorAll('.accord-header');
        let curentInViewIds = Array.from(currentInView).map((item) => Number(item.className.split(' ')[1].replace('accord-header-', '')));
        // console.log('curentInViewIds', curentInViewIds)
        if (inView) {
            setVisiblePageIdxs(Array.from(new Set(curentInViewIds)));
        }
    }, [inView]);

    const expanded = useMemo(() => {
        let currentId = item.orderBy === 0 ? `${item.lg.id}-${item.bt}` : String(item.lg.id);
        return activityKeys.includes(currentId);
    }, [activityKeys]);

    useEffect(() => {
        onChange && onChange();
    }, [expanded, onChange]);

    const switchExpanded = () => {
        setActivityKeys((prev) => {
            let currentId = item.orderBy === 0 ? `${item.lg.id}-${item.bt}` : String(item.lg.id);
            if (prev.includes(currentId)) {
                return prev.filter((currentKey) => currentKey !== currentId);
            } else {
                return [...prev, currentId];
            }
        });
    };

    const goDetail = () => {

        useMatchDetailStore.setState({
            Marchid: item.id,
            haveVs: item.vs,
            haveAs: item.as,//是否有动画
            type: type,//类型
            sportId: item.sid//运动Id
        })
        navigate('/sports-detail');

    };

    return (
        <div className={!expanded ? 'content-wrap-contianer expanded' : 'content-wrap-contianer'}>
            <div ref={ref}></div>
            {item.isFirst && (
                <div className={`accord-header accord-header-${item.current}`} onClick={() => switchExpanded()}>
                    <ItemHeader item={item} expanded={expanded} />
                </div>
            )}
            {expanded && (
                <div className="content-wrap" onClick={goDetail}>
                    {children}
                </div>
            )}
        </div>
    );
}

function renderRow({ index, key, style, parent }) {
    const item = parent.props.list[index];
    return (
        <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
            {({ registerChild, measure }) => (
                <div
                    style={style}
                    className={clx('row accordContainer', {
                        'is-single': item.isSingle,
                        'is-first': item.isFirst,
                        'is-last': item.isLast,
                    })}
                    datatype={item.current}
                    ref={registerChild}
                >
                    <div className="row-item-wrap">
                        <Collapsible item={parent.props.list[index]} id={parent.props.list[index].id} onChange={measure}>
                            <div className="content">
                                <ItemContent item={item} key={item?.id} />
                            </div>
                        </Collapsible>
                    </div>
                </div>
            )}
        </CellMeasurer>
    );
}

function MatchList({ showAll }) {
    const updateIds = useSportsStore((state) => state.updateIds);
    const _windowScroller = React.useRef(null);
    const visiblePageIdxsState = useState([]);
    const [visiblePageIdxs] = visiblePageIdxsState;
    const keysState = useState([]);
    const [, setActivityKeys] = keysState;
    const [contextValue, dispatch] = useSportsContext();
    const { query, } = contextValue;
    const { orderBy, type } = query;

    const { status, data, error, refetch, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(
        ['matchList', query],
        async ({ pageParam = 1, queryKey }) => {
            const innerQuery: any = filterParams(queryKey[1]);

            const res: any = await getMatchList({ ...innerQuery, current: pageParam });

            const nextId = pageParam < res.data.pageTotal ? pageParam + 1 : null;
            const previousId = pageParam > -10 ? pageParam - 1 : null;

            return { ...res.data, nextId, previousId };
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
            // refetchInterval: 5000,
        }
    );

    const refetchPageIdxs = useMemo(() => {
        if (!data) return [];
        let current = data.pages[data.pages.length - 1].current;
        return Array.from(new Set([current].concat(visiblePageIdxs)));
    }, [data, visiblePageIdxs]);

    useEffect(() => {
        let timeInterval = type === 1 ? 4000 : 10000; // 不同类型的刷新时间不同
        const timerMy = setInterval(() => {
            refetch({
                refetchPage: (page: any) => {
                    let flag = refetchPageIdxs.includes(page?.current);
                    return flag;
                },
            });
        }, timeInterval);
        return () => clearInterval(timerMy);
    }, [refetchPageIdxs, type]);

    const remoteList = useMemo(() => {
        return status === 'success'
            ? data.pages.reduce((acc, page) => {
                if(page.records && page.records.length > 0) {
                    return [...acc, ...page.records.map((item) => ({ ...item, current: page.current, orderBy: orderBy }))];
                }
                return acc
            }, [])
            : [];
    }, [status, data, orderBy]);

    useEffect(() => {
        if (remoteList && remoteList.length > 0) {
            dispatch({ type: 'UPDATE_LISTS', lists: remoteList });
            updateIds(remoteList.map((item) => item.id));
            setTimeout(() => {
                dispatch({ type: 'CLEAR_PREVLISTS' });
            }, 3000);
        }
    }, [remoteList]);

    const transformList = useMemo(() => {
        const remoteListUniq = _.uniqBy(remoteList, 'id');

        const filterSet = new Set();
        const filterMap = new Map();

        remoteListUniq.forEach((item: any) => {
            const key = orderBy === 0 ? `${item.lg.id}-${item.bt}` : String(item.lg.id);
            filterSet.add(key);
            if (filterMap.has(key)) {
                filterMap.set(key, filterMap.get(key) + 1);
            } else {
                filterMap.set(key, 1);
            }
        });

        const fixList = remoteListUniq.map((item: any) => {
            const key = orderBy === 0 ? `${item.lg.id}-${item.bt}` : String(item.lg.id);
            let isFirst = filterSet.has(key) ? true : false;
            let isSingle = false;
            let isLast = false;

            if (isFirst) {
                filterSet.delete(key);
                if (filterMap.get(key) === 1) {
                    isSingle = true;
                }
            } else {
                if (filterMap.get(key) === 1) {
                    isLast = true;
                }
            }

            filterMap.set(key, filterMap.get(key) - 1);

            return {
                itemKey: key,
                isFirst: isFirst,
                isLast: isLast,
                isSingle: isSingle,
                ...item,
            };
        });
        return fixList;
    }, [remoteList, orderBy]);

    useEffect(() => {
        const allKeys = transformList.map((item) => {
            if (orderBy === 0) {
                return `${item.lg.id}-${item.bt}`;
            }
            return String(item.lg.id);
        });
        if (showAll) {
            setActivityKeys((prev) => Array.from(new Set([...prev, ...allKeys])));
        }
    }, [transformList, showAll, orderBy]);

    useEffect(() => {
        if (showAll) {
            setActivityKeys(transformList.map((item) => `${item.lg.id}-${item.bt}`));
        } else {
            setActivityKeys([]);
        }
    }, [showAll]);

    const onSrcoll = ({ scrollHeight, scrollTop, clientHeight }) => {
        if (clientHeight === 0 || scrollTop === 0) return;
        if (scrollHeight - scrollTop - clientHeight < 1000) {
            if (hasNextPage && !isFetching) {
                fetchNextPage({ pageParam: data.pages[data.pages.length - 1].nextId });
            }
        }
    };

    const throttleOnScroll = throttle(onSrcoll, 700);

    return (
        <VisiblePageIdxsContext.Provider value={visiblePageIdxsState}>
            <ActivityKeysContext.Provider value={keysState}>
                {isFetching && remoteList.length === 0 ? (
                    <FullPageSpinner />
                ) : (
                    <div className="main-match-list">
                        <WindowScroller ref={_windowScroller} scrollElement={window}>
                            {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
                                <div className="window-scroller-wrapper">
                                    <AutoSizer disableHeight>
                                        {({ width }) => (
                                            <div ref={registerChild}>
                                                <List
                                                    autoHeight
                                                    className="wraper-list-scroll"
                                                    list={transformList}
                                                    width={width}
                                                    height={height}
                                                    isScrolling={isScrolling}
                                                    onScroll={(event) => {
                                                        throttleOnScroll(event);
                                                        onChildScroll(event);
                                                    }}
                                                    deferredMeasurementCache={cache}
                                                    rowHeight={cache.rowHeight}
                                                    rowRenderer={renderRow}
                                                    rowCount={transformList.length}
                                                    scrollTop={scrollTop}
                                                    overscanRowCount={10}
                                                />
                                            </div>
                                        )}
                                    </AutoSizer>
                                </div>
                            )}
                        </WindowScroller>
                    </div>
                )}
            </ActivityKeysContext.Provider>
        </VisiblePageIdxsContext.Provider>
    );
}

export default MatchList;

let filterParams = (data) => {
    return Object.entries(data).reduce((curent, [key, val]) => {
        if (val !== null) {
            curent[key] = val;
        }
        return curent;
    }, {});
};
