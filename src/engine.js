/*

This is the game engine script.

It handles initialization, draw loop, game loop and input

*/

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
const gameObjects = [];
let currentTime;

//the default game object
function entity(entityType, x, y, width, height)
{
	this.entityType = entityType; //float, draggable
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 50;
	this.height = height || 50;
	gameObjects.push(this);
	window.console.log('entity added to game at: ' + this.x + ', ' + this.y);

	this.step = function(dt)
	{
		switch (this.entityType) {
			case 'draggable':
				if (this.isHeld === true)
				{
					this.x = this.dragX;
					this.y = this.dragY;
				}
				break;
			case 'float':
			default:
				//float right and wrap left
				this.x += 0.25 * dt;
				if (this.x > 800)
				{
					this.x = -50;
				}
				break;
		}
	};
	this.draw = function(dt)
	{
		ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
	};
}

//the game loop
function update(timestamp)
{
	//calculate time since last frame, time may go weird when switching tabs
	if(!currentTime)
	{
		currentTime = timestamp;
	}
	let deltaTime = timestamp - currentTime;

	ctx.clearRect(0,0,800,600);

	//loop through game objects here
	for (let loopIterator = 0; loopIterator < gameObjects.length; loopIterator++)
	{
		const currentObject = gameObjects[loopIterator];
		currentObject.step(deltaTime);
		currentObject.draw(deltaTime);
	}

	//reset timestamp and queue another frame
	currentTime = timestamp;
	window.requestAnimationFrame(update);
}

//input loop
let mouseHeld = false;
let objectSelected = null;
let selectionRadius = 30; // in canvas pixels
canvas.addEventListener('mousedown',mousedown);
canvas.addEventListener('mousemove',mousemove);
canvas.addEventListener('mouseup',mouseup);

function mousedown(e)
{
	mouseHeld = true;
	window.console.log('click at: ' + e.offsetX + ', ' + e.offsetY);
	
	//when checking for a click, loop through all objects comparing the click location with each object's location.
	//loop through game objects here
	for (let loopIterator = 0; loopIterator < gameObjects.length; loopIterator++)
	{
		const currentObject = gameObjects[loopIterator];
		window.console.log('checking '+ loopIterator);
		if(currentObject.entityType === 'draggable')
		{
			if (Math.abs(currentObject.x - e.offsetX) < selectionRadius &&
				Math.abs(currentObject.y - e.offsetY) < selectionRadius)
			{
				objectSelected = loopIterator;
				currentObject.isHeld = true;
				currentObject.dragX = e.offsetX;
				currentObject.dragY = e.offsetY;
				window.console.log('Entity: ' + objectSelected + 'is draggable.');
				
				//When a match is found, stop searching the loop so we only have one object selected
				break;
			}
		}
	}
}

function mousemove(e)
{
	if (mouseHeld === true && objectSelected !== null)
	{
		gameObjects[objectSelected].dragX = e.offsetX;
		gameObjects[objectSelected].dragY = e.offsetY;
		window.console.log('drag to: ' + e.offsetX + ', ' + e.offsetY);
	}
}

function mouseup(e)
{
	mouseHeld = false;
	if(objectSelected !== null)
	{
		gameObjects[objectSelected].isHeld = false;
		objectSelected = null;
	}
	window.console.log('drag end at: ' + e.offsetX + ', ' + e.offsetY);
}

//create some game objects
new entity('float',      50, 100, 30, 30);
new entity('draggable', 300, 300, 50, 50);
new entity('float',     400, 500, 30, 30);
new entity('float',     500, 550, 30, 30);

//kick off the update loop now
window.requestAnimationFrame(update);