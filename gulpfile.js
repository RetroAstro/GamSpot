const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const cssmin = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const jsonminify = require('gulp-jsonminify')
const imagemin = require('gulp-imagemin')
const del = require('del')
const through = require('through2')

const src = './src'
const dist = './dist'

const isProd = process.env.NODE_ENV === 'production'

const queue = ['qml', 'qss', 'js', 'json']

gulp.task('qml', () => {
  return gulp
    .src(`${src}/**/*.qml`)
    .pipe(isProd ? htmlmin() : through.obj())
    .pipe(gulp.dest(dist))
})

gulp.task('qss', () => {
  return gulp
    .src(`${src}/**/*.qss`)
    .pipe(isProd ? cssmin() : through.obj())
    .pipe(gulp.dest(dist))
})

gulp.task('js', () => {
  return gulp
    .src(`${src}/**/*.js`)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: [
          [
            '@babel/plugin-proposal-decorators',
            { decoratorsBeforeExport: true }
          ],
          '@babel/plugin-proposal-class-properties'
        ]
      })
    )
    .pipe(
      isProd ? uglify({ compress: true }) : through.obj()
    )
    .pipe(gulp.dest(dist))
})

gulp.task('json', () => {
  return gulp
    .src(`${src}/**/*.json`)
    .pipe(isProd ? jsonminify() : through.obj())
    .pipe(gulp.dest(dist))
})

gulp.task('config', () => {
  let local = JSON.parse(fs.readFileSync('./config/local.json'))

  return gulp
    .src('./config/index.js')
    .pipe(
      through.obj(function (file, enc, callback) {
        let data = file.contents.toString()

        file.contents = Buffer.from(data.replace('$', local.baseUrl))

        this.push(file)

        callback()
      })
    )
    .pipe(gulp.dest(`${dist}/config`))
})

gulp.task('image', () => {

  return gulp
    .src(`${src}/images/**`)
    .pipe(
      isProd ?
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ]) : through.obj()
    )
    .pipe(gulp.dest(`${dist}/images`))
})

gulp.task('clean', () => {
  return del([`${dist}/**`])
})

gulp.task('watch', () => {
  queue.map(v => gulp.watch(`${src}/**/*.${v}`, gulp.series(v)))
  gulp.watch(`${src}/images/**`, gulp.series('image'))
})

gulp.task('dev', gulp.series('clean', gulp.parallel(...queue, 'config', 'image'), 'watch'))

gulp.task('build', gulp.series('clean', gulp.parallel(...queue, 'config', 'image')))
