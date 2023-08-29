import './style.scss';

const ItemHeader = ({ item, expanded }) => {
	return (
		<div className="item-header-match">
			<div className="league-name">
				<div className="league-name-box">
					<img src={item.lg.lurl} />
					<p>{item.lg.na}</p>
				</div>
				<img style={{ width: '20px', transition: 'transform 400ms', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/doubleTriangle.svg" />
			</div>
		</div>
	);
};

export default ItemHeader;
