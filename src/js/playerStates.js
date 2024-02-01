const states = {
    IDLE: 0,
    RUN: 1,
    JUMP: 2,
    ATTACK: 3,
    HIT: 4,
    DEAD: 5,
};

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Idle extends State {
    constructor(game) {
        super('IDLE', game);
    }

    enter() {
        this.game.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 0;
    }

    handleInput(input) {
        if(input.keys.includes('ArrowLeft') || input.keys.includes('ArrowRight')) {
            this.game.player.setState(states.RUN, 1);
        }
        else if(input.keys.includes('ArrowUp')) {
            this.game.player.setState(states.JUMP, 0);
        }
        else if(input.keys.includes('Enter')) {
            this.game.player.setState(states.ATTACK, 0);
        }
    }
}

export class Run extends State {
    constructor(game) {
        super('RUN', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 2;
    }

    handleInput(input) {
        if(input.keys.includes('ArrowUp')) {
            this.game.player.setState(states.JUMP, 0);
        }
        else if(input.keys.includes('Enter')) {
            this.game.player.setState(states.ATTACK, 0);
        }
    }
}

export class Jump extends State {
    constructor(game) {
        super('JUMP', game);
    }

    enter() {
        if(this.game.player.onGround()) {
            this.game.player.vy -= this.game.player.jumpPower;
        }
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 3;
    }

    handleInput(input) {
        if(input.keys.includes('Enter')) {
            this.game.player.setState(states.ATTACK, 0);
        }
        else if(this.game.player.onGround()) {
            this.game.player.setState(states.IDLE, 0);
        }
    }
}

export class Attack extends State {
    constructor(game) {
        super('ATTACK', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 4;
    }

    handleInput(input) {
        if(this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
            this.game.player.setState(states.IDLE, 0);

        }
        else if(this.game.player.frameX >= this.game.player.maxFrame && !this.game.player.onGround()) {
            this.game.player.setState(states.JUMP, 0);
        }
    }
}

export class Hit extends State {
    constructor(game) {
        super('HIT', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 2;
        this.game.player.frameY = 8;
    }

    handleInput(input) {
        if(this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
            this.game.player.setState(states.IDLE, 0);

        }
        else if(this.game.player.frameX >= this.game.player.maxFrame && !this.game.player.onGround()) {
            this.game.player.setState(states.JUMP, 0);
        }
    }
}

export class Dead extends State {
    constructor(game) {
        super('DEAD', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 2;
        this.game.player.frameY = 9;
    }

    handleInput(input) {

    }
}