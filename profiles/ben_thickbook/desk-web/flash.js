// Plays the page's SWF from archive.org in a Ruffle of our own rather than the item's embed, whose
// player picks webgpu or webgl when it can. On the HD 4000 Chrome serves those in software, and the
// game freezes the moment its loader hands over. The canvas renderer is plain 2d, which this machine
// keeps up with at the swf's own size - so the stage is never scaled.
window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
	preferredRenderer: 'canvas',
	autoplay: 'on',
	unmuteOverlay: 'hidden',
	splashScreen: false,
	contextMenu: 'off',
};

addEventListener('load', () => {
	const player = window.RufflePlayer.newest().createPlayer();

	player.style.width = '800px';
	player.style.height = '600px';
	document.body.append(player);

	player.addEventListener('loadedmetadata', () => {
		const { width, height } = player.ruffle().metadata;

		if (width > 0 && height > 0) {
			player.style.width = `${width}px`;
			player.style.height = `${height}px`;
		}
	});

	// The cors path answers a file:// page, which the plain download does not
	player.ruffle().load({ url: `https://archive.org/cors/${document.body.dataset.swf}` });
});
