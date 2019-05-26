/// <reference path="car.ts"/>

class Game {
    // Static fields
    private static instance : Game

    // Fields
    private gameObjects : GameObject[]  = []
    private score       : number        = 0
    private request     : number        = 0
    private gameover    : boolean       = false

    // Static Properties
    public static get Instance() : Game {
        if(!Game.instance) Game.instance = new Game()
        return Game.instance
    }

    private constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        this.gameLoop()
    }

    private addCarWithRock(index : number) {
        this.gameObjects.push(new Car(index))
        this.gameObjects.push(new Rock(index))

    }

    private gameLoop(){

        for(let gameObject of this.gameObjects){
            gameObject.move()
        }

        this.checkCollision()
        
        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {
        for(let gameObject of this.gameObjects) {
            if (gameObject instanceof Car) {
                var car = gameObject as Car 
                for(let gameObject2 of this.gameObjects) {
                    if (gameObject2 instanceof Rock) {
                        var rock = gameObject2 as Rock

                        if(car.hasCollision(rock)) {
                            rock.crashed(car.Speed)
                            car.crash()
                            this.gameOver()
                        }
                    }
                    
                }
            }
        }
    }

    private gameOver() : void{
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x : number){
        if(!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() {
        document.getElementById("score").innerHTML = "Score : "+this.score
    }
} 

// load
window.addEventListener("load", () => Game.Instance )