#!/usr/bin/env node

const leftPad = (string, length = 7, spacer = ' ') => `${spacer.repeat(Math.max(0, length - string.toString().length))}${string}`;
const formatDollars = (amount) => `$${(amount.toFixed(2)).toLocaleString('en-US')}`

//- Costs -//
//-- https://pearsonfarmandfence.com/colfax
//-- 1 week lead time
// item: cost

const cost = {
	'post hole implement': 700,
	'cement mixer': 120,
	'miter saw': 300,
	'2 x 4 x 8': 5,
	'2 x 6 x 6': 20,
	'2 x 6 x 8': 22,
	'2 x 6 x 10': 26,
	'6 x 6 x 10': 75,
	'4 x 4 x 10': 35,
	'4 x 4 x 8': 26,
	'6 x 6 x 5/8': 4,
	'post cap 4x4': 2,
	'post cap 6x6': 16,
	'cement 60lb': 5,
	latch: 13,
	wheel: 40,
	hinge: 6,
	test: 9999
};

//- Builds -//
// item: quantity

const build = {
	post: ({ height = 10, width = 4 } = {}) => {
		// Caulk around the post where it comes out of the concrete. A small crack can let water in that can eventually weaken the post

		// The diameter of the hole is 3 times the width of the fence post

		// The depth of the hole should be 1/3-1/2 the post height above ground
		//  - (i.e., a 6-foot tall fence would require a hole depth of at least 2 feet)

		return {
			[`post cap ${width}x${width}`]: 1,
			[`${width} x ${width} x ${height}`]: 1,

			// 2 bags should be enough to fill a 2ft hole
			'cement 60lb': Math.ceil(width / 2),
		}
	},
	panelSiding:  ({ height = 8, width = 6, boardWidth = 6, style = 'double-overlap' } = {}) => {
		const heightInInches = height * 12;
		let boardCount;

		// Overlapping boards provides maximum audio/visual privacy
		if (style === 'double-overlap') {
			boardCount = Math.ceil(heightInInches / boardWidth) + 1;

			const minOverlap = 0.25;
			const getOverlap = () => (((boardCount * boardWidth) - heightInInches) / (boardCount - 1)) / 2;

			while (getOverlap() < minOverlap) ++boardCount;

			// 6ft = 0.25 w/ 13 boards
			// 8ft = 0.352 w/ 18 boards
			// console.log(`Overlap each board (top and bottom) ${getOverlap()} inches`);
		}

		else if (style === 'single-overlap') {
			boardCount = Math.ceil(heightInInches / boardWidth);

			const minOverlap = 0.25;
			const getOverlap = () => ((boardCount * boardWidth) - heightInInches) / boardCount;

			while (getOverlap() < minOverlap) ++boardCount;

			// 6ft = 0.461 w/ 13 boards
			// 8ft = 0.352 w/ 17 boards
			// console.log(`Overlap the top of each board ${getOverlap()} inches`);
		}

		else if (style === 'non-overlap') {
			boardCount = Math.floor(heightInInches / boardWidth) - 1;

			// The gate will be our main limiting factor here
			//  - since it uses a 6in wide frame construction we could, at worst, split the difference at a maximum of half way between the frame
			const maxDiff = 6;
			const getDiff = () => heightInInches - (boardCount * boardWidth);

			while (getDiff() > maxDiff) ++boardCount;

			// 6ft = 6 w/ 11 boards
			// 8ft = 6 w/ 15 boards
			// console.log(`Deal with ${getDiff()} inches of desired height difference`);
		}

		// console.log('panel', { width, height, boardCount });

		return {
			[`${boardWidth} x ${width} x 5/8`]: boardCount
		}
	},
	panel: ({ height = 8, width, boardWidth, style } = {}) => {
		// Panels attach to the 4x4 posts, directly meeting end-to-end in the middle of each post
		//  - (end panels can be attached anywhere from half-way to the edge to allow for a more flexible fit)

		return {
			post: {
				// The post must be set at least 2 feet in the ground, TODO: do we really need more for an 8ft tall fence?
				height: height + 2,
			},

			panelSiding: {
				width,
				height,
				boardWidth,
				style,
			},
		}
	},
	gate: ({ width = 10, height = 8, boardWidth, style } = {}) => {
		return {
			hinge: 3,
			wheel: 1,

			// Main frame, half-lap construction
			[`2 x 6 x ${width}`]: 3,
			[`2 x 6 x ${height}`]: 2,

			// Angled supports (each cut in half @ a 45deg angle)
			'2 x 6 x 6': 4,

			panelSiding: {
				count: width / 6,
				width: 6,
				height,
				boardWidth,
				style,
			},

			post: {
				width: 6,
			}
		}
	},
	drivewayGate: () => {
		return {
			gate: 2,
			latch: 1,
		}
	},
	fence: ({ height = 8, width = 100, panelWidth = 6, style }) => {
		const panelCount = Math.ceil(width / panelWidth);

		// console.log(`Excess panel width: ${((width / panelWidth) - panelCount) * panelWidth}`)

		return {
			panel: {
				style,
				height,
				width: panelWidth,
				count: panelCount,
			},

			// End post
			post: {
				height: height + 2,
			},
		};
	},
	assemble: (recipe, options) => {
		const list = {};

		const addToList = (key, count = 1) => {
			// console.log('addToList', { key, count });

			if (!list[key]) list[key] = 0;

			list[key] += count;
		};

		const addIngredientToList = ({ ingredient, options = {}, count = options.count || 1 }) => {
			// console.log('addIngredientToList', { ingredient, options, count });

			for (let x = 0; x < count; ++x) {
				addToList(ingredient);

				if (build[ingredient]) addRecipeToList(build[ingredient](options));

				else if (!cost[ingredient]) throw new Error(`Unknown cost for: ${ingredient}`);

				else addToList('cost', cost[ingredient]);
			}
		};

		const addRecipeToList = (_recipe) => {
			// console.log('addRecipeToList', _recipe);
			if (typeof _recipe === 'string') return addIngredientToList({ ingredient: _recipe });

			(Array.isArray(_recipe) ? _recipe : Object.keys(_recipe)).forEach(ingredient => {
				if (typeof ingredient === 'object') return addRecipeToList(ingredient);

				const item = _recipe[ingredient];
				const options = typeof item === 'object' ? item : undefined;
				const count = typeof item === 'number' ? item : undefined;

				addIngredientToList({ ingredient, options, count });
			});
		};

		const printList = ({ _list = list, ...options } = {}) => {
			if (options.printAssemblies) {
				console.log('\n   Qty : Assembly\n-------------------------');

				Object.keys(_list).forEach(item => {
					if (item !== 'cost' && build[item]) console.log(`${leftPad(_list[item])} : ${item}`);
				});
			}

			console.log('\n   Qty :   Cost : Item\n-------------------------');
			Object.keys(_list).forEach(item => {
				if (item !== 'cost' && !build[item]) console.log(`${leftPad(_list[item])} : ${leftPad(formatDollars(cost[item] * _list[item]))} : ${item}`);
			});

			const tax = _list.cost * 0.10;

			if (options.printTax) {
				console.log(`\nPre Tax Cost: ${formatDollars(_list.cost)}`);
				console.log(`\nTax: ${formatDollars(tax)}`);
			}

			console.log(`\nTotal Cost: ${formatDollars(_list.cost + tax)}`);
		};

		recipe.forEach(addRecipeToList);

		printList(options);
	}
}

