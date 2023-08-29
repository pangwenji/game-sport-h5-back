import React from 'react';
import { Form, LoaderFunctionArgs, redirect, useActionData, useLocation, useNavigation } from 'react-router-dom';
import { createMemberApi } from '@/api/user';
import './style.scss';

export async function loginAction({ request }: LoaderFunctionArgs) {
	let formData = await request.formData();
	let userName = formData.get('userName') as string | null;

	// Validate our form inputs and return validation errors via useActionData()
	if (!userName) {
		return {
			error: 'You must provide a userName to log in',
		};
	}

	// Sign in and redirect to the proper destination if successful.
	try {
		await createMemberApi({userName: userName, channelType: 1})
		localStorage.setItem('userName', userName);
		// await login({ username, password: 'password' });
	} catch (error) {
		// Unused as of now but this is how you would handle invalid
		// username/password combinations - just like validating the inputs
		// above
		return {
			error: 'Invalid create user attempt',
		};
	}

	let redirectTo = formData.get('redirectTo') as string | null;
	return redirect(redirectTo || '/');
}

export async function loginLoader() {
	if (localStorage.getItem('token') != null) {
		return redirect('/');
	}
	return null;
}

const Login: React.FC = () => {
	let location = useLocation();
	let params = new URLSearchParams(location.search);
	let from = params.get('from') || '/';

	let navigation = useNavigation();
	let isLoggingIn = navigation.formData?.get('userName') != null;

	let actionData = useActionData() as { error: string } | undefined;

	return (
		<div className="login-container">
			<Form method="post" replace>
				<input type="hidden" name="redirectTo" value={from} />
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<label style={{ height: '40px', fontSize: '19px' }}>
						<span className="label-title">用户名</span>
					</label>
					<input className="input-name" name="userName" autoComplete="off" />
				</div>

				<div style={{ display: 'flex', justifyContent: 'center', height: '40px', marginTop: '20px' }}>
					<button className="login-submit" type="submit" disabled={isLoggingIn}>
						{isLoggingIn ? 'Logging in...' : '登陆'}
					</button>
				</div>

				{actionData && actionData.error ? <p style={{ color: 'red' }}>{actionData.error}</p> : null}
			</Form>
		</div>
	);
};

export default Login;
