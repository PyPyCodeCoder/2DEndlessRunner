class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;

        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x < -this.width) {
            this.x = 0;
        }
        else {
            this.x -= this.game.speed * this.speedModifier;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 1080;
        this.layer1 = document.getElementById('layer1');
        this.layer2 = document.getElementById('layer2');
        this.layer3 = document.getElementById('layer3');
        this.layer4 = document.getElementById('layer4');
        this.layer5 = document.getElementById('layer5');
        this.l1 = new Layer(this.game, this.width, this.height, 0.2, this.layer1);
        this.l2 = new Layer(this.game, this.width, this.height, 0.4, this.layer2);
        this.l3 = new Layer(this.game, this.width, this.height, 0.6, this.layer3);
        this.l4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4);
        this.l5 = new Layer(this.game, this.width, this.height, 1, this.layer5);
        this.backgroundLayers = [this.l1, this.l2, this.l3, this.l4, this.l5];
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }

    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
}
