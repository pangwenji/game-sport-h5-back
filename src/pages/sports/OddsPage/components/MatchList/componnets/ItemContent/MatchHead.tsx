import React, { useEffect, useMemo, useState } from 'react';
import './style.scss';
import { useAuth } from '@/context/auth-context';
import { sec_to_time } from '@/utils';
import { getCurrentSc } from './utils';
import { useSportsContext } from '@/pages/sports/OddsPage/context/SportsProvider';
import dayjs from 'dayjs';

const MatchHead = ({ item }) => {
	const { fbLanguageFile } = useAuth();
	const [time, setTime] = useState(0);
	const [contextValue] = useSportsContext();
	const { query } = contextValue;
	const { type, sportId } = query;

	useEffect(() => {
		const timer = setInterval(() => setTime((prevTime: number) => prevTime + 1), 1000);
		return () => {
			setTime(0);
			clearInterval(timer);
		};
	}, [item]);

	// 获取比赛阶段
	const macthPeriod = useMemo(() => {
		if (type === 1) {
			if (!fbLanguageFile) {
				return null;
			}
			return fbLanguageFile['matchPeriod'][item.mc.pe];
		}
		if (type === 3) return null;
		return null;
	}, [item, fbLanguageFile]);

	// 角球比分
	const cornerKickScore = useMemo(() => {
		return getCurrentSc(item.nsg, 1000, 6);
	}, [item]);

	// 半场比分
	const halfScore = useMemo(() => {
		return getCurrentSc(item.nsg, 1002, 5);
	}, [item]);

	// 比赛时间
	const countTime = useMemo(() => {
		if (type === 1) {
			if (!item.mc.s) return null;
			return sec_to_time(item.mc.s + time);
		}
		if ([3, 4].includes(type)) {
			return dayjs(item.bt).format('MM-DD HH:mm');
		}
		return null;
	}, [item, type, time]);

	const matchVideo = useMemo(() => {
		if (type === 1) {
			if (item?.lg?.hot) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/hot-red.svg';
			}
			if (item?.as) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/svg-new.svg';
			}
			if (item?.vs?.have) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/video-play.svg';
			}
		}
		if (type === 3) {
			if (item?.lg?.hot) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/hot-grey.svg';
			}
			if (item?.as) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/svg-new.svg';
			}
			if (item?.vs?.have) {
				return 'https://s3.ap-southeast-1.amazonaws.com/superspace.click/video.svg';
			}
		}
		return null;
	}, [item, type]);

	const matchScore = useMemo(() => {
		if (sportPeriod.hasOwnProperty(sportId)) {
			return sportPeriod[sportId]
				.map((period) => {
					return getCurrentSc(item.nsg, period);
				})
				.filter((innerItem) => !!innerItem);
		}
		return [];
	}, [sportId, item]);

	return (
		<div className="item-header-match">
			<div className={[1, 6, 46, 177, 1001].includes(sportId) ? "match-head football" : "match-head"}>
				<div className="basic">
					<div className="match-head-bg">
						<div className="time playing">
							<span className="match-period">{macthPeriod}</span>&nbsp;<span className={
								type === 1 ? "match-time is-active" : "match-time"
							}>{countTime}</span>
						</div>
						{matchVideo && <img style={{ marginLeft: '3px', width: '18px', height: '18px', marginBottom: '1px' }} src={matchVideo} />}
					</div>
					<div className="period-score">
						{matchScore.map((item, index) => {
							return (
								<span key={index}>
									{item[0]}-{item[1]}
								</span>
							);
						})}
					</div>
				</div>

				{item.ne === 1 && <img style={{ marginLeft: '1px', marginBottom: '1px' }} src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/new-item.svg" />}

				{cornerKickScore && (
					<div className="football-corner-content">
						<img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/redFlag.png" />
						<span>
							{cornerKickScore[0]}-{cornerKickScore[1]}
						</span>
					</div>
				)}

				<div className="to-detail-area">
					<div className="ht-soccer-area">
						{halfScore && (
							<p className="ht-text">
								<b>HT</b>
								<span className="ht-soccer">
									{halfScore[0]}-{halfScore[1]}
								</span>
							</p>
						)}
					</div>
					<div className="to-detail">{item.tms}&gt;</div>
				</div>
			</div>
		</div>
	);
};

export default MatchHead;

let sportPeriod = {
	3: [3005, 3006, 3007, 3008, 3009], // 篮球
	5: [5002, 5003, 5004, 5005, 5006], // 网球
	6: [6002, 6003, 6004, 6005, 6006], // 美式足球
};
