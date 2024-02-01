import {Background} from "./background.js";
import {Player} from "./player.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.speed = 0;

        this.background = new Background(this);
        this.player = new Player(this);
    }

    update(deltaTime) {
        this.background.update();
        this.player.update(deltaTime);
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
    }
}