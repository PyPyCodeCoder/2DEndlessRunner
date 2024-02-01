export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 60;
        this.fontFamily = 'Arial';
        this.livesImage = document.getElementById('heart');
    }

    draw(context) {
        context.save();

        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'gray';
        context.shadowBlur = 0;

        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        //score
        context.fillText('Score: ' + this.game.score, 20, 50);

        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 120);

        //lives
        for(let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 140, 25, 25);
        }

        //end of the game
        if(this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score >= this.game.winningScore) {
                context.fillText('You won!', this.game.width * 0.5, this.game.height * 0.5);
            }
            else {
                context.fillText('You lost :(', this.game.width * 0.5, this.game.height * 0.5);
            }
        }
        context.restore();
    }
}