//- Recipe -//
// assembly: quantity

const tools = [
	{ '2 x 4 x 8': 6 },
	'post hole implement',
	'cement mixer',
	'miter saw',
];

const everything = [
	tools,

	{
		// Each driveway will need 2 x 12ft gates to span the 24ft driveway
		gate: 4,

		// Front (Center)
		fence: {
			width: 495,
		},
	},
	{
		// Front (East)
		fence: {
			width: 255,
		},
	},
	{
		// Front (West)
		fence: {
			width: 175,
		},
	},
	// {
	//  // Perimeter
	// 	fence: {
	// 		height: 6,
	// 		width: 2060,
	// 	},
	// },
];

const mvp = [
	tools,
	// east side
	// {
	// 	fence: {
	// 		height: 6,
	// 		style: 'single-overlap',
	// 		width: 42,
	// 	},
	// },
	// east gate (inside)
	{
		gate: 1,
		fence: {
			height: 6,
			style: 'single-overlap',
			width: 42,
		},
	},
	// east gate (outside)
	{
		gate: 1,
		fence: {
			height: 6,
			style: 'single-overlap',
			width: 36,
		},
	},
	// west gate (inside)
	// {
	// 	gate: 2,
	// 	fence: {
	// 		height: 6,
	// 		style: 'single-overlap',
	// 		width: 18,
	// 	},
	// },
];

const idea = [
	tools,
	// east gate (inside)
	{
		gate: 1,
		fence: {
			height: 6,
			style: 'single-overlap',
			width: 12,
		},
	},
	// east gate (outside)
	{
		gate: 1,
		fence: {
			height: 6,
			style: 'single-overlap',
			width: 24,
		},
	},
];

build.assemble(idea, { printAssemblies: false, printTax: false });