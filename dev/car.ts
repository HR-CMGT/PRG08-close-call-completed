/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts"/>

class Car extends GameObject {
    // Fields
    private speed   : number    = Math.random() * 2 + 1
    private braking : boolean
    private stopped : boolean = false

    // Properties
    public get Speed() : number { return this.speed }

    constructor(yIndex : number) {
        super()

        this.X = 0
        this.Y = (70 * yIndex) + 80
        
        let frontWheel  = new Wheel(this, 105)
        let rearWheel   = new Wheel(this, 20)

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e : KeyboardEvent) => this.handleKeyDown(e))
        this.addEventListener("click", (e : MouseEvent) => this.handleMouseClick(e))
    }

    private handleMouseClick(e:MouseEvent) {
        this.braking = true
        this.changeColor(80) //green
    }

    private handleKeyDown(e : KeyboardEvent) {
        if(e.key == ' ') {
            // Brake
            this.braking = true
        }
    }

    public move() : void {
        // de snelheid bij de x waarde optellen
        this.X += this.speed

        // hier de snelheid verlagen als we aan het afremmen zijn
        if (this.braking)       this.speed *= 0.98
        if (this.speed < 0.5)   this.speed = 0
        
        if(this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80) //green
            Game.Instance.addScore(this.X)
            this.braking = false
            this.stopped = true
        }
        this.draw()
    } 

    public crash() {
        this.speed = 0
        this.braking = false
        this.changeColor(300) //red
    }

    public changeColor(deg : number) : void {
        this.style.filter = `hue-rotate(${deg}deg)`
    }

    private draw() : void {
        this.style.transform =`translate(${this.X}px,${this.Y}px)`
    }
}

window.customElements.define("car-component", Car)