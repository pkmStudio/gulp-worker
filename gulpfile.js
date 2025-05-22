import gulp from "gulp";
import fileInclude from "gulp-file-include";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";
import webp from "gulp-webp";
import newer from "gulp-newer";
import webpack from "webpack-stream";
import svgmin from "gulp-svgmin";
import browserSync from "browser-sync";
import { deleteAsync } from "del";

const { src, dest, watch, series, parallel } = gulp;
const compileSass = gulpSass(sass);
const bs = browserSync.create();

// 🔹 Пути к файлам
const paths = {
    html: "src/*.html",
    scss: "src/assets/scss/style.scss",
    js: "src/assets/js/main.js",
    images: "src/assets/img/**/*.{png,jpg}",
    fonts: "src/assets/fonts/**/*",
    svg: "src/assets/img/svg/**/*.svg",
};

// 🔹 Очистка папки `dist/` перед сборкой
const cleanDist = () => deleteAsync(["dist"]); // 📌 Удаляет всю папку `dist/`

// 🔹 Обработка HTML
const html = () =>
    src(paths.html)
        .pipe(fileInclude({ prefix: "@@", basepath: "src/assets/components" }))
        .pipe(dest("dist"));

// 🔹 Обработка SCSS → CSS
const styles = () =>
    src(paths.scss)
        .pipe(compileSass().on("error", compileSass.logError))
        .pipe(postcss([
            autoprefixer(),
            combineMediaQuery(), // Объединяет одинаковые медиа-запросы
            sortMediaQueries({
                sort: 'mobile-first' // или 'desktop-first'
              }),  // Сортирует медиа-запросы (по возрастанию или убыванию)
        ]))
        .pipe(dest("dist/assets/css"))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/assets/css"));

// 🔹 Оптимизация изображений (WebP)
const images = () =>
    src(paths.images, { encoding: false })
        .pipe(dest("dist/assets/img"))       
        .pipe(newer("dist/assets/img"))
        .pipe(webp())
        .pipe(dest("dist/assets/img"));

// 🔹 Копирование шрифтов
const fonts = () =>
    src(paths.fonts, { encoding: false })
        .pipe(dest("dist/assets/fonts"));

// 🔹 Оптимизация SVG
const svg = () =>
    src(paths.svg, { encoding: false })
        .pipe(svgmin())
        .pipe(dest("dist/assets/img/svg"));

// 🔹 Сборка JS с Webpack
const scripts = () =>
    src(paths.js)
        .pipe(
            webpack({
                mode: "production",
                output: { filename: "main.js" },
                module: {
                    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }],
                },
                optimization: {
                    usedExports: true,
                    minimize: false, // ❌ Отключить минификацию - false
                },
            })
        )
        .pipe(dest("dist/assets/js"));

// 🔹 Наблюдение за изменениями
const watchFiles = () => {
    watch(paths.html, html);
    watch("src/assets/scss/**/*.scss", styles);
    watch(paths.images, images);
    watch("src/assets/js/**/*.js", scripts);
};

// 🔹 Запуск сервера
const serve = () => {
    bs.init({
        server: "dist",
        notify: false,
        open: false,
        ui: false,
    });

    watch("dist/**/*.html").on("change", bs.reload);
    watch("dist/assets/css/*.css").on("change", bs.reload);
    watch("dist/assets/js/*.js").on("change", bs.reload);
};

// 🔹 Экспорт задач с очисткой перед сборкой
export default series(
    cleanDist, // 📌 Сначала очищает `dist/`
    parallel(html, styles, images, fonts, svg, scripts), // 📌 Затем запускает сборку
    parallel(serve, watchFiles) // 📌 Потом сервер и слежку за файлами
);
