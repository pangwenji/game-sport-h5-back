import { Button, Checkbox, Space } from 'antd-mobile';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';

const FilterLst = () => {
	const [value, setValue] = useState<string[]>([]);
	const [selectChar, setSelectChar] = useState('');
	const scrollRef = useRef(null);
	const refFlagScroll = useRef(false);
	const [visible, setVisible] = useState(false);

	const alphabetFinal = useMemo(() => {
		return bigList.map((item) => item.char);
	}, [bigList]);

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
		if (scrollRef.current) {
			let sectionLi: any = document.querySelectorAll('.match-list-card .card-index-anchor');
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
	}, []);

	return (
		<>
			<Checkbox.Group
				value={value}
				onChange={(val) => {
					setValue(val as string[]);
					setVisible((prevVisible) => !prevVisible);
				}}
			>
				<div className="league-search">
					<div className="champion-list">
						<p className="index-bar-title">全部联赛A-Z</p>
						<div className="main-match-list-champion scroll-top-list OUTRIGHT">
							<div className="van-index-bar index-bar">
								<div className="van-index-bar-sidebar">
									{alphabetFinal.map((char, index) => {
										return (
											<span
												data-index={char}
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
									{bigList.map((item) => {
										return (
											<div key={item.char}>
												<div className="card-index-anchor" id={item.char}>
													{item.char}
												</div>
												{item.list.map((innerItem, index) => {
													return (
														<div className="checkbox-wrap" key={index}>
															<Checkbox value={innerItem.id} key={index}>
																<div className="league">
																	<div className="league-icon">
																		<img src={innerItem.lurl} />
																	</div>
																	<span className="league-name">{innerItem.na}</span>
																</div>
															</Checkbox>
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
				</div>
			</Checkbox.Group>
			<CSSMotion visible={visible}>
				{({ className, style }) => (
					<div className={classNames('filter-footer', className)} style={style}>
						<Space direction="horizontal">
							<Checkbox value="apple">全选</Checkbox>
							<Checkbox value="orange">反选</Checkbox>
						</Space>
						<div className="right-confirm">
							<span className="right-title">8个联赛</span>
							<Button  fill="solid">
								确定
							</Button>
						</div>
					</div>
				)}
			</CSSMotion>
		</>
	);
};

export default FilterLst;

let bigList = [
	{
		char: '2',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'A',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'B',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'C',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'D',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'E',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'F',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
	{
		char: 'G',
		list: [
			{
				id: '1',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '2',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '3',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '4',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
			{
				id: '5',
				lurl: 'https://static.fastbs55.com/data/d3f5f046051379ab70c97f5d6ba88f9b.png',
				na: '2023女子世界杯',
			},
		],
	},
];
