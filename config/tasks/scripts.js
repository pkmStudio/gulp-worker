import webpack from "webpack-stream";

// Сборка JS с Webpack
export const scripts = () =>
    app.gulp.src(app.paths.src.js)
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
        .pipe(app.plugins.prettier({
            "trailingComma": "es5",
            "tabWidth": 4,
            "semi": true,
            "singleQuote": true
        }))
        .pipe(app.gulp.dest(app.paths.build.js))
        .pipe(
            webpack({
                mode: "production",
                output: { filename: "main.min.js" },
                module: {
                    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }],
                },
                optimization: {
                    usedExports: true,
                    minimize: true,
                },
            })
        )
        .pipe(app.gulp.dest(app.paths.build.js));