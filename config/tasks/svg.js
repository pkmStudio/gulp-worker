import svgmin from "gulp-svgmin"

// Оптимизация SVG
export const svg = () =>
    app.gulp.src(app.paths.src.svg, { encoding: false })
        .pipe(svgmin())
        .pipe(app.gulp.dest(app.paths.build.svg));