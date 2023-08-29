import 'lib-flexible';
import { createBrowserRouter, defer, redirect, useRouteError } from 'react-router-dom';
import { AuthLayout, AuthorizedLayout, protectedLoader, UnauthorizedLayout } from '@/pages/AuthLayout';

import Square from '@/pages/square';
import Login, { loginAction } from '@/pages/mine/Login';
import SettingsPage from '@/pages/mine/Settings';
import ProfilePage from '@/pages/mine/Profile';
import Game from '@/pages/game';
import Sports from '@/pages/sports';
import ChargePage from '@/pages/mine/Charge';
import Nodes from '@/pages/notes';
import Mine from '@/pages/mine';
import SportsDetail from '@/pages/sports/SportsDetail';
import ChampionBet from '@/pages/sports/OddsPage/components/Champion/ChampionBet';

import TeamSearch, { loader as TeamSearchLoader } from '@/pages/sports/TeamSearch';
import EventAnnouncements from '@/pages/notes/eventAnnouncements';

export const localStorageKey = 'token';

const getUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userToken = window.localStorage.getItem('userToken');
            resolve(userToken);
        }, 0);
    });
};

const getFbLanguageFile = () => {
    return new Promise((resolve) => {
        const fbLanguageFile = window.localStorage.getItem('FB_LANGUAGE_FILE');
        resolve(fbLanguageFile);
    });
};

export function RootErrorBoundary() {
    let error = useRouteError() as Error;
    return (
        <div>
            <h1>Uh oh, something went terribly wrong 😩</h1>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <button onClick={() => (window.location.href = '/')}>Click here to reload the app</button>
        </div>
    );
}

interface AuthProvider {
    isAuthenticated: boolean;
    username: null | string;
    signin(username: string): Promise<void>;
    signout(): Promise<void>;
}

export const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        async loader() {
            let fbLanguageFileData = await getFbLanguageFile();
            return defer({
                userName: localStorage.getItem('userName'),
                userPromise: getUserData(),
                fbLanguageFileData,
            });
        },
        element: <AuthLayout />,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                element: <UnauthorizedLayout />,
                children: [
                    {
                        index: true,
                        async loader() {
                            return redirect('/sports');
                        },
                    },
                    {
                        path: 'square',
                        element: <Square />,
                    },
                    {
                        path: 'games',
                        element: <Game />,
                    },
                    {
                        path: 'sports',
                        element: <Sports />,
                    },
                    {
                        path: 'notes',
                        element: <Nodes />,
                    },
                    {
                        path: 'mine',
                        element: <Mine />,
                    },
                    {
                        path: 'login',
                        action: loginAction,
                        element: <Login />,
                    },
                    {
                        path: '/logout',
                        async action() {
                            // We signout in a "resource route" that we can hit from a fetcher.Form
                            // await fakeAuthProvider.signout();
                            localStorage.removeItem('userName');
                            return redirect('/');
                        },
                    },
                    {
                        path: 'sports/search/:matchId',
                        element: <TeamSearch />,
                        loader: TeamSearchLoader,
                    },
                    {
                        path: 'champion-bet',
                        element: <ChampionBet />,
                    },
                ],
            },
            {
                element: <AuthorizedLayout />,
                loader: protectedLoader,
                children: [
                    {
                        path: 'sports-detail',
                        element: <SportsDetail />,
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'settings',
                        element: <SettingsPage />,
                    },
                    {
                        path: 'charge',
                        element: <ChargePage />,
                    },
                    {
                        path: 'event-announcements',
                        element: <EventAnnouncements />,
                    },
                ],
            },
        ],
    },
]);
