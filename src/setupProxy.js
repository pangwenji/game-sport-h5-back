const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/game', {
            target: process.env.REACT_APP_PROXY_GAME,
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/': '', //需要rewrite的,
            },
            headers: {
                Connection: 'keep-alive',
            },
        }),
        createProxyMiddleware('/order', {
            target: process.env.REACT_APP_PROXY_ORDER,
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/order': '', //需要rewrite的,
            },
            headers: {
                Connection: 'keep-alive',
            },
            onProxyReq: (e) => {
            }
        }),
        createProxyMiddleware('/ag', {
            target: process.env.REACT_APP_PROXY_AG,
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/ag': '', //需要rewrite的,
            },
            headers: {
                Connection: 'keep-alive',
            },
            onProxyReq: (e) => {
            }
        }),
        createProxyMiddleware('/api', {
            target: process.env.REACT_APP_PROXY_API,
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/api': '', //需要rewrite的,
            },
            headers: {
                Connection: 'keep-alive',
            },
            onProxyReq: (e) => {
            }
        }),
    )
};
