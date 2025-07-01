import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Пути к файлам
export const paths = {
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/assets/scss/style.scss`,
        js: `${srcFolder}/assets/js/main.js`,
        images: `${srcFolder}/assets/img/**/*.{png,jpg,jpeg,gif,svg,webp}`,
        fonts: `${srcFolder}/assets/fonts/**/*`,
        svg: `${srcFolder}/assets/img/svg/**/*.svg`,
    },
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/assets/css/`,
        js: `${buildFolder}/assets/js/`,
        images: `${buildFolder}/assets/img/`,
        fonts: `${buildFolder}/assets/fonts/`,
        svg: `${buildFolder}/assets/img/svg/`,
    },

    clean: buildFolder,
    rootFolder: rootFolder,
    buildFolder: buildFolder,
};