import React, { useCallback, useEffect, useState } from 'react';
import { FlyOut } from './components';
import MatchList from './components/MatchList';
import './styles.scss';
import { useSportsContext } from './context/SportsProvider';

const Sports: React.FC = () => {
	const [showAll, setShowAll] = useState(true);

	const switchShowAll = useCallback(() => {
		setShowAll(!showAll);
	}, [showAll]);

	useEffect(() => {
		const header = document.querySelector('.fixed-filter');
		const toggleClass = 'is-sticky';

		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;
			if (currentScroll > 200) {
				header.classList.add(toggleClass);
			} else {
				header.classList.remove(toggleClass);
			}
		});
	}, []);

	return (
		<div className="bb-h5">
			<FlyOut>
				<FlyOut.TopBanner />
				<div className="sport-page">
					<div className="fixed-filter-wrap">
						<div className="fixed-filter">
							<div className="sport-menu">
								<FlyOut.BigTabs />
								<FlyOut.SportType />
							</div>
							<FlyOut.FilterList switchShowAll={switchShowAll} showAll={showAll} />
						</div>
					</div>
					<FlyOut.RenderList showAll={showAll} />
				</div>
			</FlyOut>
		</div>
	);
};

export default Sports;
