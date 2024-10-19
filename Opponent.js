/**
 * Monster to destroy
 */
class Opponent extends Character {
    /**
     * @param game {Game} The instance of the game to which the opponent belongs
     */
    constructor (game) {
        const height = OPPONENT_HEIGHT * game.width / 100,
            width = OPPONENT_WIDTH * game.width / 100,
            x = getRandomNumber(game.width - width / 2),
            y = 0,
            speed = OPPONENT_SPEED,
            myImage = OPPONENT_PICTURE,
            myImageDead = OPPONENT_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R"; // Direction in which the opponent is moving
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    /**
     * Create a new shot
     */
    shoot () {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
        }
    }

    /**
     * Update the opponent's position attributes
     */
    update () {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // To the right
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Change direction
            }
        }
    }

    collide(shot) {
        if (shot.type === 'PLAYER') {  // Solo si el disparo es del jugador
            console.log('Oponente golpeado por disparo del jugador');
            
            // Aumentar el puntaje
            this.game.score += 1; 
            this.game.updateScore();
    
            // El oponente debería morir
            this.die();
        }
    }

    die() {
        console.log('El oponente ha muerto y se convierte en estrella');
        
        // Cambia la imagen del oponente a una estrella
        this.image.src = OPPONENT_PICTURE_DEAD;  // Imagen de estrella
        this.dead = true;
    
        // Después de 2 segundos, elimina al oponente y crea uno nuevo
        setTimeout(() => {
            this.remove();  // Elimina el oponente
            console.log('Oponente eliminado');
            this.game.removeOpponent();  // Llama a la función para generar un nuevo oponente
        }, 2000);  // Tiempo que la estrella permanece visible
    }
}