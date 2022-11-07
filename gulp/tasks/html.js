import Nunjucks from "gulp-nunjucks"
import pretty from "gulp-pretty-html"
import version from "gulp-version-number"

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML Nunjucks",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(Nunjucks.compile())
        .pipe(pretty())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(app.plugins.replace(/@video\//g, '/video/'))
        .pipe(
            version({
                'value': '%DT%',
                'append': {
                    'key': 'v',
                    'to': ['css', 'js'],
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )
        .pipe(app.gulp.dest(app.path.dist.html))
        .pipe(app.plugins.browser.stream())
}