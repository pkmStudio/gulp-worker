import fileInclude from "gulp-file-include";

// Обработка HTML
export const html = () =>
    app.gulp.src(app.paths.src.html)
        .pipe(fileInclude({ prefix: "@@", basepath: "src/assets/components" }))
        .pipe(app.plugins.prettier({
            "printWidth": 80,
            "tabWidth": 4,
            "useTabs": true,
            "semi": true,
            "singleQuote": false,
        }))
        .pipe(app.gulp.dest(app.paths.buildFolder));