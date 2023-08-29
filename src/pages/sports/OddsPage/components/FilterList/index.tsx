import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSportsContext } from '../../context/SportsProvider';
import { Dropdown } from 'antd-mobile';
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/user/useUserStore';

interface FilterListProps {
	switchShowAll: Function;
	showAll: boolean;
}

const getWeek = (perDay) => {
	const week = ['日', '一', '二', '三', '四', '五', '六'];
	return '星期' + week[perDay];
};

const getAfterWeekDates = () => {
	let arr = [];
	let currentDay = dayjs();
	for (var i = 1; i < 8; i++) {
		// if (dayjs().startOf('week').add(i, 'day').isAfter(dayjs())) {
		// }
		let perDay = currentDay.add(i, 'day');
		arr.push({
			date: perDay.format('MM-DD'),
			week: getWeek(perDay.day()),
			perDay: perDay,
		});
	}

	return arr;
};

const FilterList: React.FC<FilterListProps> = ({ switchShowAll, showAll }) => {
	const [contextValue, dispatch] = useSportsContext();
	const { query, marketType } = contextValue;
	const { orderBy, type, sportId } = query;
	const [isMounted, setIsMounted] = useState(false);
	const dropdownRef = useRef(null);
	const locale = useUserStore((state) => state.locale);

	const [isShowFilterDate, setIsShowFilterDate] = useState(false);

	const [date, setDate] = useState('');

	const selfTabList = useMemo(() => {
		if (bigTablist.hasOwnProperty(sportId) && isMounted) {
			setTimeout(() => {
				dispatch({ type: 'UPDATE_MARKETTYPE', marketType: bigTablist[sportId][0].id });
			});
			return bigTablist[sportId];
		}

		if (isMounted) {
			setTimeout(() => {
				dispatch({ type: 'UPDATE_MARKETTYPE', marketType: Number(`${sportId}001`) });
			});
		}

		return [
			{
				id: Number(`${sportId}001`),
				name: '大/小',
				nameVi: 'Over/Under',
			},
			{
				id: Number(`${sportId}002`),
				name: '独赢',
				nameVi: '1x2',
			},
		];
	}, [sportId, isMounted]);

	useEffect(() => {
		setIsMounted(true);
	}, []);


	const showAllTitle = useMemo(() => {
		return locale.value === 'CMN' ? '全部' : 'All';
	}, [locale]);

	const showTimeTitle = useMemo(() => {
		return locale.value === 'CMN' ? '时间' : 'Time';
	}, [locale]);

	const showLeagueTitle = useMemo(() => {
		return locale.value === 'CMN' ? '联赛' : 'League';
	}, [locale]);

	if (type === 7) return null;

	return (
		<div className={isShowFilterDate ? 'filter-list-container show-date-filter' : 'filter-list-container'}>
			<div className="filter-list">
				<div className="filter-item">
					<div className={type === 4 ? 'filter-switch filter-switch-date have-date' : 'filter-switch filter-switch-date'}>
						<div className="all">
							<span>{type === 4 && date ? date : showAllTitle}</span>
							{type === 4 && (
								<Dropdown
									arrow={null}
									onChange={(activeKey) => {
										setIsShowFilterDate(activeKey ? true : false);
									}}
									closeOnClickAway={true}
									ref={dropdownRef}
								>
									<Dropdown.Item
										key="1"
										title={
											<div className="date-svg-wrapper">
												<img className="date-svg" src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/date.svg" />
											</div>
										}
									>
										<div className="dropdown-wraper-date-wrap">
											<div className="dropdown-wraper-date">
												<p
													className={'' === date ? 'date-item active' : 'date-item'}
													onClick={() => {
														setDate('');
														dropdownRef.current.close();
														dispatch({
															type: 'UPDATE_QUERY',
															data: {
																beginTime: null,
																endTime: null,
															},
														});
													}}
												>
													{showAllTitle}
												</p>
												{getAfterWeekDates().map((item) => {
													return (
														<p
															className={item.date === date ? 'date-item active' : 'date-item'}
															key={item.date}
															onClick={() => {
																setDate(item.date);
																dropdownRef.current.close();
																dispatch({
																	type: 'UPDATE_QUERY',
																	data: {
																		beginTime: dayjs(item.perDay).startOf('date').valueOf(),
																		endTime: dayjs(item.perDay).endOf('date').valueOf(),
																	},
																});
															}}
														>
															<i>{item.date}</i>
															<b>{item.week}</b>
														</p>
													);
												})}
											</div>
										</div>
									</Dropdown.Item>
								</Dropdown>
							)}
						</div>
					</div>
					<div className="filter-switch">
						<div
							className="switch-arrow"
							onClick={() => {
								dispatch({
									type: 'UPDATE_QUERY',
									data: {
										orderBy: orderBy === 0 ? 1 : 0,
									},
								});
							}}
						>
							<div className={!orderBy ? 'left active' : 'left'}>{showTimeTitle}</div>
							<img className={!orderBy ? 'arrow to-right' : 'arrow'} src="https://m.bebo5555.com/spa/sport-h5/b5be4027a385be43a5221d86c737b0b3.svg" />
							<div className={!orderBy ? 'right' : 'right active'}>{showLeagueTitle}</div>
						</div>
					</div>
				</div>
				<div className="play-list">
					{selfTabList.map((item) => {
						return (
							<div
								key={item.id}
								onClick={() => {
									dispatch({ type: 'UPDATE_MARKETTYPE', marketType: item.id });
								}}
								className={item.id === marketType ? 'play-item active' : 'play-item'}
							>
								{ locale.value === 'CMN' ? item.name : item.nameVi }
							</div>
						);
					})}
				</div>
			</div>
			<div
				className="switch"
				onClick={() => {
					switchShowAll();
				}}
			>
				<div className="img-content">
					<img style={{ width: '20px', transform: !showAll ? 'rotate(180deg)' : 'rotate(0deg)' }} src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/doubleTriangle.svg" />
				</div>
			</div>
		</div>
	);
};

