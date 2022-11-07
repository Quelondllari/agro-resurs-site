import replace from "gulp-replace"
import browser from "browser-sync"
import notify from "gulp-notify"
import plumber from "gulp-plumber"

export const plugins = {
    replace: replace,
    browser: browser,
    notify: notify,
    plumber: plumber
}