class GameObject extends HTMLElement {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.speed = Math.random() * 2 + 1;
    }
    get Speed() { return this.speed; }
    set Speed(v) { this.speed = v; }
    get X() { return this.x; }
    set X(value) { this.x = value; }
    get Y() { return this.y; }
    set Y(value) { this.y = value; }
    get width() { return this.clientWidth; }
    get height() { return this.clientHeight; }
    move() {
        this.draw();
    }
    hasCollision(gameobject) {
        return (gameobject.X < this.X + this.width &&
            gameobject.X + gameobject.width > this.X &&
            gameobject.Y < this.Y + this.height &&
            gameobject.Y + gameobject.height > this.Y);
    }
    draw() {
        this.style.transform = `translate(${this.X}px,${this.Y}px)`;
    }
}
class Car extends GameObject {
    constructor(yIndex, game) {
        super();
        this.braking = false;
        this.stopped = false;
        this.game = game;
        this.X = 0;
        this.Y = (70 * yIndex) + 80;
        this.Speed = Math.random() * 2 + 1;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    handleMouseClick(e) {
        this.braking = true;
        this.changeColor(80);
    }
    handleKeyDown(e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    }
    move() {
        this.X += this.Speed;
        if (this.braking)
            this.Speed *= 0.98;
        if (this.Speed < 0.5)
            this.Speed = 0;
        if (this.Speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.game.addScore(this.X);
            this.braking = false;
            this.stopped = true;
        }
        super.move();
    }
    crash() {
        this.Speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
    onCollision(gameobject2) {
        if (gameobject2 instanceof Rock) {
            this.crash();
            this.game.gameOver();
        }
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.gameobjects = [];
        this.score = 0;
        this.request = 0;
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.addCarWithRock(i);
        }
        this.gameLoop();
    }
    addCarWithRock(index) {
        this.gameobjects.push(new Car(index, this));
        this.gameobjects.push(new Rock(index));
    }
    gameLoop() {
        for (const gameObject of this.gameobjects) {
            gameObject.move();
        }
        this.checkCollision();
        this.request = requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        for (const gameobject1 of this.gameobjects) {
            for (const gameobject2 of this.gameobjects) {
                if (gameobject1.hasCollision(gameobject2)) {
                    gameobject1.onCollision(gameobject2);
                }
            }
        }
    }
    gameOver() {
        console.log("Game over");
        this.gameover = true;
        document.getElementById("score").innerHTML = "Game Over";
        cancelAnimationFrame(this.request);
    }
    addScore(x) {
        if (!this.gameover) {
            this.score += Math.floor(x);
            this.draw();
        }
    }
    draw() {
        document.getElementById("score").innerHTML = "Score : " + this.score;
    }
}
window.addEventListener("load", () => new Game());
class Rock extends GameObject {
    constructor(index) {
        super();
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.X = Math.random() * 400 + 400;
        this.Y = (70 * index) + 80;
        this.Speed = 0;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    move() {
        this.X += this.Speed;
        this.Y += this.g;
        this.Speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.Y + this.clientHeight > document.getElementById("container").clientHeight) {
            this.Speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        super.move();
    }
    crashed(carSpeed) {
        this.g = 9.81;
        this.Speed = carSpeed;
        this.rotationSpeed = 5;
    }
    onCollision(gameobject2) {
        if (gameobject2 instanceof Car) {
            this.crashed(gameobject2.Speed);
        }
    }
}
window.customElements.define("rock-component", Rock);
class Wheel extends HTMLElement {
    constructor(car, offsetCarX) {
        super();
        this.style.transform = `translate(${offsetCarX}px, 30px)`;
        car.appendChild(this);
    }
}
window.customElements.define("wheel-component", Wheel);
//# sourceMappingURL=main.js.map