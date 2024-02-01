class Enemy {
    constructor() {
        this.frameX = 8;
        this.frameY = 1;
        this.maxFrame = 5;

        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.markedForDeletion = false;
    }

    update(deltaTime) {
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;

        //sprite animation
        if(this.frameTimer > this.frameInterval) {
            if(this.frameX < this.maxFrame) {
                ++this.frameX;
            }
            else {
                this.frameX = 8;
            }
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }

        //check if off-screen
        if(this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.drawImage(this.image,    this.frameX * this.SpriteWidth, this.frameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight,    this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;

        this.SpriteWidth = 128;
        this.SpriteHeight = 128;

        this.width = this.SpriteWidth * 3.5;
        this.height = this.SpriteHeight * 3.5;

        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5;

        this.speedX = Math.random() + 1;
        this.speedY = 0;

        this.maxFrame = 13;

        this.image = document.getElementById('enemy_firespirit');

        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}