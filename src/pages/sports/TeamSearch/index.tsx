import React, { useEffect, useState } from 'react';
import { SearchBar, Checkbox, Space, Button } from 'antd-mobile';
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import './styles.scss';
import FilterLst from './FilterLst';
import { getOnSaleLeagues } from '@/api/match';

export async function loader(data) {
	const { params } = data;
	return {
		detail: {
			matchId: params.matchId,
		},
	};
}

const SearchTeam = () => {
	const [active, setActive] = useState(1);
	const [value, setValue] = useState<string[]>([]);
	const [visible, setVisible] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { detail } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	const { state } = location;
	console.log('contact', detail)
	console.log('state', state)

	useEffect(() => {
		getOnSaleLeagues({
			sportId: 1,
			type: 1,
			languageType: "CMN"
		}).then((res) => {
		});
	}, [])

	return (
		<div className="search-team">
			<div className="bb-h5-nav">
				<div
					className="left"
					onClick={() => {
						navigate('/sports');
					}}
				>
					<div className="back">
						<div className="icon normal"></div>
					</div>
				</div>
				<div className="icon title center">
					<div className="filter-popup-tabs">
						<div
							className={active === 1 ? 'title active search-title' : 'title search-title'}
							onClick={() => {
								setActive(1);
							}}
						>
							搜索
						</div>
						<div
							className={active === 2 ? 'title active filter-title' : 'title filter-title'}
							onClick={() => {
								setActive(2);
							}}
						>
							联赛筛选4
						</div>
					</div>
				</div>
				<div className="right"></div>
			</div>
			{active === 1 && (
				<div className="leagues-search show">
					<div className="search">
						<div className="search-bar-content">
							<div className="active-sport">足球</div>
							<div className="search-input">
								<SearchBar
									placeholder="请输入内容"
									style={{
										'--height': '1.18rem',
									}}
								/>
							</div>
						</div>
						<div className="search-history">
							<div className="search-history-top">
								<div className="label">历史搜索</div>
								<div className="clear-icon">
									<img src={'https://s3.ap-southeast-1.amazonaws.com/superspace.click/svgexport-25.svg'} />
								</div>
							</div>
						</div>
					</div>
					<div className="hot-search-list">
						<p className="hot-title">热门搜索</p>
						{[1, 2, 3].map((item, index) => {
							return (
								<div className="hot-search-item" key={index}>
									<img src="https://static.fastbs55.com/data/5f13614aa7e60e5f0a3d7d85963651e4.png" />
									<span>2023女子世界杯 (在澳大利亚&新西兰)</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
			{active === 2 && (
				<div className="all-leagues">
					<div className="team-lists">
						<FilterLst />
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchTeam;
