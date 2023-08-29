import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DetailType } from './detailType';
import FullPageSpinner from '@/components/FullPageSpinner';
import FileOutLine from '@/components/fileline';
import { getMatchDetail } from '@/api/event_details';
import { getOnSaleLeagues } from '@/api/match';
import dayjs from 'dayjs';
import './ChampionBet.scss';

const ChampionBet = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location;

	const [isLoading, setIsLoading] = useState(false);
	const [isActive, setIsActive] = useState('');
	const [detail, setDetail] = useState<DetailType>({});

	useEffect(() => {
		if (state.hasOwnProperty('matchId')) {
			const { matchId } = state;
			fetchMarchDetail(1149183);
		}
	}, [state]);

	const fetchMarchDetail = async (matchId) => {
		setIsLoading(true);
		let result: any = await getMatchDetail({
			languageType: 'CMN',
			matchId: matchId,
		});
		if (result?.data && result.data?.mg) {
			setDetail(result.data);
		}
		setIsLoading(false);
	};

	const goBack = () => {
		navigate('/sports');
	};

	if (isLoading) return <FullPageSpinner />;

	return (
		<div className="match-outright-list-wrap">
			<div className="page-head-wrap">
				<div className="bb-h5-nav">
					<div className="left">
						<div className="back" onClick={goBack}>
							<span className="icon"></span>
						</div>
					</div>
					<div className="center-title">
						<div className="title-text">{detail?.nm}</div>
					</div>
					<div className="right">
						<FileOutLine />
					</div>
				</div>
			</div>
			<div className="timer-bar">
				<span className="label">冠军投注</span>
				<span className="value">截止 {dayjs(detail.bt).format('YYYY-MM-DD HH-mm')}</span>
			</div>
			<div className="scroller-wrap">
				<div className="scroller">
					{detail?.mg?.map((item) => {
						return (
							<div key={item.nm}>
								<div className="is-title">
									<div className="mkt-name">{item.nm}</div>
								</div>
								{item.mks.map((innerItem, innerIndex) => {
									let opItem = innerItem.op.length > 0 ? innerItem.op[0] : null;
									return (
										<div className={innerIndex === item.mks.length - 1 ? 'is-option is-items-end' : 'is-option'} key={innerIndex}>
											<div
												className={isActive === opItem?.nm ? 'option-item is-active' : 'option-item'}
												onClick={() => {
													setIsActive(opItem?.nm);
												}}
											>
												<div className="icon">
													<img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/bb.png" />
												</div>
												<span className="name">{opItem ? opItem.nm : null}</span>
												<span className="odd">{opItem ? opItem.od : null}</span>
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ChampionBet;
