 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext('2d');

 // Set canvas dimensions
 canvas.width = 800;
 canvas.height = 600;

 // Player properties
 const player = {
  x: 50,
  y: 500,
  width: 20,
  height: 40,
  color: 'white',
  velocityY: 0,
  jumping: false
 };

 // Platform array
 const platforms = [{
  x: 0,
  y: 540,
  width: 800,
  height: 60,
  color: 'green'
 }];

 //Game variables
 let gravity = 0.5;

 // Function to draw the player
 function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
 }
 // Function to draw a platform
 function drawPlatform(platform) {
  ctx.fillStyle = platform.color;
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
 }

 // Function to update player position
 function updatePlayer() {
  // Apply gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Basic platform collision detection
  platforms.forEach(platform => {
   if (player.x < platform.x + platform.width &&
    player.x + player.width > platform.x &&
    player.y < platform.y + platform.height &&
    player.y + player.height > platform.y) {

    player.y = platform.y - player.height; //Correct position
    player.velocityY = 0; //Stop falling
    player.jumping = false; //Can jump again
   }
  });
 }

 //Game loop
 function gameLoop() {
  //Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Update player
  updatePlayer();

  //Draw Player
  drawPlayer();

  //Draw Platforms
  platforms.forEach(drawPlatform);

  //Call next frame
  requestAnimationFrame(gameLoop);
 }

 //Event listener for jumping
 document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !player.jumping) {
   player.velocityY = -15; //Jump force
   player.jumping = true;
  }
 });

 // Start the game loop
 gameLoop();
