import postcss from "gulp-postcss";
import combineMediaQuery from "postcss-combine-media-query";
import sortMediaQueries from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";
import gulpSass from 'gulp-sass'
import * as sass from 'sass'

const compileSass = gulpSass(sass);

// Обработка SCSS → CSS
export const styles = () =>
    app.gulp.src(app.paths.src.scss)
        .pipe(compileSass().on("error", compileSass.logError))
        .pipe(postcss([
            autoprefixer(),
            combineMediaQuery(), // Объединяет одинаковые медиа-запросы
            sortMediaQueries({
                sort: 'mobile-first' // или 'desktop-first'
            }),  // Сортирует медиа-запросы (по возрастанию или убыванию)
        ]))
        .pipe(app.plugins.prettier({
            'tabWidth': 4,
            'useTabs': true,
            'semi': true,
            'singleQuote': false,
        }))
        .pipe(app.gulp.dest(app.paths.build.css))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(app.plugins.rename({ suffix: ".min" }))
        .pipe(app.gulp.dest(app.paths.build.css));