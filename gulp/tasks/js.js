import concat from "gulp-concat"
import babel from "gulp-babel"
import uglify from "gulp-uglify"
import rename from "gulp-rename"

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(babel())
        .pipe(app.gulp.dest(app.path.dist.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(app.gulp.dest(app.path.dist.js))
        .pipe(app.plugins.browser.stream())
}