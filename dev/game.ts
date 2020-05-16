class Game {

    // Fields
    private gameobjects : GameObject[] = []

    private score   : number    = 0
    private request : number    = 0
    private gameover: boolean   = false


    constructor() { 
        for(let i = 0 ; i < 6 ; i++) {
            this.addCarWithRock(i)
        }

        this.gameLoop()
    }

    private addCarWithRock(index : number) : void {
        this.gameobjects.push(new Car(index, this))
        this.gameobjects.push(new Rock(index))
    }

    private gameLoop() : void {
        for (const gameObject of this.gameobjects) {
            gameObject.move()
        }

        this.checkCollision()
        

        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() : void {
        for (const gameobject1 of this.gameobjects) {
            for (const gameobject2 of this.gameobjects) {
                if(gameobject1.hasCollision(gameobject2)) {
                    gameobject1.onCollision(gameobject2)
                }
            }
        }
    }

    public gameOver() : void {
        console.log("Game over")
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    public addScore(x : number) : void {
        if(!this.gameover) {
            this.score += Math.floor(x)
            this.draw()
        }
    }

    private draw() : void {
        document.getElementById("score").innerHTML = "Score : "+this.score
    }

    
} 

// load
window.addEventListener("load", () => new Game() )