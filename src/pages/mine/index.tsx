import React from 'react';
import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

const Mine: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div>
				我的
				<Button color="primary" fill="solid" onClick={() => navigate('/sports-detail')}>
					Solid
				</Button>
			</div>
		</div>
	);
};

export default Mine;
