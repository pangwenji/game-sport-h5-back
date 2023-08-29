
export type emoticonProp = Array<{
    characters: string[],
}>

export const generateEmoticon = () => {
    return [
        {
            characters: ['😀', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😶', '😚', '😋', '😛', '😜', '🤪', '🤑'],
        },
        {
            characters: ['🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '🙄', '😬', '🤥', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧'],
        },
        {
            characters: ['🥵', '🥶', '😵', '🥳', '😎', '🧐', '🥺', '😭', '😓', '😤', '🤬', '😡', '💋', '💔', '❤️', '☠️', '😈', '🤡'],

        },
        {
            characters: ['💩', '🙈', '💣', '👍', '👎', '🤝', '✌️', '👌', '🙏', '👊', '💪', '💯', '🌹', '🥀', '🍻', '🎁', '🧧', '🛀']

        }
    ]
}

export const sec_to_time = (s: number) => {
    let t;
    if (t > 5400) return '90:00';
    if (s > -1) {
        let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60 + hour * 60;
        let sec = s % 60;
        if (min < 10) { t = "0"; }
        t = min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
    }
    return t;
}

export const checkoutStatus = (err): string => {
    if (err && err.response?.status) {
        switch (err.response.status) {
            case 400:
                return "请求错误(400)";
            case 401:
                return "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            case 403:
                return "拒绝访问(403)";
            case 404:
                return "请求出错(404)";
            case 408:
                return "请求超时(408)";
            case 500:
                return "服务器错误(500)";
            case 501:
                return "服务未实现(501)";
            case 502:
                return "网络错误(502)";
            case 503:
                return "服务不可用(503)";
            case 504:
                return "网络超时(504)";
            case 505:
                return "HTTP版本不受支持(505)";
            default:
                return `连接出错(${err.response.status})!`;
        }
    }
}
