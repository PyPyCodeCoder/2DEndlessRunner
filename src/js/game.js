import {Background} from "./background.js";
import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {FlyingEnemy, StayingEnemy} from "./enemies.js";
import {UI} from "./UI.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.maxSpeed = 10;

        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.UI = new UI(this);

        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;

        this.collisions = [];

        this.score = 0;
        this.lives = 5;

        this.fontColor = 'white';

        this.time = 0;
        this.maxTime = 30000;
        this.winningScore = 5;
        this.gameOver = false;
    }

    update(deltaTime) {
        this.time += deltaTime;
        if(this.time > this.maxTime || this.score >= this.winningScore) {
            this.gameOver = true;
        }

        this.background.update();

        this.player.update(deltaTime, this.input);

        this.handleEnemies(deltaTime);

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    draw(context) {
        this.background.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        this.player.draw(context);
        this.UI.draw(context);
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
        if(this.speed > 0 && Math.random() < 0.5) {
            this.enemies.push(new StayingEnemy(this));
        }
        this.enemies.push(new FlyingEnemy(this));
    }
}