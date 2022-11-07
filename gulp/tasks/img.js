import imagemin from "gulp-imagemin"
import imageminOptipng from "imagemin-optipng"
import imageminMozjpeg from "imagemin-mozjpeg"
import imageminSvgo from "imagemin-svgo"

export const img = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(imagemin({
            plugins: [
                imageminMozjpeg({ quality: 75, progressive: true }),
                imageminOptipng({ optimizationLevel: 5 }),
                imageminSvgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        }))
        .pipe(app.gulp.dest(app.path.dist.img))
    // .pipe(app.plugins.browser.stream())
}