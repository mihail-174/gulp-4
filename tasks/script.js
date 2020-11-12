import gulp from "gulp";
import babel from "gulp-babel";
import plumber from "gulp-plumber";
import errorHandler from "gulp-plumber-error-handler";
import cached from "gulp-cached";
import changed from "gulp-changed";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import debug from "gulp-debug";
import sourcemaps from "gulp-sourcemaps";

gulp.task("script", () => {
    return gulp.src(["src/components/**/*.js", "src/scripts/**/*.js", "src/vendors/**/*.js"])
        .pipe(plumber({
            errorHandler: errorHandler("Ошибка в \'JS\' task")
        }))
        .pipe(cached("js"))
        .pipe(changed("src/js/", {
            extension: ".js"
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false
                    }
                ]
            ]
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            dirname: "."
        }))
        .pipe(sourcemaps.write("./maps/"))
        .pipe(gulp.dest("dist/js"))
        .pipe(debug({
            "title": "JS files"
        }));
});
