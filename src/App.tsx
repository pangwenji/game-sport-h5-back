import 'lib-flexible';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
