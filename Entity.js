/**
 * Each of the game elements
 */
class Entity {
    /**
     * Initializes a game element
     * @param game {Game} The instance of the game to which the element belongs
     * @param width {Number} Width of the element
     * @param height {Number} Height of the element
     * @param x {Number} Horizontal position of the element
     * @param y {Number} Vertical position of the element
     * @param speed {Number} Speed of the element
     * @param myImage {String} Path to the element's image
     */
    constructor (game, width, height, x, y, speed, myImage) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.myImage = myImage;
        this.image = new Image();
        this.image.src = this.myImage;
        this.image.className =  this.constructor.name;
        this.image.style.position = "absolute";
        this.image.style.height = this.height === "auto" ? "auto" : `${this.height}px`;
        this.image.style.width = this.width === "auto" ? "auto" : `${this.width}px`;
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
        document.body.appendChild(this.image);
    }

    remove() {
      document.body.removeChild(this.image);
    }

    /**
     * Updates the element's position on the screen
     */
    render () {
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
    }
}

