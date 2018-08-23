//apply gravity to a game object
function gravity(gameObject)
{
	//gravity
	gameObject.dy += 0.01;
	//add sideways friction when touching the ground
	if (gameObject.y > 600 - gameObject.height / 2) gameObject.dx *= 0.8;
}

//prevent a game object from leaving the level's bounds
function lockToLevel(gameObject)
{
	if (gameObject.x + gameObject.width  / 2 > 800){ gameObject.x = 800 - gameObject.width  / 2; gameObject.dx = 0;}
	if (gameObject.x - gameObject.width  / 2 < 0  ){ gameObject.x = 0   + gameObject.width  / 2; gameObject.dx = 0;}
	if (gameObject.y + gameObject.height / 2 > 600){ gameObject.y = 600 - gameObject.height / 2; gameObject.dy = 0;}
	if (gameObject.y - gameObject.height / 2 < 0  ){ gameObject.y = 0   + gameObject.height / 2; gameObject.dy = 0;}
}

//wrap a game object around the other side of a level's bounds
function wrapAroundLevel(gameObject)
{
	if (gameObject.x > 800) gameObject.x = 0;
	if (gameObject.x < 0  ) gameObject.x = 800;
	if (gameObject.y > 600) gameObject.y = 0;
	if (gameObject.y < 0  ) gameObject.y = 600;
}

function follow(gameObject, gameObjectToFollow)
{
	gameObject.dx = (gameObject.x - gameObjectToFollow.x) * 0.01;
	gameObject.dy = (gameObject.y - gameObjectToFollow.y) * 0.01;
}