import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './language/zh/index.json';
import adon_zh from './language/zh/adon.json';
import vi from './language/vi/index.json'
import adon_vi from './language/vi/adon.json';
const langue = {
    zh: {
        translation: {
            ...zh,
            adon: adon_zh
        }
    },
    vi: {
        translation: {
            ...vi,
            adon: adon_vi
        }
    }
}
//https://www.i18next.com/overview/configuration-options 配置信息
i18n.use(initReactI18next).init({
    resources: langue,
    lng: 'zh',
    interpolation: {
        escapeValue: false, // 避免escape passed in values to avoid XSS injection
    }
})

export default i18n;