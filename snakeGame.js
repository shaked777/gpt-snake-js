class SnakeGame {
  constructor() {
    // Get the canvas element and set up the context
    this.canvas = document.getElementById("snake-game");
    this.ctx = this.canvas.getContext("2d");

    // Set the initial game variables
    this.score = -1;
    this.gameOver = false;
    this.direction = "right";
    this.snake = [
      { x: 128, y: 128 },
      { x: 112, y: 128 },
      { x: 96, y: 128 },
      { x: 80, y: 128 },
      { x: 64, y: 128 },
      { x: 48, y: 128 },
      { x: 32, y: 128 },
      { x: 16, y: 128 },
    ];
    this.food = { x: 128, y: 128 };

    // Set up the event listeners for keystrokes
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37: // Left arrow key
          this.direction = "left";
          break;
        case 38: // Up arrow key
          this.direction = "up";
          break;
        case 39: // Right arrow key
          this.direction = "right";
          break;
        case 40: // Down arrow key
          this.direction = "down";
          break;
      }
    });
  }

  update() {
    // Update the position of the snake based on the current direction
    var head = this.snake[0];
    var newHead;
    switch (this.direction) {
      case "up":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "down":
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case "left":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "right":
        newHead = { x: head.x + 1, y: head.y };
        break;
    }
    console.log(this.gameOver);
    // Check for collisions with walls or with the snake itself
    if (
      newHead.x < 0 ||
      newHead.x >= this.canvas.width ||
      newHead.y < 0 ||
      newHead.y >= this.canvas.height ||
      this.checkCollision(newHead, this.snake)
    ) {
      this.gameOver = true;
      console.log(this.gameOver);
    }
    // Add a check for the value of gameOver
    if (this.gameOver) {
      // Do something when the game is over, for example:
      if (this.gameOver) {
        // Hide the canvas element
        this.canvas.style.display = "none";

        // Show the game over page
        document.getElementById("game-over").style.display = "block";

        // Display the score
        document.getElementById("final-score").textContent = this.score;

        // Add a restart button event listener
        document
          .getElementById("restart-button")
          .addEventListener("click", () => {
            // Reset the game variables and start the game again
            this.gameOver = false;
            this.score = 0;
            this.direction = "right";
            this.snake = [
              { x: 160, y: 160 },
              { x: 144, y: 160 },
              { x: 128, y: 160 },
            ];
            this.food = { x: 320, y: 320 };

            // Show the canvas element and hide the game over page
            this.canvas.style.display = "block";
            document.getElementById("game-over").style.display = "none";
          });
      }
    } else {
      // Check if the snake has eaten the food
      if (
        Math.abs(newHead.x - this.food.x) < 8 &&
        Math.abs(newHead.y - this.food.y) < 8
      ) {
        // If the snake has eaten the food, create a new food item and increase the score
        console.log("yes");
        this.createFood();
        this.score++;
        this.snake.push({ x: head.x, y: head.y });
      } else {
        // If the snake has not eaten the food, remove the tail
        this.snake.pop();
      }
      // Add the new head to the front of the snake
      this.snake.unshift(newHead);
    }
  }

  // Method to draw the game on the canvas
  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Create the gradient
    var gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);

    // Add color stops to the gradient
    gradient.addColorStop(0, "lightgreen");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "darkgreen");

    // Set the fill style to the gradient
    this.ctx.fillStyle = gradient;

    // Draw the snake segments
    this.snake.forEach((segment) => {
      this.ctx.fillRect(segment.x, segment.y, 16, 16);
    });

    // Draw the food
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.food.x, this.food.y, 16, 16);

    // Draw the score
    this.ctx.fillStyle = "black";
    this.ctx.font = '24px "Press Start 2P"';
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(`Score: ${this.score}`, 16, 16);
  }

  // Method to create a new food item
  createFood() {
    // Generate random x and y coordinates for the food item
    this.food = {
      x: Math.floor(Math.random() * (this.canvas.width - 16)) + 8,
      y: Math.floor(Math.random() * (this.canvas.height - 16)) + 8,
    };

    // Check if the food item is colliding with the snake
    if (this.checkCollision(this.food, this.snake)) {
      // If the food item is colliding with the snake, create a new food item
      this.createFood();
    }
  }

  checkCollision(newHead, snake) {
    return snake.some((segment) => {
      return newHead.x === segment.x && newHead.y === segment.y;
    });
  }

  // Method to end the game
  gameOver() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Display the game over message
    this.ctx.fillStyle = "white";
    this.ctx.font = "48px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Game Over!",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }

  // Method to start the game
  start() {
    // Set up the game loop
    const loop = () => {
      // Update the game state
      this.update();

      // Redraw the game
      this.draw();

      // Call the loop function again to create a loop
      requestAnimationFrame(loop);
    };

    // Set up the event listener for keystrokes
    document.addEventListener("keydown", (event) => {
      // Update the direction property based on the key pressed
      switch (event.keyCode) {
        case 37:
          this.direction = "left";
          break;
        case 38:
          this.direction = "up";
          break;
        case 39:
          this.direction = "right";
          break;
        case 40:
          this.direction = "down";
          break;
      }
    });

    // Start the game loop
    loop();
  }
}

// Create a new instance of the SnakeGame class and start the game
const game = new SnakeGame();
game.start();
