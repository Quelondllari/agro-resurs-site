/**
    Подключение главного модуля
 */
import gulp from "gulp"

/**
    Подключение модуля путей и плагинов
 */
import { path } from "./gulp/config/path.js"
import { plugins } from "./gulp/config/plugins.js"

/**
    Устанавливаем глобальной переменной значения
 */
global.app = {
    gulp: gulp,
    path: path,
    plugins: plugins
}

/**
    Импорт задач
 */
 import { copy } from "./gulp/tasks/copy.js"
 import { reset } from "./gulp/tasks/reset.js"
 import { html } from "./gulp/tasks/html.js"
 import { server } from "./gulp/tasks/server.js"
 import { scss } from "./gulp/tasks/scss.js"
 import { fonts } from "./gulp/tasks/fonts.js"
 import { js } from "./gulp/tasks/js.js"
 import { libs } from "./gulp/tasks/libs.js"
 import { img } from "./gulp/tasks/img.js"
 import { video } from "./gulp/tasks/video.js"
/**
    Наблюдатель
 */
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.libs, libs)
    gulp.watch(path.watch.video, video)
    gulp.watch(path.watch.img, img)
}

const mainTasks = gulp.parallel(copy, fonts, html, scss, js, libs, video, img)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

gulp.task('dev', dev)