import gulp              from 'gulp'
const {src, dest, watch} = gulp

import pug               from 'gulp-pug'

import gulpSass          from 'gulp-sass'
import sassCompiler      from 'sass'
const sass               = gulpSass(sassCompiler)

import cssnano           from 'gulp-cssnano'

import gulpUglifeEs      from 'gulp-uglify-es'
const uglify             = gulpUglifeEs.default

import concat            from 'gulp-concat'
import rename            from 'gulp-rename'
import webp              from 'gulp-webp'
import ttf2woff2         from 'gulp-ttf2woff2'
import newer             from 'gulp-newer'
import autoprefixer      from 'gulp-autoprefixer'
import bs                from 'browser-sync'

function markup() {
    return src('app/*.pug')
        .pipe(pug())
        .pipe(dest('public'))
        .pipe(bs.stream())
}

function styles() {
    return src('app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(dest('public/css'))
        .pipe(bs.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/lazysizes/lazysizes.min.js',
        'node_modules/aos/dist/aos.js',
        'app/js/main.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(dest('public/js'))
        .pipe(bs.stream())
}

export function transferImages() {
    const imgDest = 'public/img'
    return src('app/img/**/*')
        .pipe(newer(imgDest))
        .pipe(dest(imgDest))
        .pipe(bs.stream())
}

export function imgs2webp() {
    const imgsDest = 'public/img'

    return src('app/img/**/*')
        .pipe(newer({
            dest: imgsDest,
            ext: '.webp'
        }))
        .pipe(webp())
        .pipe(dest(imgsDest))
        .pipe(bs.stream())
}

export function fonts() {
    const fontsDest = 'public/fonts'
    
    return src('app/fonts/**/*')
        .pipe(newer({
            dest: fontsDest,
            ext: '.woff2'
        }))
        .pipe(ttf2woff2())
        .pipe(dest(fontsDest))
        .pipe(bs.stream())
}

export function build(cb) {
    markup();
    styles();
    scripts();
    transferImages();
    imgs2webp();
    fonts();
    cb();
}

export default function() {
    bs.init({
        server: {
            baseDir: 'public'
        }
    })
    
    watch('app/**/*.pug', {ignoreInitial: false}, markup)
    watch('app/**/*.scss', {ignoreInitial: false}, styles)
    watch('app/**/*.js', {ignoreInitial: false}, scripts)
}