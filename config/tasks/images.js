import webp from "gulp-webp";

// Оптимизация изображений (WebP)
export const images = () =>
    app.gulp.src(app.paths.src.images, { encoding: false })
        .pipe(app.plugins.newer("dist/assets/img"))
        .pipe(app.gulp.dest("dist/assets/img"))
        .pipe(app.plugins.newer("dist/assets/img"))
        .pipe(app.plugins.rename((path) => {
            path.extname += path.extname;
        }))
        .pipe(webp())
        .pipe(app.gulp.dest("dist/assets/img"));