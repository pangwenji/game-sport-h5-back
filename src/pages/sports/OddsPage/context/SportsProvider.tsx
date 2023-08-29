import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { MatchItemRes, MatchListApiReq, MatchStatisticsApiRes } from '@/enums/sports/matchTypes';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import fetchMatchLists from './fetchMatchLists';
import fetchMatchStatistical from './fecthStatistical';
import { getMatchStatistical } from '@/api/match';

interface statistcsItem {
	ty: number;
	tc: number;
	des: string;
}
interface SportList {
	selectedSportId: number; // 选中赛事类型
	marketType: number; // 选中玩法类型
	query: MatchListApiReq;
	prevLists: MatchItemRes[];
	lists: MatchItemRes[];
	statistcsInfo?: MatchStatisticsApiRes;
}

const initialQuery = {
	beginTime: null,
	endTime: null,
	type: 1,
	current: 1,
	size: 10,
	oddsFormat: 1,
	orderBy: 0,
	isPC: false,
	sportId: 1, // 1, 足球， 3，篮球，
	sportIds: [],
	// languageType: 'CMN',
};

export const SportsContext = createContext<[SportList, (action) => void]>([
	{
		selectedSportId: 1, // 足球
		marketType: 1000, // 足球让球
		query: {},
		prevLists: [],
		lists: [],
		statistcsInfo: {},
	},
	() => {},
]);

export const useSportsContext = () => useContext(SportsContext);

const sportsReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_LISTS': {
			return { ...state, prevLists: state.lists, lists: action.lists };
		}
		case 'CLEAR_PREVLISTS': {
			return { ...state, prevLists: [] };
		}
		case 'UPDATE_STATISTCSINFO': {
			// 赛事统计
			return { ...state, statistcsInfo: action.statistcsInfo };
		}
		case 'UPDATE_SELECTSPORTID': {
			return { ...state, selectedSportId: action.selectedSportId };
		}
		case 'UPDATE_MARKETTYPE': {
			return { ...state, marketType: action.marketType };
		}
		case 'UPDATE_QUERY': {
			const data = { ...state, query: { ...state.query, ...action.data } };
			return data;
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

export const PokemonCacheProvider = (props) => {
	const [cache, dispatch] = useReducer(sportsReducer, { lists: [], statistcsInfo: {}, query: initialQuery, selectedSportId: 1, marketType: 1000, prevLists: [] });

	// 赛事统计
	const matchStatistcsResult = useQuery({
		queryKey: ['matchStatistcs'],
		queryFn: async () => {
		  const res = await getMatchStatistical({
		  })
		  return res.data
		},
		// Refetch the data every second
		refetchInterval: 5000,
	  }
	);

	const statistcsInfo = matchStatistcsResult.data ?? {};

	useEffect(() => {
		if (Object.keys(statistcsInfo).length > 0) {
			dispatch({ type: 'UPDATE_STATISTCSINFO', statistcsInfo: statistcsInfo });
		}
	}, [statistcsInfo]);

	return <SportsContext.Provider value={[cache, dispatch]} {...props} />;
};
