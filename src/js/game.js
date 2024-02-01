import {Background} from "./background.js";
import {Player} from "./player.js";
import {InputHandler} from "./input.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.speed = 0;

        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
    }

    update(deltaTime) {
        this.background.update();
        this.player.update(deltaTime, this.input);
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
    }
}