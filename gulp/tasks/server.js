export const server = (done) => {
    app.plugins.browser.init({
        server: {
            baseDir: `${app.path.dist.html}`
        },
        host: 'localhost',
        port: 9000,
        logPrefix: 'log',
    })
}