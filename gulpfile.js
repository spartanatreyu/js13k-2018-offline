const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const config = 
{
	sourceFiles: ['./src/**/*.js', './src/**/*.html']
};

gulp.task('copy', () => gulp.src(config.sourceFiles).pipe(gulp.dest('./dist/')));

gulp.task('clean', () => del('./dist/*'));

gulp.task('build', gulp.series('clean','copy'));

gulp.task('serve', () =>
{
	//start web server and open browser
	browserSync({server:{baseDir: 'dist'}});

	//reload browser on source file change and rebuild
	gulp.watch(config.sourceFiles, gulp.series('build', function startReload(done)
	{
		reload();
		done();
	}));
});

gulp.task('default', gulp.series('build', 'serve'));