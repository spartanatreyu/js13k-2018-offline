//input loop
let mouseHeld = false;
let objectSelected = null;
let selectionRadius = 30; // in canvas pixels
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mousemove', mousemove);
canvas.addEventListener('mouseup', mouseup);

function mousedown(e) {
	mouseHeld = true;
	window.console.log('click at: ' + e.offsetX + ', ' + e.offsetY);

	//when checking for a click, loop through all objects comparing the click location with each object's location.
	//loop through game objects here
	for (let loopIterator = 0; loopIterator < gameObjects.length; loopIterator++) {
		const currentObject = gameObjects[loopIterator];
		window.console.log('checking ' + loopIterator);
		if (currentObject.entityType === 'draggable' || currentObject.entityType === 'placeable') {
			if (Math.abs(currentObject.x - e.offsetX) < selectionRadius &&
				Math.abs(currentObject.y - e.offsetY) < selectionRadius) {
				objectSelected = loopIterator;
				currentObject.isHeld = true;
				currentObject.dragX = e.offsetX;
				currentObject.dragY = e.offsetY;
				window.console.log('Entity: "' + objectSelected + '" is draggable.');

				//When a match is found, stop searching the loop so we only have one object selected
				break;
			}
		}
	}
}

function mousemove(e) {
	if (mouseHeld === true && objectSelected !== null) {
		gameObjects[objectSelected].dragX = e.offsetX;
		gameObjects[objectSelected].dragY = e.offsetY;
		// window.console.log('drag to: ' + e.offsetX + ', ' + e.offsetY);
	}
}

function mouseup(e) {
	window.console.log(gameObjects[objectSelected]);

	//remove all momentum from placeable objects
	if (gameObjects[objectSelected].entityType === 'placeable')
	{
		gameObjects[objectSelected].dx = 0;
		gameObjects[objectSelected].dy = 0;
	}

	//reset everything
	mouseHeld = false;
	if (objectSelected !== null) {
		gameObjects[objectSelected].isHeld = false;
		objectSelected = null;
	}
	window.console.log('drag end at: ' + e.offsetX + ', ' + e.offsetY);
}
