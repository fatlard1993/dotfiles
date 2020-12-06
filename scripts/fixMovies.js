#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const request = require('request');

const download = (url, location, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(location)).on('close', callback);
  });
};

const movieArt = require('movie-art');

const nameRegex = /(.+)\s\((\d{4})\)/;
const extensionRegex = /\.[^\.]+?$/;
const badNameRegex = /(.+?)?(?:\s-\s|\.|\s)(\d{4})(?:\s-\s|\.|\s)(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr).*(\..+)/i;

const baseFolder = process.cwd();
const children = fs.readdirSync(baseFolder).filter((name) =>{
	return !(nameRegex.test(name) && fs.existsSync(path.join(baseFolder, name, 'poster.jpg')));
}).map((name) => {
	const folder = path.join(baseFolder, name), stats = fs.lstatSync(folder);

	return { name, folder, isDirectory: stats.isDirectory() };
});

children.forEach((child, index) => {
	let { name, folder, isDirectory } = child;

	if(process.argv[3] === '1' && index !== 1) return;

	if(badNameRegex.test(name)){
		console.log(`\nBad name .. Fixing`);

		var nameParts = name.match(badNameRegex);
		var newName = `${nameParts[1].replace(/\./g, ' ')} (${nameParts[2]})`;

		console.log(`+ old name: ${name}`);

		if(isDirectory){
			const movieFile = fs.readdirSync(folder).filter((childName) => {
				return childName.startsWith(name);
			})[0];

			// console.log(`+ isDirectory | movieFile: ${movieFile}`);

			var newMovieFileName = path.join(baseFolder, name, newName + movieFile.match(extensionRegex)[0]);

			// console.log(`+ old movieFile name: ${movieFile}`);
			// console.log(`+ new movieFile name: ${newMovieFileName}`);
			console.log(`+ new name: ${newName}`);

			if(process.argv[2] === 'y') fs.rename(path.join(folder, movieFile), newMovieFileName, (err) => { if(err) console.error('ERROR ', err); });
		}

		else{
			newName += nameParts[3];

			console.log(`+ new name: ${newName}`);
		}

		if(process.argv[2] === 'y') fs.rename(folder, path.join(baseFolder, newName), (err) => { if(err) console.error('ERROR ', err); });

		name = newName;
	}

	else if(!nameRegex.test(name)) return console.log('Skipping', name);

	if(!isDirectory){
		if(process.argv[2] === 'y') fs.mkdirSync(path.join(baseFolder, newName.replace(extensionRegex, '')));

		else return;
	}

	var nameParts = name.match(nameRegex);

	var movieName = nameParts[1];

	var movieYear = nameParts[2];

	const posterPath = path.join(baseFolder, name, `poster.jpg`);//${url.match(/.+(\..+$)/)[1]}

	if(fs.existsSync(posterPath) && process.argv[3] !== 'f') return;//console.log('Skipping', name);

	console.log(`Getting movie art for: ${name}`);

	if(process.argv[2] !== 'y') return;

	movieArt(movieName, { year: movieYear }, (err, url) => {
		if(err) console.error(err);

		download(url, posterPath, () => {
			console.log(`✅ Downloaded art for ${name}`);
		});
	});
});
