#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ffmetadata = require('ffmetadata');

const baseFolder = process.cwd();
const files = fs.readdirSync(baseFolder).filter((entry) => {
	const stats = fs.lstatSync(path.join(baseFolder, entry));

	return !stats.isDirectory();
});

function padNumber(number, length){
	var string = '000000000'+ number;

	return string.substr(string.length - length);
}

files.forEach((filename, index) => {
	if(process.argv[2] === '1' && index !== 1) return;

	var filenameRegex = /(.+?)(s?\d\d?)[ex](\d\d?)(.+?)?(?:\s-\s|\.|\s)(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr).*(\..+)/i;


	if(!filenameRegex.test(filename))	return console.log('Skipping ..', filename);

	ffmetadata.read(filename, (err, data) => {
		if(err) return console.error('Error reading metadata', err);

		console.log('filename', filename);
		console.log('metadata', data);

		// data.test = data.test ? parseInt(data.test) + 1 : 0;

		ffmetadata.write(filename, data, (err) => {
			if(err) return console.error('Error writing metadata', err);

			console.log('filename', filename);
			console.log('new metadata', data);
		});
	});

	console.log(`\noldFilename: ${filename}`);

	const separatorRegex = /\.|\s-\s/g;

	var fileParts = filename.match(filenameRegex);

	var showName = /\/([^\/]+)\/[^\/]+$/.exec(baseFolder)[1] +' ';//fileParts[1].replace(separatorRegex, ' ');

	var seasonEpisode = `s${padNumber(fileParts[2], 2)}e${padNumber(fileParts[3], 2)}`;

	var description = fileParts[4] ? ' -'+ fileParts[4].replace(separatorRegex, ' ') : '';

	var extension = fileParts[5];

	var newFilename = showName + seasonEpisode + description + extension;

	console.log(`newFilename: ${newFilename}`);

	if(process.argv[2] === 'y') fs.rename(filename, newFilename, (err) => { if(err) console.error('ERROR ', err); });
});