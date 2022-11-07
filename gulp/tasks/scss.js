import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"
import concat from "gulp-concat"
import cleanCss from "gulp-clean-css"
import autoPrefixer from "gulp-autoprefixer"

const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.replace(/@fonts\//g, '../fonts/'))
        .pipe(concat('main.style.css'))
        .pipe(autoPrefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        }))
        .pipe(app.gulp.dest(app.path.dist.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.dist.css))
        .pipe(app.plugins.browser.stream())
}