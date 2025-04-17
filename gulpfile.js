// 🔹 Импорт необходимых модулей
import gulp from "gulp";
import fileInclude from "gulp-file-include";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer"; // ✅ Используем PostCSS-версию
import cleanCSS from "gulp-clean-css";
import webp from "gulp-webp";
import newer from "gulp-newer";
import webpack from "webpack-stream";
import svgmin from "gulp-svgmin";
import browserSync from "browser-sync";  

const { src, dest, watch, series, parallel } = gulp;
const compileSass = gulpSass(sass); // Используем `gulp-sass` с `dart-sass`
const bs = browserSync.create();

// 🔹 Пути к файлам
const paths = {
    html: "src/*.html",
    scss: "src/assets/scss/style.scss",
    js: "src/assets/js/main.js",
    images: "src/assets/img/**/*.{png,jpg}",
    fonts: "src/assets/fonts/**/*",
    svg: "src/assets/img/svg/**/*.svg"
};

// 🔹 Обработка HTML
const html = () =>
    src(paths.html)
        .pipe(fileInclude({ prefix: "@@", basepath: "src/assets/components" }))
        .pipe(dest("dist"));

// 🔹 Обработка SCSS → CSS
const styles = () =>
    src(paths.scss)
        .pipe(compileSass().on("error", compileSass.logError)) // Компиляция SCSS
        .pipe(postcss([autoprefixer()])) // ✅ Заменили `gulp-autoprefixer` на PostCSS
        .pipe(dest("dist/assets/css"))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/assets/css"));

// 🔹 Оптимизация изображений (WebP)
const images = () =>
    src(paths.images)
        .pipe(newer("dist/assets/img"))
        .pipe(webp())
        .pipe(dest("dist/assets/img"));

// 🔹 Копирование шрифтов
const fonts = () =>
    src(paths.fonts)
        .pipe(dest("dist/assets/fonts"));

// 🔹 Оптимизация SVG
const svg = () =>
    src(paths.svg)
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
        server: "dist", // Указываем `dist` как корневую папку
        notify: false, // Отключаем уведомления
        open: false, // Не открывать браузер автоматически
        ui: false
    });

    watch("dist/**/*.html").on("change", bs.reload); // Следим за HTML
    watch("dist/assets/css/*.css").on("change", bs.reload); // Следим за CSS
    watch("dist/assets/js/*.js").on("change", bs.reload); // Следим за JS
}

// 🔹 Экспорт задач
export default series(
    parallel(html, styles, images, fonts, svg, scripts),
    parallel(serve, watchFiles)
);


