import React, { useEffect, useMemo } from 'react';
import { useSportsContext } from '../../context/SportsProvider';
import classNames from 'classnames';
import { useUserStore } from '@/stores/user/useUserStore';

interface SportTabsProps {}

const list = [
	{
		type: 1,
		number: '',
		name: '滚球',
		nameVi: 'Trực tiếp',
		ssl: [],
	},
	{
		type: 3,
		number: '',
		name: '今日',
		nameVi: 'Hôm nay',
		ssl: [],
	},
	{
		type: 4,
		number: '',
		name: '早盘',
		nameVi: 'Sáng',
		ssl: [],
	},
	{
		type: 7,
		number: '',
		name: '冠军',
		nameVi: 'Vô địch',
		ssl: [],
	},
];

const BigTabs: React.FC<SportTabsProps> = () => {
	const [contextValue, dispatch] = useSportsContext();
	const { query, statistcsInfo } = contextValue;
	const locale = useUserStore((state) => state.locale);
	const { type } = query;

	const bigList = useMemo(() => {
		if (Object.keys(statistcsInfo).length === 0) {
			return list;
		}

		return list.map((item) => {
			const findItem = statistcsInfo.sl.find((innerItem) => innerItem.ty === item.type);
			if (findItem) {
				if (item.type !== 7) {
					item.number = String(findItem.tc);
					item.ssl = findItem.ssl.filter((innerItem) => innerItem.c > 0);
				}
				// item.name = findItem.des;
			}
			return item;
		});
	}, [statistcsInfo]);

	return (
		<div
			className={classNames('tabs', {
				isTop: true,
			})}
		>
			{bigList.map((item) => {
				return (
					<div
						className={type === item.type ? 'active tab' : 'tab'}
						key={item.name}
						onClick={() => {
							let extraData = {
								type: item.type,
								beginTime: null,
								endTime: null,
							};
							if (item.ssl.length > 0) {
								extraData['sportId'] = item.ssl[0].sid;
							}
							dispatch({
								type: 'UPDATE_QUERY',
								data: extraData,
							});
						}}
					>
						<span className="number">{item.number}</span>
						<span className="tab-name">{ locale.value === 'CMN' ? item.name : item.nameVi}</span>
					</div>
				);
			})}
		</div>
	);
};

export default BigTabs;
