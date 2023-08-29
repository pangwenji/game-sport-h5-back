import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { getCurrentSc } from '../MatchList/componnets/ItemContent/utils';

interface SliderItemProps {
	sportItem: {
		id: number;
		sportTitle: string;
		beginTime: string;
		home: {
			img: string;
			name: string;
		};
		away: {
			img: string;
			name: string;
		};
	};
}

const TeamItem = ({ item }) => {
	return (
		<div className="team-banner">
			<div className="top home">
				<div className="team-wrapper">
					<img src={item?.lurl} alt="logo" className="team-logo" />
					<div className="team-name home">{item?.na}</div>
				</div>
			</div>
		</div>
	);
};

const SliderItem = ({ sportItem }) => {
	// 角球比分
	const cornerKickScore = useMemo(() => {
		return getCurrentSc(sportItem.nsg, 1000, 6);
	}, [sportItem]);

	// 半场比分
	const halfScore = useMemo(() => {
		return getCurrentSc(sportItem.nsg, 1002, 5);
	}, [sportItem]);

	return (
		<div className="top-match">
			<div className="content-slider-content">
				<div className="match-detail relative flex items-center justify-between">
					<TeamItem item={sportItem.ts[0]} />
					<div className="time-score">
						<div className="league">
							<div className="league-name">{sportItem.lg.na}</div>
						</div>
						<div className="vs">VS</div>
						<div className="time-content">
							<div className="anchor-status">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAcCAYAAAATFf3WAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAXjSURBVHgBlVhPbJVFEJ/5+oQEQmkv6kHC0wQSMLGFRGLigUoiifFQ8OhBWpUDXhRJIF6kmBipkVRD/BMJtg/0XKqJHNBQ1IMxxD5IJAaVPtIDB0z6qH9oG74dZ3d2dvd972uRbd57+83+md/M/GZ2vyL8j3bixFd9OcEuAthOhtYTmW5jyI0ZY4CIwD7zH5ncILlm0MnIfmQeADVZVjc51BHuTAwN7Z28m25cbvDTk2cHMqTDvGlVgVgtuYAAAWLByXMERB60SfrybNEa97H25NcNZUNvv/Vy7Z4Ajo6erQJm47xRj1dOBUVoNWnfyKD1mG1YAMZWkfemATsE5NaAzmdBI180Tw0P72sUsWRFQe3zb/ZA1jHFa3vtYpW7jdyzyOKzfRBDEQEtrrhG+t7x+ouWHZQ6iKiadcDUoUOf9C8LsPbFuX6T52OsuMur0LAqUJKP/UEZQCQGBpEBaXMGIKCC9Khi3AJU/u6CjMYPvvHRnnSHMHV09DxbkU+x47s0HAVekQunCaApcs/AihUV2LzpYZhfWICrV2fg9u0F50EfbgzcNI6DLola9zeuz0hnERa3Dg/vb1glleDKSn6eJ3VB8L4LV7BUlETrE3c5ad/2LfDo5qoTdK5ZBd//cFm9pfs4LjqXkO4Rt9A+97oNVca5u8Xhsl+nTn07wENVr9jzDEmBiAwTPlnPBK/YAVrbuTpYs+6h+1UxKv/8ng6Bl1M0Hin4RPq9Bw5+sCcAZPlhsRYTpgjdxGOo3lDLW7NfMhGKTUCIdzTKTlsAHBJId0YBz6HPYcgBPH36XB9muD6YQmqVeC1mIiGVYBDk7eiEAnaNGP3gA93YtXa1lKTWnFNwxSyrvnZgpK9CmPVDUk4UjIRUrBHPJkSPVqB3UUk9FbLZJN/59DbY9vgmJx2rfY3XGjfIT9BS5MIvfRP3MrArY3Fvq9UpSEbFcbV8C2plW0iYjg5FG0A1AmDjxnVB2tuzwcdb1CF6YpLVFWqsTM5ge8aZ3eu3I+8pkIXuAGlRhi31DFNrsD36Ki4bcaM+n8WBWor83uArTzVjpV1ht4T8elIkiyg9EVJOFrmZpOeSY5FCSHIcunIFhaxfW9GNdDkRJR5D0uPM/q7h+ra7/0m3yY8/XYFfrjTYSpd50O694HGCQta3JlCunkTVH0uQwYwfmtFDqYupRZltPY89AhZkZ+cqeGLbJl+iEWiJKEqCQWkCRU9hmY/liGRsGce4EQfsbpE3yenhZCtX3temyV2bCkowUVQOnpKpWvuCSJzu/I71jOWTlESZQEGhj3U8SbDEWoT2ELuFsmk5PB/JyOuEDuomdB6sZ5DhGdDjLSG1ck94GJOmTJmsbccBULzHxGZLSgmNlIfONqzARPbC8zsusKxBMbBxjQelIV4SHPgjtogBVWk7Pr+DPxBitED5BzD9/nv7J91ZzPXmCGLxDhl4qCGGpRSV3AO9FyDJyDimpSqCVA7GUpYBHbE9B3BwcOcYD9RjmgdLfPF2iUM3/2wGNXNz/4JeZqyrZmZuhrFbt/4J4O1vs/l3GLs2fSM93xM+RlrxkumRkddrthfug1wun+NZP3O3W01LLw9WX/3SHzA/v+hKzVT9N0hr18WLv0Kz+Rdn+gq4dPn3llPnzJffcYnaALPNOajXr+oxR3JX1CTTKNMs32h3tIRI28nRswNc1T8refFxeP3tV8YsM3Irl1t263wTTpGlXqDkhcmEOaLDOEcdO7b/jGJqeSd5afCZMZ6xm6wVEH0bvAmRyWT0NCiUGIpcFhL6+XE8TS60V3/PpCbLB1NwbQBt2/visxPmTsdW3mVaDDcYwkWuFCHFEqL1rg0cxG6478XfeEO3tZ6/pvKOfOvIsVdrRTylqantw4/HB3jKm6x4vQ+t81huKH0PBvkvgr5kgQ+dXqkcBUiiazAJu119nR+PvPvOK7WlMCwLUNvx4+N9zJJ+1tfDNOk1/HKl3GznXSL3Bpj4BjfLA9fZwAssnDh6dN/k3XT/B/sAl1cpeuYWAAAAAElFTkSuQmCC" />
							</div>
							<div className="match-time in-play">{dayjs(sportItem.bt).format('MM-DD HH-MM')}</div>
						</div>
						<div className="details">
							<div className="corner">
								{cornerKickScore && (
									<>
										<img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/redFlag.png" className="icon" />
										<span>
											{cornerKickScore[0]}-{cornerKickScore[1]}
										</span>
									</>
								)}
							</div>
							{halfScore && (
								<div className="half">
									<img src='https://s3.ap-southeast-1.amazonaws.com/superspace.click/half.png' className="icon" />
									<span>
										{halfScore[0]}-{halfScore[1]}
									</span>
								</div>
							)}
						</div>
					</div>
					<TeamItem item={sportItem.ts[1]} />
				</div>
			</div>
		</div>
	);
};

export default SliderItem;
