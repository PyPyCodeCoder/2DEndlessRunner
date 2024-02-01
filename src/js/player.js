export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('player');

        this.SpriteWidth = 128;
        this.SpriteHeight = 128;

        this.width = this.SpriteWidth * 3.5;
        this.height = this.SpriteHeight * 3.5;

        this.x = 0;
        this.y = this.game.height - this.height;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;

        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.maxSpeed = 5;

        this.vy = 0;
        this.jumpPower = 30;
        this.weight = 1;
    }

    update(deltaTime, input) {
        this.horizontalMovement(input);
        this.horizontalBoundaries();

        this.verticalMovement();
        this.verticalBoundaries();

        this.spiteAnimation(deltaTime);
    }

    draw(context) {
        context.drawImage(this.image,    this.frameX * this.SpriteWidth, this.frameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight,    this.x, this.y, this.width, this.height);
    }

    spiteAnimation(deltaTime) {
        if(this.frameTimer > this.frameInterval) {
            if(this.frameX < this.maxFrame) {
                ++this.frameX;
            }
            else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }

    horizontalMovement(input) {
        this.x += this.speed;
        if(input.keys.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else if(input.keys.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else {
            this.speed = 0;
        }
    }

    horizontalBoundaries() {
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    }

    verticalMovement() {
        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        }
        else this.vy = 0;
    }

    verticalBoundaries() {
        if(this.y > this.game.height - this.height) {
            this.y =  this.game.height - this.height;
        }
    }
}