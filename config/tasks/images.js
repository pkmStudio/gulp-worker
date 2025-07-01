import webp from "gulp-webp";

// Оптимизация изображений (WebP)
export const images = () =>
    app.gulp.src(app.paths.src.images, { encoding: false })
        .pipe(app.plugins.newer(app.paths.build.images))
        .pipe(app.gulp.dest(app.paths.build.images))
        .pipe(app.plugins.newer(app.paths.build.images))
        .pipe(app.plugins.rename((path) => {
            path.extname += path.extname;
        }))
        .pipe(webp())
        .pipe(app.gulp.dest(app.paths.build.images));