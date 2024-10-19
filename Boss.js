class Boss extends Opponent {
    constructor(game) {
        const height = OPPONENT_HEIGHT * 2 * game.width / 100,  // Más grande que el oponente normal
              width = OPPONENT_WIDTH * 2 * game.width / 100,
              x = getRandomNumber(game.width - width),  // Asegura que el Boss esté dentro de los límites horizontales
              y = 0,  // El Boss aparecerá en la parte superior
              speed = OPPONENT_SPEED * 2,  // Más rápido que el oponente normal
              myImage = BOSS_PICTURE,  // Imagen del jefe final
              myImageDead = BOSS_DEAD_PICTURE;  // Imagen cuando el jefe muere

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R"; // El jefe también se mueve hacia la derecha inicialmente
    }
}