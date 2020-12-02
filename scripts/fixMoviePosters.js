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

const baseFolder = process.cwd();
const folders = fs.readdirSync(baseFolder).filter((entry) => {
	const stats = fs.lstatSync(path.join(baseFolder, entry));

	return stats.isDirectory();
});

folders.forEach((name, index) => {
	if(process.argv[2] === '1' && index !== 1) return;

	var nameRegex = /(.+)\s\((\d{4})\)/;

	if(!nameRegex.test(name)) return console.log('Skipping', name);

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
