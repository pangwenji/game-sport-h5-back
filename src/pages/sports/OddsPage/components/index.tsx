import TopBanner from './TopBanner';
import BigTabs from './BigTabs';
import SportType from './SportType';
import FilterList from './FilterList';
import MatchList from './MatchList';
import Champion from './Champion';

import { PokemonCacheProvider, useSportsContext } from '../context/SportsProvider';

const RenderList = ({ showAll }) => {
	const [contextValue] = useSportsContext();

	const { query } = contextValue;
	const { type } = query;

	return <>{type === 7 ? <Champion /> : <MatchList showAll={showAll}/>}</>;
};

const FlyOut = (props) => {
	return (
		<PokemonCacheProvider>
			{props.children}
		</PokemonCacheProvider>
	);
};

FlyOut.TopBanner = TopBanner;
FlyOut.BigTabs = BigTabs;
FlyOut.SportType = SportType;
FlyOut.FilterList = FilterList;
FlyOut.RenderList = RenderList;

export { FlyOut };
