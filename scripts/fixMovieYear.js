#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function getUserInput(prompt){
	const readlineInterface = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise((resolve) => {
		readlineInterface.question(prompt, (answer) => {
			readlineInterface.close();

			resolve(answer);
		})
	});
}

const movieDirectory = process.argv[2] ? path.resolve(process.argv[2]) : '/media/USB/Video/Movies';
const yearRegex = /(\d{4})$/;
const wrappedYearRegex = /\(\d{4}\)$/;
let movies;

try{
	movies = fs.readdirSync(movieDirectory);
}
catch(err){ return console.log('Could not read directory: ', movieDirectory); }

function fixNext(){ fixMovie(movies.pop()); }

async function fixMovie(name){
	if(!name) return new Promise(() => { console.log('Done!'); });

	const location = path.join(movieDirectory, name);
	let isDirectory;

	try{
		isDirectory = fs.lstatSync(location).isDirectory();
	}
	catch(err){
		console.error('Could not read file stats', err);

		return new Promise(fixNext);
	}

	if(isDirectory) return new Promise(fixNext);

	const extension = /(\..*)$/.exec(name)[1];
	let newName = name = name.replace(/\..*$/, '');

	if(!wrappedYearRegex.test(name) && !yearRegex.test(name)){
		console.log('Cant automatically fix: ', name);

		const userInput = await getUserInput('Enter the missing year, or the full name you would like to use instead (Enter nothing to skip): ');

		if(!userInput) return new Promise(fixNext);

		if(!yearRegex.test(userInput) && !wrappedYearRegex.test(userInput)){
			console.log(`User input does not match required format: ${yearRegex} || ${wrappedYearRegex}`);

			return new Promise(fixMovie.bind(this, `${name}${extension}`));
		}

		newName = yearRegex.test(userInput) ? `${name} (${userInput})` : userInput;
	}

	console.log('Fixing: ', name);

	if(name === newName && !wrappedYearRegex.test(name)){
		const wrappedYear = `(${yearRegex.exec(name)[1]})`

		newName = name.replace(yearRegex, (match, group1) => { return group1 === undefined ? match : wrappedYear; });
	}

	try{
		fs.mkdirSync(path.join(movieDirectory, newName));

		fs.renameSync(location, path.join(movieDirectory, newName, `${newName}${extension}`));
	}
	catch(err){ console.error('Could not fix', err); }

	return new Promise(fixNext);
}

fixNext();
