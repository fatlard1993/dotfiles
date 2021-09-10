#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const request = require('request');

const movieArt = require('movie-art');
const ffmetadata = require('ffmetadata');

const deleteFilesRegex = /.*(rarbg).*\.(txt|exe)|^subs$/i;

const extensionRegex = /(\.(mp4|mkv|avi))$/i;
const nameRegex = /(.+?)?(?:\s-\s|\.|\s)\(?(\d{4})\)?(?:\s-\s|\.|\s)?(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr|PROPER|DUBBED|REMASTERED|RERIP)?.*(\.(mp4|mkv|avi))?/i;

function fixMetadata(file, name, year){
	if(!extensionRegex.test(file)) return;// console.log('Skipping ..', file);

	ffmetadata.read(file, (err, data) => {
		if(err) return console.error('Error reading metadata', err);

		console.log(`\n+ READ metadata for "${name}"`, data);

		if(process.argv[2] === 'y' && (data.comment !== name || data.title !== name || data.year !== year)){
			data.title = data.comment = name;
			data.year = year;

			ffmetadata.write(file, data, { preserveStreams: true }, (err) => {
				if(err) return console.error('Error writing metadata', err);

				console.log(`\n+ WRITE metadata for "${name}"`, data);
			});
		}
	});
}

const download = (url, folder, callback) => {
  request.head(url, () => {
    request(url).pipe(fs.createWriteStream(folder)).on('close', callback);
  });
};

function fixPoster(folder, name, year){
	const posterPath = path.join(folder, `poster.jpg`);

	if(fs.existsSync(posterPath)) return;

	console.log(`+ Missing movie art`);

	if(process.argv[2] !== 'y') return;

	movieArt(name, { year: year }, (err, url) => {
		if(err) console.error(err);

		download(url, posterPath, console.log.bind(null, `✅ Downloaded movie art for "${name}"`));
	});
}

function forEachInFolder(folder, func){
	const context = { folder };

	fs.readdirSync(folder).map((name) => {
		const location = path.join(folder, name), stats = fs.lstatSync(location);

		return { name, location, isDirectory: stats.isDirectory() };
	}).forEach(func.bind(context));
}

function deleteFile(file){
	let { name, location, isDirectory } = file;

	if(deleteFilesRegex.test(name)){
		console.log('+ DELETE', name);

		exec(`rm -${isDirectory ? 'r' : ''}f "${location}"`);
	}
}

forEachInFolder(process.cwd(), function processChild(child){
	let { name, location, isDirectory } = child;

	console.log(`\n${isDirectory ? 'FOLDER' : 'FILE'}: ${name}`);

	if(deleteFilesRegex.test(name)) return deleteFile(child);

	if(!nameRegex.test(name)) return;

	const nameParts = name.match(nameRegex);
	const year = nameParts[2];
	const cleanName = nameParts[1].replace(/\./g, ' ');

	const filename = `${cleanName} (${year})`;

	console.log(`+ name: ${cleanName}`);
	console.log(`+ year: ${year}`);

	if(isDirectory){
		const oldMovieFileName = fs.readdirSync(location).filter((childName) => { return extensionRegex.test(childName); })[0];

		if(!oldMovieFileName) return console.log(`No movie file in ${location}`);

		const extension = extensionRegex.test(oldMovieFileName) ? oldMovieFileName.match(extensionRegex)[0].toLowerCase() : '.mp4';

		const newMovieFileLocation = path.join(location, filename + extension);

		if(process.argv[2] === 'y'){
			fs.rename(path.join(location, oldMovieFileName), newMovieFileLocation, (err) => {
				if(err) return console.error('ERROR ', err);

				const newLocation = path.join(this.folder, filename);

				fs.rename(location, newLocation, (err) => {
					if(err) return console.error('ERROR ', err);

					fixMetadata(path.join(newLocation, filename + extension), cleanName, year);

					fixPoster(newLocation, cleanName, year);

					forEachInFolder(newLocation, deleteFile);
				});
			});
		}

		else{
			fixMetadata(path.join(location, oldMovieFileName), name);

			fixPoster(location);
		}
	}

	else {
		const missingFolder = path.join(this.folder, filename);

		console.log('+ Missing folder', missingFolder);

		if(process.argv[2] === 'y'){
			fs.mkdirSync(missingFolder);

			const extension = name.match(extensionRegex)[0].toLowerCase();
			const newLocation = path.join(missingFolder, filename + extension);

			fs.rename(location, newLocation, (err) => {
				if(err) return console.error('ERROR ', err);

				fixMetadata(newLocation, cleanName, year);

				fixPoster(missingFolder, cleanName, year);
			});
		}

		else{
			fixMetadata(location, name);

			fixPoster(this.folder);
		}
	}
});
