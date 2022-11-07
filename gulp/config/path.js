/**
    Получаем имя папки проекта
 */
import * as nodePath from "path"
const workFolder = nodePath.basename(nodePath.resolve())

const distFolder = "./dist"
const srcFolder = "./src"

export const path = {
    dist: {
        js: `${distFolder}/js/`,
        css: `${distFolder}/css/`,
        html: `${distFolder}/`,
        img: `${distFolder}/img/`,
        video: `${distFolder}/video/`,
        files: `${distFolder}/files/`,
        libs: `${distFolder}/libs/`,
        fonts: `${distFolder}/fonts/`,
        html: `${distFolder}/`
    },
    src: {
        js: `${srcFolder}/js/**/*.js`,
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        video: `${srcFolder}/video/**/*`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/main.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.{ttf,woff,woff2}`,
        libs: `${srcFolder}/libs/**/*.{js,css}`
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        video: `${srcFolder}/**/*`,
        files: `${srcFolder}/files/**/*.*`,
        libs: `${srcFolder}/libs/**/*.{js,css}`
    },
    clean: distFolder,
    distFolder: distFolder,
    srcFolder: srcFolder,
    workFolder: workFolder
}
