import { createContext, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getLanguageFileStreamByType } from '@/api/match';
import { getI18n } from 'react-i18next';

const langMap = {
    zh: 'CMN',
    vi: 'VIE',
    en: 'ENG',
};

const AuthContext = createContext({
    user: null,
    userToken: null,
    fbLanguageFile: null,
    currentLangage: 'CMN'
});

export const AuthProvider: React.FC<React.PropsWithChildren<{ userData: any; fbLanguageFileData: any }>> = ({ children, userData, fbLanguageFileData }) => {
    const [user, setUser] = useLocalStorage('user', userData);
    const [userToken, setUserToken] = useLocalStorage('userToken', userData);
    const [fbLanguageFile, setFbLanguageFile] = useLocalStorage('FB_LANGUAGE_FILE', fbLanguageFileData);
    const navigate = useNavigate();

    const lang = getI18n();
    const currentLangage = useMemo(() => {
        return langMap[lang.language];
    }, [lang.language]);

    const login = async (data) => {
        setUser(data);
        setUserToken('mytoken');
        navigate('/profile', { replace: true });
    };

    const logout = () => {
        setUser(null);
        setUserToken(null);
        navigate('/', { replace: true });
    };

    useEffect(() => {
        getLanguageFileStreamByType({
            // languageType: 'CMN',
        }).then((res) => {
            setFbLanguageFile(res?.data);
        })
    }, []);

    const value = useMemo(
        () => ({
            userToken,
            user,
            fbLanguageFile,
            login,
            logout,
            currentLangage
        }),
        [user, userToken, fbLanguageFile, currentLangage]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
