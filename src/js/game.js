import {Background} from "./background.js";
import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {FlyingEnemy} from "./enemies.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.maxSpeed = 10;

        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);

        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
    }

    update(deltaTime) {
        this.background.update();
        this.player.update(deltaTime, this.input);

        this.handleEnemies(deltaTime);
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }

    handleEnemies(deltaTime) {
        if(this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
        });
    }

    addEnemy() {
        // if(this.speed > 0 && Math.random() < 0.5) {
        //     this.enemies.push(new GroundEnemy(this));
        // }
        // else if(this.speed > 0) {
        //     this.enemies.push(new ClimbingEnemy(this));
        // }
        this.enemies.push(new FlyingEnemy(this));
    }
}