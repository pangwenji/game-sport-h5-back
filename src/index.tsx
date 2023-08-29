import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/queryClient';
import App from './App';

import './i18n/index';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools position="bottom-left" />
	</QueryClientProvider>
);
