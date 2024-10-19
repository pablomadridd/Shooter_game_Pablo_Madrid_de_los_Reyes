class Boss extends Opponent {
    constructor(game) {
        const height = OPPONENT_HEIGHT * 2 * game.width / 100,  // Más grande que el oponente normal
              width = OPPONENT_WIDTH * 2 * game.width / 100,
              x = getRandomNumber(game.width - width / 2),
              y = 0,
              speed = OPPONENT_SPEED * 2,  // Más rápido que el oponente normal
              myImage = "assets/boss.png",  // Imagen del jefe final
              myImageDead = "assets/boss_dead.png";  // Imagen cuando el jefe muere

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R"; // El jefe también se mueve
    }
}