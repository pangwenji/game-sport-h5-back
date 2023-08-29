import React from 'react';
import LeagueHeader from './MatchHead';
import MatchInfo from './MatchInfo';
import './style.scss'

const ItemContent = ({ item }) => {
	
	return (
		<div className='item-content'>
            <LeagueHeader item={item} />
			<MatchInfo item={item} />
		</div>
	);
};

export default ItemContent;
