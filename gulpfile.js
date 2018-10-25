var gulp = require('gulp');
var swPrecache = require('sw-precache');

gulp.task('sw-generator',function() {
	var swOptions = {
		staticFileGlobs:[
		'./*.html',
		'./images/**/*.{png,svg,gif,jpg}',
		'./scripts/**/*.js',
		'./styles/**/*.css',
		'./public/*.html'
		],
		stripPrefix:'.',
		runtimeCaching:[{
			urlPattern:/^https:\/\/publicdata-weather\.firebaseio\.com/,
			handler:'networkFirst',
			options:{
				cache:{
					name:'weatherData'
				}
			}
			}]
		};
		return swPrecache.write('service_worker.js',swOptions);
		});