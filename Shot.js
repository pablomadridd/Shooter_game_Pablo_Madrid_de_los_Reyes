/**
 * Shot of a Character. Inherits from the Entity class
 */
class Shot extends Entity {
    /**
    * Initializes a shot
    * @param game {Game} The instance of the game to which the character belongs
     * @param character {Character} Game character that fires the shot
    */

    constructor (game, character) {
        const width = SHOT_WIDTH * game.width / 100;
        const height = SHOT_HEIGHT * game.width / 100;
        const x = character.x + character.width / 2 - width / 2;
        const y = character.y + character.height - character.height / 2;
        const speed = SHOT_SPEED;
        const myImage = character instanceof Player ? SHOT_PICTURE_PLAYER : SHOT_PICTURE_OPPONENT;
        super(game, width, height, x, y, speed, myImage);
        this.type = character instanceof Player ? "PLAYER" : "ENEMY"; // Type of character that fires the shot
    }
    /**
     * Update the position attributes of the shot
     */
    update () {
        if (this.type === "PLAYER") {
            this.y = this.y - this.speed; // Goes up
        } else {
            this.y = this.y + this.speed; // Goes down
        }
        if (this.y < 0 || this.y > this.game.height) {
            this.game.removeShot(this);
            document.body.removeChild(this.image);
        }
    }
}