export default FilterList;

let bigTablist = {
	1: [
		{
			id: 1000,
			name: '让球',
			nameVi: 'Handicap',
		},
		{
			id: 1007,
			name: '大/小',
			nameVi: 'Over/Under',
		},
		{
			id: 1005,
			name: '独赢',
			nameVi: '1x2',
		},
		{
			id: 1009,
			name: '角球',
			nameVi: 'Corner',
		},
	],
	177: [
		{
			id: 177001,
			name: '让球',
			nameVi: 'Handicap',
		},
		{
			id: 177002,
			name: '大/小',
			nameVi: 'Over/Under',
		},
		{
			id: 177003,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	178: [
		{
			id: 178001,
			name: '让球',
			nameVi: 'Handicap',
		},
		{
			id: 178002,
			name: '大/小',
			nameVi: 'Over/Under',
		},
		{
			id: 178003,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	3: [
		{
			id: 3002,
			name: '让球',
			nameVi: 'Handicap',
		},
		{
			id: 3003,
			name: '大/小',
			nameVi: 'Over/Under',
		},
		{
			id: 3004,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	4: [
		{
			id: 4001,
			name: '让盘',
			nameVi: 'Handicap',
		},
		{
			id: 4003,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	5: [
		{
			id: 5004,
			name: '让盘',
			nameVi: 'Handicap',
		},
		{
			id: 5001,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	6: [
		{
			id: 5004,
			name: '让盘',
			nameVi: 'Handicap',
		},
		{
			id: 5001,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	8: [
		{
			id: 8001,
			name: '让球',
			nameVi: 'Handicap',
		},
		{
			id: 8002,
			name: '大/小',
			nameVi: 'Over/Under',
		},
	],
	13: [
		{
			id: 13002,
			name: '让分',
			nameVi: 'Handicap',
		},
		{
			id: 13001,
			name: '独赢',
			nameVi: '1x2',
		},
	],
	19: [
		{
			id: 19002,
			name: '独赢',
			nameVi: '1x2',
		},
		{
			id: 19001,
			name: '大/小',
			nameVi: 'Over/Under',
		},
	],
	7: [
		{
			id: 7001,
			name: '让分',
			nameVi: 'Handicap',
		},
		{
			id: 7002,
			name: '大/小',
			nameVi: 'Over/Under',
		},
		{
			id: 7003,
			name: '独赢',
			nameVi: '1x2',
		},
	],
};
