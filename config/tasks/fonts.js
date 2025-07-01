

// Копирование шрифтов
export const fonts = () =>
    app.gulp.src(app.paths.src.fonts, { encoding: false })
        .pipe(app.gulp.dest(app.paths.build.fonts));
