import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSportsContext } from '../../context/SportsProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';

const ScrollList = () => {
	const [contextValue, dispatch] = useSportsContext();
	const { fbLanguageFile } = useAuth();
	const { statistcsInfo, query } = contextValue;
	const { type, sportId } = query;
	const navigate = useNavigate();
	const scrollRef = React.useRef(null);

	useEffect(() => {
		scrollRef.current.scrollLeft = 0
	}, [type])

	const getSidName = useCallback(
		(sid) => {
			if (!fbLanguageFile) return null;
			return fbLanguageFile['sports'][sid];
		},
		[fbLanguageFile]
	);

	const finalList = useMemo(() => {
		if (Object.keys(statistcsInfo).length === 0) return [];
		const currentTab = statistcsInfo.sl.find((item) => item.ty === type);
		return currentTab.ssl.filter((innerItem) => innerItem.c > 0);
	}, [statistcsInfo, type]);

	return (
		<div className="list-content">
			<div className="list" ref={scrollRef} id="scrollRefId">
				{finalList.map((item, index) => {
					return (
						<p
							className={item.sid === sportId ? 'active sport-tab-item' : 'sport-tab-item'}
							key={item.sid}
							onClick={() => {
								dispatch({
									type: 'UPDATE_QUERY',
									data: {
										sportId: item.sid,
									},
								});
							}}
						>
							<b className="count">
								{getSidName(item?.sid)}
								<span className="small">{item.c}</span>
							</b>
							{index === 0 && (
								<span className="living-icon">
									<img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/hot-red.svg" />
								</span>
							)}
						</p>
					);
				})}
			</div>
			{type !== 7 && (
				<div className="switch">
					<div
						className="img-content"
						onClick={() => {
							navigate(`/sports/search/1497926`, { state: { type: 1 } });
						}}
					>
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF+SURBVHgB7ZZvbcMwEMXfhqAQDkIhhEkDYQwaBguDmkEzBIFQCBmDjsHmqE51duO/Omv5kJ90alKfn58tK3fAA9Ix6rjr+E2Iq5njQ0SPMgR43D3mxPSuBSJLjCvGxPT4ACEOObt0EdF7M3/w9xRCc0T03rFRdmO57MZy2Y3lMhv7Ye+UMCeWI6Y3l4HSEjLU1CNstIgvYtcMgRHxtkdSb2enGgTZnp/T6Oh1TGz+TcclpkGQ/VwsHHR8JuicfQLSPf9i6raSP8E+uSUuayI8gRCHYJ/aGsrJ6YxZrtE5a3cIGEslNIec8WNAp4W9gUPqIiXGFAKnsELvy5c2xu8WIU7D8ofURUqM8Yueq/ecs7VG8dnL1TD2bX4JzmX20LDnqsa+2PNHQn7LnhUfkL5jjTN+CuicYd8v4oO8HBHiEOKb6fH6ZT865pWT89KmjygvSQP8qAK9E5wTqFHEZ7oEDRUzV6tHn/N6M2cyMcKun23I3H/Twt78pmjxMNb/Acc5qX8TE77MAAAAAElFTkSuQmCC"
							className="icon"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ScrollList;

const sportTypeList = [
	{
		key: 1,
		name: '足球',
		number: '',
	},
	{
		key: 3,
		name: '篮球',
		number: '',
	},
	{
		key: 177,
		name: '电竞足球',
		number: '',
	},
	{
		key: 178,
		name: '电竞篮球',
		number: '',
	},
	{
		key: 5,
		name: '网球',
		number: '',
	},
	{
		key: 13,
		name: '排球',
		number: '',
	},
	{
		key: 15,
		name: '乒乓球',
		number: '',
	},
];
