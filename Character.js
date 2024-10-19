/**
 *  Each of the characters in the game, that is, those elements that have "life."
 *  @extends Entity
 */
class Character extends Entity {
    /**
     * Initializes a character
     * @param game {Game} The instance of the game to which the character belongs
     * @param width {Number} Width of the character
     * @param height {Number} Height of the character
     * @param x {Number} Horizontal position of the character
     * @param y {Number} Vertical position of the character
     * @param speed {Number} Speed of the character
     * @param myImage {String} Path to the character's image
     * @param myImageDead {String} Path to the character's image when it dies
     */
    constructor (game, width, height, x, y, speed, myImage, myImageDead) {
        super(game, width, height, x, y, speed, myImage);
        this.dead = false; // Indicates whether the character is alive or dead
        this.myImageDead = myImageDead;
    }

    /**
     * Kills a character
     */
    collide() {
        this.image.src = this.myImageDead;
        this.dead = true;
    }
}


