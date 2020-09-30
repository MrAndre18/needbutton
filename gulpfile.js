let project_folder = "build";
let source_folder = "source";

let path = {
	build:{
		phpScripts: project_folder + "/php/",
		php: project_folder + "/",
		parts: project_folder + "/parts/",
		css: project_folder + "/",
		js: project_folder + "/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	source:{
		phpScripts: source_folder + "/php/*.php",
		jade: source_folder + "/*.jade",
		parts: source_folder + "/parts/*.jade",
		sass: source_folder + "/styles/style.sass",
		js: source_folder + "/scripts/main.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},
	watch:{
		jade: source_folder + "/*.jade",
		parts: source_folder + "/parts/*.jade",
		sass: source_folder + "/styles/**/*.sass",
		js: source_folder + "/scripts/**/*.js",
	},
	clean: "./" + project_folder + "/"
}

let {src, dest} 			= 	require('gulp'),
		gulp 							= 	require('gulp'),
		browserSync 			= 	require('browser-sync').create(),
		del 							= 	require("del"),
		fileInclude 			= 	require('gulp-file-include'),
		jadeToHTML 				= 	require('gulp-jade'),
		rename 						= 	require('gulp-rename'),
		connectPHP 				= 	require('gulp-connect-php'),
		sass 							= 	require('gulp-dart-sass'),
		autoprefixer 			= 	require('gulp-autoprefixer'),
		groupMediaQueries = 	require('gulp-group-css-media-queries'),
		cleanCss 					= 	require('gulp-clean-css'),
		uglify 						= 	require('gulp-uglify-es').default,
		imageMin 					= 	require('gulp-imagemin'),
		webp 							= 	require('gulp-webp'),
		webpHTML 					= 	require('gulp-webp-html'),
		webpCSS 					= 	require('gulp-webp-css'),
		ttf2woff 					= 	require('gulp-ttf2woff'),
		ttf2woff2 				= 	require('gulp-ttf2woff2');

function LiveServer() {
	connectPHP.server({
		base: './' + project_folder + '/',
		keepalive: true,
		hostname: 'localhost',
		port: 8080,
		open: false
	});
	browserSync.init({
		proxy: 'localhost',
		port: 8080,
		notify: false
	});
}

function watchFiles() {
	gulp.watch([path.watch.jade], jade);
	gulp.watch([path.watch.parts], parts);
	gulp.watch([path.watch.sass], sassCompiler);
	gulp.watch([path.watch.js], js);
}
function clean() {
	return del(path.clean);
}
function phpScripts() {
	return src(path.source.phpScripts)
		.pipe(dest(path.build.phpScripts))
		.pipe(browserSync.reload({stream: true}))
}
function jade() {
	return src(path.source.jade)
		.pipe(jadeToHTML())
		//.pipe(webpHTML())
		.pipe(
			rename({
			extname: '.php'
			})
		)
		.pipe(dest(path.build.php))
		.pipe(browserSync.reload({stream: true}))
}
function parts() {
	return src(path.source.parts)
		.pipe(jadeToHTML())
		.pipe(
			rename({
			extname: '.php'
			})
		)
		.pipe(dest(path.build.parts))
		.pipe(browserSync.reload({stream: true}))
}
function sassCompiler() {
	return src(path.source.sass)
		.pipe(
			sass({
				outputStyle: "compressed"
			})
		)
		//.pipe(webpCSS())
		.pipe(groupMediaQueries())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(cleanCss())
		.pipe(dest(path.build.css))
		.pipe(browserSync.reload({stream: true}))
}
function js() {
	return src(path.source.js)
		.pipe(fileInclude())
		.pipe(uglify())
		.pipe(dest(path.build.js))
		.pipe(browserSync.reload({stream: true}))
}
function images() {
	return src(path.source.img)
		/* .pipe(
			webp({
				quality: 90
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.source.img))
		.pipe(
			imageMin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				interlaced: true,
				optimizationLevel: 1 // 0 to 7
			})
		) */
		.pipe(dest(path.build.img))

		.pipe(browserSync.reload({stream: true}))
}
function fonts() {
	src(path.source.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
	return src(path.source.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
}

let build = gulp.series(clean,
	gulp.parallel(
								phpScripts,
								parts,
								jade,
								sassCompiler,
								js,
								images,
								fonts)
);
let watch = gulp.parallel(watchFiles, build, LiveServer);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.sassCompiler = sassCompiler;
exports.jade = jade;
exports.parts = parts;
exports.build = build;
exports.watch = watch;
exports.default = watch;