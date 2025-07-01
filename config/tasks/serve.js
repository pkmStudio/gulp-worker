import { html } from './html.js'
import { styles } from './styles.js'
import { images } from './images.js'
import { scripts } from './scripts.js'
import browserSync from 'browser-sync'

const bs = browserSync.create();

// Запуск сервера
export const serve = () => {
    bs.init({
        server: "dist",
        notify: false,
        open: false,
        ui: false,
    });

    app.gulp.watch("src/**/*.html", app.gulp.series(html, bsReloader));
    app.gulp.watch("src/assets/**/*.scss", app.gulp.series(styles, bsReloader));
    app.gulp.watch("src/assets/**/*.js", app.gulp.series(scripts, bsReloader));
    app.gulp.watch("src/assets/images/**/*.{png,jpg,jpeg,gif,svg,webp}", app.gulp.series(images, bsReloader));
};

function bsReloader (done) {
    bs.reload();
    done();
}
