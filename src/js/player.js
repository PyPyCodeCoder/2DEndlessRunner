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
    }

    update(deltaTime) {
        this.x += 1;

        //sprite animation
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

    draw(context) {
        context.drawImage(this.image,    this.frameX * this.SpriteWidth, this.frameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight,    this.x, this.y, this.width, this.height);
    }
}