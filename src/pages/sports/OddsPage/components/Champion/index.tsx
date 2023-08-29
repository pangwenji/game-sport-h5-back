import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSportsContext } from '../../context/SportsProvider';
import { getMatchList } from '@/api/match';
import './styles.scss';

const alphabet = Array.from(new Array(26), (ele, index) => {
	return String.fromCharCode(65 + index);
});

const ChampionList = () => {
	const [selectChar, setSelectChar] = useState('');
	const [contextValue] = useSportsContext();
	const navigate = useNavigate();
	const { query } = contextValue;
	const scrollRef = useRef(null);
	const refFlagScroll = useRef(false);

	const [list, setList] = useState([]);

	useEffect(() => {
		getMatchList({ ...query, current: 1, size: 200 }).then((res) => {
			setList(res.data.records);
		});
	}, [query]);

	const alphabetFinal = useMemo(() => {
		if (list.length > 0) {
			const collectFirstChar = list.reduce((accSet, cur) => {
				accSet.add(cur.firstChar);
				return accSet;
			}, new Set());
			let collectFirstCharArr = Array.from(collectFirstChar);
			return collectFirstCharArr;
		}
		return [];
	}, [list]);

	const finalList = useMemo(() => {
		if (alphabetFinal.length === 0) return [];
		return alphabetFinal.map((firstChar) => {
			return {
				firstChar: firstChar,
				list: list.filter((item) => item.firstChar === firstChar),
			};
		});
	}, [list, alphabetFinal]);

	const onSwitchScroll = (char) => {
		if (document.getElementById(char)) {
			setSelectChar(char);
			refFlagScroll.current = true;
			scrollRef.current.scrollTop = document.getElementById(char).offsetTop - 50;
			setTimeout(() => {
				refFlagScroll.current = false;
			}, 3000);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (scrollRef.current) {
				let sectionLi: any = document.querySelectorAll('.match-list-card .card-index-anchor');
				console.log('sectionLi', sectionLi);
				scrollRef.current.addEventListener('scroll', () => {
					if (refFlagScroll.current) return;
					const scrollTop = scrollRef.current.scrollTop;
					for (let i = 0; i < sectionLi.length; i++) {
						if (sectionLi[i]?.offsetTop - scrollTop <= 30) {
							setSelectChar(sectionLi[i].id);
						}
					}
				});
			}
		});
	}, [list]);

	const goDetail = (matchId) => {
		navigate('/champion-bet', {
			state: { matchId: matchId },
		});
	};

	return (
		<div className="champion-list">
			<p className="index-bar-title">全部联赛A-Z</p>
			<div className="main-match-list-champion scroll-top-list OUTRIGHT">
				<div className="van-index-bar index-bar">
					<div className="van-index-bar-sidebar">
						{alphabetFinal.map((char: string, index) => {
							return (
								<span
									key={index}
									onClick={() => {
										onSwitchScroll(char);
									}}
									className={selectChar === char ? 'van-index-bar-index-active van-index-bar-index' : 'van-index-bar-index'}
								>
									{char}
								</span>
							);
						})}
					</div>
					<div className="match-list-card" ref={scrollRef}>
						{finalList.map((item: any) => {
							return (
								<div key={item.firstChar}>
									<div className="card-index-anchor" id={item.firstChar}>
										{item.firstChar}
									</div>
									{item.list.map((innerItem, index) => {
										return (
											<div
												className="league"
												key={index}
												onClick={() => {
													goDetail(innerItem.id);
												}}
											>
												<div className="league-icon">
													<img src={innerItem.lg.lurl} />
												</div>
												<span className="league-name">{innerItem.nm}</span>
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChampionList;
