/**
 * Main character of the game. Inherits from the Character class
 * @extends Character
 */
class Player extends Character {
    /**
    * Initializes a player
    * @param game {Game} The instance of the game to which the player belongs
    */

    constructor (game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.lives = INITIAL_LIVES;  // Inicializa el atributo de vidas
    }

    /**
     * Update the position attributes of the player and the shots based on the keys pressed
     */
    update () {
        if (!this.dead) {
            switch (this.game.keyPressed) {
            case KEY_LEFT:
                if (this.x > this.speed) {
                    this.x -= this.speed;
                }
                break;
            case KEY_RIGHT:
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                }
                break;
            case KEY_SHOOT:
                this.game.shoot(this);
                break;
            }
        }
    }

    /**
     * Kill the player
     */
    collide() {
        if (!this.dead) {
            this.lives--;  // Reducir una vida
            this.game.updateLives();  // Actualiza el contador de vidas en la pantalla
    
            if (this.lives > 0) {
                console.log(`Jugador golpeado, le quedan ${this.lives} vidas`);
                
                // El jugador "muere" temporalmente y revive después de 2 segundos
                this.image.src = this.myImageDead;  // Cambia la imagen a "muerto"
                this.dead = true;  // Marca al jugador como muerto
                setTimeout(() => {
                    this.image.src = this.myImage;  // Revive después de 2 segundos
                    this.dead = false;  // Marca al jugador como vivo de nuevo
                }, 2000);
            } else {
                console.log('Jugador sin vidas, fin del juego');
                // Si no tiene vidas, muere permanentemente
                super.collide();  // Llama al método de la clase padre para manejar la muerte
                this.game.endGame();  // Finaliza el juego
            }
        }
    }
}