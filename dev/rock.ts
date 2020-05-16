/// <reference path="gameobject.ts" />

class Rock extends GameObject{
    
    // Fields 
    private g               : number = 0 // gravity
    private rotation        : number = 0
    private rotationSpeed   : number = 0

    constructor(index) {
        super()
        this.X = Math.random() * 400 + 400
        this.Y = (70 * index) + 80
        this.Speed = 0

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    public move() : void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.X += this.Speed
        this.Y += this.g
        this.Speed *= 0.98
        this.rotation += this.rotationSpeed

        if (this.Y + this.clientHeight > document.getElementById("container").clientHeight){
            this.Speed = 0
            this.g = 0
            this.rotationSpeed = 0
        }

        super.move()
    }

    public crashed(carSpeed : number) : void {
        this.g = 9.81
        this.Speed = carSpeed
        this.rotationSpeed = 5
    }

    onCollision(gameobject2: GameObject): void {
        if(gameobject2 instanceof Car) {
            this.crashed(gameobject2.Speed)
        }
    }
}

window.customElements.define("rock-component", Rock as any)