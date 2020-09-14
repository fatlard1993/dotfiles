#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const baseFolder = process.argv[2];
const files = fs.readdirSync(baseFolder).filter((entry) => {
	const stats = fs.lstatSync(path.join(baseFolder, entry));

	return !stats.isDirectory();
});;

files.forEach((filename, index) => {
	if(process.argv[3] === '1' && index !== 1) return;

	if(filename[0] === 'S') return;

	var fileParts = filename.split(/[\s\.]/);
	var seasonEpisode = filename.match(/s\d\de\d\d/i)[0].toUpperCase();
	// var seasonEpisode = 'S01E'+ filename.match(/(?!1x)\d\d/i)[0].toUpperCase();
	var description = '';//` ${fileParts.slice(3, fileParts.length - 1).join(' ')}`;
	var extension = `.${filename.split('.')[filename.split('.').length - 1]}`;

	var newFilename = seasonEpisode + description + extension;

	// var newFilename = fileParts.slice(0, 2).map((part) => { return part[0].toUpperCase() + part.substring(1, part.length).replace('5e', '5E'); }).join(' ');

	console.log(`\nfilename: ${filename}\nnewFilename: ${newFilename}`);

	if(process.argv[3] === 'y') fs.rename(filename, newFilename, (err) => { if(err) console.error('ERROR ', err); });
});
