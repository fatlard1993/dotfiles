#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const ffmetadata = require('ffmetadata');
const util = require('js-util');

const deleteFilesRegex = /.*(rarbg).*\.(txt|exe)|^subs$/i;

const extensionRegex = /(\.(mp4|mkv|avi))$/i;
const separatorRegex = /\s-\s|\.|\s/g;
const folderNameRegex = /(.+?)(?:\s-\s|\.|\s)?(?:\d{4})?(?:\s-\s|\.|\s)?s?(\d\d?)(.+?)?(?:\s-\s|\.|\s)?(?:(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr|PROPER|DUBBED|REMASTERED|RERIP).*)?/i;
const nameRegex = /(.+?)(?:\s-\s|\.|\s)?s?(\d\d?)[ex](\d\d?)(?:\s-\s|\.|\s)?(?:(?:(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr|PROPER|DUBBED|REMASTERED|RERIP).*)|(.+?)?(?:\s-\s|\.|\s)?(?:(?:480|720|1080|stv|bdr|brr|webr|sd\sdvd|hd\stv|dvdr|PROPER|DUBBED|REMASTERED|RERIP).*)?)(\.(mp4|mkv|avi))/i;

function fixMetadata(location, name, show, season_number, episode_number, description){
	if(!extensionRegex.test(location)) return;// console.log('Skipping ..', location);

	const episode_sort = parseInt(episode_number);
	const episode_id = `Episode ${episode_sort}`;

	ffmetadata.read(location, (err, data) => {
		if(err) return console.error('Error reading metadata', err);

		console.log(`\n+ READ metadata for "${name}"`, data);

		if(data.comment !== name || data.title !== name || data.show !== show || data.season_number !== season_number || data.episode_sort !== episode_sort || data.episode_id !== episode_id || data.description !== description){
			data.title = data.comment = name;
			data.show = show;
			data.season_number = season_number;
			data.episode_id = episode_id;
			data.episode_sort = episode_sort;
			data.description = description;

			if(process.argv[2] === 'y'){
				ffmetadata.write(location, data, { preserveStreams: true }, (err) => {
					if(err) return console.error('Error writing metadata', err);

					console.log(`\n+ WRITE metadata for "${name}"`, data);
				});
			}
		}
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
		console.log('+ DELETE', name, location);//, location, isDirectory);

		exec(`rm -${isDirectory ? 'r' : ''}f "${location}"`);
	}
}

function padNumber(number, length){
	var string = '000000000'+ number;

	return string.substr(string.length - length);
}

forEachInFolder(process.cwd(), function processChild(child){
	let { name, location, isDirectory } = child;

	console.log(`\n${isDirectory ? 'FOLDER' : 'FILE'}: ${name}`);

	if(deleteFilesRegex.test(name)) return deleteFile(child);

	const nameParts = name.match(isDirectory ? folderNameRegex : nameRegex);
	const season = nameParts && padNumber(nameParts[2], 2);
	const cleanName = nameParts && util.capitalize(nameParts[1].replace(separatorRegex, ' '), true);

	if(isDirectory){
		if(folderNameRegex.test(name)){
			const newLocation = path.join(this.folder, `Season ${season}`);

			if(process.argv[2] !== 'y'){
				console.log('+ season folder', newLocation);

				return forEachInFolder(location, processChild);
			}


			fs.rename(location, newLocation, (err) => {
				if(err) return console.error('ERROR ', err);

				forEachInFolder(newLocation, processChild);
			});
		}

		else{
			console.log('- todo: series folder wrapping', location);

			forEachInFolder(location, processChild);
		}

		return;
	}

	if(!nameRegex.test(name)) return;

	const episode = padNumber(nameParts[3], 2);
	const description = nameParts[4] ? util.capitalize(nameParts[4].replace(separatorRegex, ' ')) : '';
	const extension = nameParts[5].toLowerCase();

	const filename = `${cleanName} s${season}e${episode}${description ?  ' - ' : ''}${description}`;

	console.log(`+ name: ${cleanName}`);
	console.log(`+ episode: s${season}e${episode}`);
	console.log(`+ description: ${description}`);
	console.log(`+ filename: ${filename}`);

	if(process.argv[2] !== 'y') return fixMetadata(location, filename);

	const newLocation = path.join(this.folder, filename + extension);

	fs.rename(location, newLocation, (err) => {
		if(err) return console.error('ERROR ', err);

		fixMetadata(newLocation, filename, cleanName, season, episode, description);
	});
});
