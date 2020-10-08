import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import prettyError from 'gulp-prettyerror';
import svgSprite from 'gulp-svg-sprite';
import size from 'gulp-size';
import merge from 'merge-stream';

const { src, dest } = gulp;

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

export default function (cb) {
	const scriptsPath = 'icons/sprites/';

	const folders = getFolders(scriptsPath);
   	if (folders.length === 0) return cb();

	const tasks = folders.map((folder) => {
		return src(path.join(scriptsPath, folder, '/**/*.svg'))
			.pipe(prettyError())
			.pipe(svgSprite({
				mode: {
					symbol: { // symbol mode to build the SVG
						dest: '.', // destination folder
						sprite: `${ folder }-icon-stack.svg`, // generated sprite name
						example: {
							dest: `${ folder }-icon-stack.html`,
						},
					},
				},
			}))
		.pipe(size({ showFiles: true, title: 'Icon Stack Generated --->' })) // size before dest results in better output in the console
		.pipe(dest(scriptsPath));
	 });

	 return merge(tasks);
};
