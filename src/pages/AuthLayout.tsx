import { Suspense, useEffect } from 'react';
import { useLoaderData, useOutlet, Await, Navigate, redirect, useRouteLoaderData, useFetcher } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/auth-context';
import FullPageSpinner from '@/components/FullPageSpinner';
import AppBar from '@/components/tabs';

export function AuthStatus() {
	// Get our logged in user, if they exist, from the root route loader data
	let { userName } = useRouteLoaderData('root') as { userName: string | null };

	let fetcher = useFetcher();

	if (!userName) {
		return <p style={{ color: 'red' }}>You are not logged in.</p>;
	}

	let isLoggingOut = fetcher.formData != null;

	return (
		<div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
			<div style={{ width: '95px' }}>
				<p >Welcome</p>
				<p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{userName}!</p>
			</div>
			{/* <fetcher.Form method="post" action="/logout">
				<button type="submit" disabled={isLoggingOut} style={{ backgroundColor: '#ffb77c', borderRadius: '5px' }}>
					{isLoggingOut ? 'Signing out...' : 'Sign out'}
				</button>
			</fetcher.Form> */}
		</div>
	);
}

export const UnauthorizedLayout = () => {
	const { user } = useAuth();
	const outlet = useOutlet();
	// if (user) {
	// 	return <Navigate to="/dashboard/profile" replace />;
	// }
	return <>{outlet}</>;
};

export function protectedLoader({ request }) {
	if (localStorage.getItem('userName') == null) {
		let params = new URLSearchParams();
		params.set('from', new URL(request.url).pathname);
		return redirect('/login?' + params.toString());
	}
	return null;
}

export const AuthorizedLayout = () => {
	const { user, userToken } = useAuth();
	const outlet = useOutlet();

	// if (!userToken) {
	// 	return <Navigate to="/login" />;
	// }

	return <>{outlet}</>;
};

export const AuthLayout = () => {
	const outlet = useOutlet();
	const { userPromise, fbLanguageFileData } = useLoaderData() as any;

	return (
		<Suspense fallback={<FullPageSpinner />}>
			<Await
				resolve={userPromise}
				errorElement={<div>Something went wrong!</div>}
				children={(user) => (
					<AuthProvider userData={user} fbLanguageFileData={fbLanguageFileData}>
						{outlet}
						<AppBar />
					</AuthProvider>
				)}
			/>
		</Suspense>
	);
};
