class Game {
    constructor () {
        this.started = false;
        this.ended = false;
        this.keyPressed = undefined;
        this.width = 0;
        this.height = 0;
        this.player = undefined;
        this.playerShots = [];
        this.opponent = undefined;
        this.opponentShots = [];
        this.xDown = null;
        this.paused = false;
        this.score = 0;
    }

    start () {
        if (!this.started) {
            window.addEventListener("keydown", (e) => this.checkKey(e, true));
            window.addEventListener("keyup", (e) => this.checkKey(e, false));
            window.addEventListener("touchstart", (e) => this.handleTouchStart(e, true));
            window.addEventListener("touchmove", (e) => this.handleTouchMove(e, false));
            document.getElementById("pause").addEventListener("click", () => {
                this.pauseOrResume();
            });
            document.getElementById("reset").addEventListener("click", () => {
                this.resetGame();
            });
            this.started = true;
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.player = new Player(this);
            this.timer = setInterval(() => this.update(), 50);
        }
    }

    pauseOrResume() {
        if (this.paused) {
            this.timer = setInterval(() => this.update(), 50);
            document.body.classList.remove('paused');
            this.paused = false;
        } else {
            clearInterval(this.timer);
            document.body.classList.add('paused');
            this.paused = true;
        }
    }

    shoot (character) {
        const arrayShots = character instanceof Player ? this.playerShots : this.opponentShots;
        arrayShots.push(new Shot(this, character));
        this.keyPressed = undefined;
    }

    removeShot(shot) {
        const shotsArray = shot.type === "PLAYER" ? this.playerShots : this.opponentShots,
              index = shotsArray.indexOf(shot);
    
        if (index > -1) {
            shotsArray.splice(index, 1);
            document.body.removeChild(shot.image);
        }
    }

    removeOpponent() {
        // Si ya hay un oponente, elimínalo de la pantalla
        if (this.opponent) {
            document.body.removeChild(this.opponent.image);
            this.opponent = null;
        }
    
        // Si el puntaje es mayor que 0, crea el Boss y asegúrate de que no vuelvan a aparecer triángulos
        if (this.score > 0 && !(this.opponent instanceof Boss)) {
            this.opponent = new Boss(this);  // Crear el Boss
        } else if (this.score === 0) {
            this.opponent = new Opponent(this);  // Crear el primer triángulo
        }
    
        // Renderizar al nuevo oponente (Boss o triángulo)
        if (this.opponent) {
            this.opponent.render();
        }
    }

    



    checkKey (event, isKeyDown) {
        if (!isKeyDown) {
            this.keyPressed = undefined;
        } else {
            switch (event.keyCode) {
                case 37:
                    this.keyPressed = "LEFT";
                    break;
                case 32:
                    this.keyPressed = "SHOOT";
                    break;
                case 39:
                    this.keyPressed = "RIGHT";
                    break;
                case 27:
                case 81:
                    this.pauseOrResume();
            }
        }
    }

    checkCollisions () {
        let impact = false;

        for (let i = 0; i < this.opponentShots.length; i++) {
            impact = impact || this.hasCollision(this.player, this.opponentShots[i]);
        }
        if (impact || this.hasCollision(this.player, this.opponent)) {
            this.player.collide();
        }

        let killed = false;

        for (let i = 0; i < this.playerShots.length; i++) {
            if (this.hasCollision(this.opponent, this.playerShots[i])) {
                killed = true;
                this.opponent.collide(this.playerShots[i]);
                this.removeShot(this.playerShots[i]);
                break;
            }
        }

        if (killed) {
            this.opponent.collide();
        }
    }

    hasCollision (item1, item2) {
        if (!item2) return false;
        const b1 = item1.y + item1.height,
              r1 = item1.x + item1.width,
              b2 = item2.y + item2.height,
              r2 = item2.x + item2.width;

        return !(b1 < item2.y || item1.y > b2 || r1 < item2.x || item1.x > r2);
    }

    endGame() {
        this.ended = true;
        let imageToShow = (this.player.lives > 0 && this.opponent instanceof Boss) 
                          ? "assets/you_win.png" 
                          : GAME_OVER_PICTURE;
        let gameOver = new Entity(this, this.width / 2, "auto", this.width / 4, this.height / 4, 0, imageToShow);
        gameOver.render();
    }

    resetGame () {
        document.location.reload();
    }

    update() {
        if (!this.ended) {
            this.player.update();
            
            if (!this.opponent) {
                this.removeOpponent();
            } else {
                this.opponent.update();
            }

            this.playerShots.forEach((shot) => shot.update());
            this.opponentShots.forEach((shot) => shot.update());

            this.checkCollisions();
            this.render();
        }
    }

    render() {
        this.player.render();
        if (this.opponent) {
            this.opponent.render();
        }
        this.playerShots.forEach((shot) => shot.render());
        this.opponentShots.forEach((shot) => shot.render());
    }

    updateScore() {
        document.getElementById('scoreli').innerHTML = `Score: ${this.score}`;
    }

    updateLives() {
        document.getElementById('livesli').innerHTML = `Lives: ${this.player.lives}`;
    }
}
