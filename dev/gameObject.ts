abstract class GameObject extends HTMLElement{
    
    // Fields
    private x       : number    = 0
    private y       : number    = 0
    private speed   : number    = Math.random() * 2 + 1

    // Properties
    public get Speed()  : number    { return this.speed }
    public set Speed(v : number)    { this.speed = v;  }
    

	public get X()      : number    { return this.x    }
	public set X(value  : number)   { this.x = value   }

	public get Y()      : number    { return this.y    }
	public set Y(value  : number)   { this.y = value   }


    public get width()  : number    { return this.clientWidth }
    public get height() : number    { return this.clientHeight }

    constructor() {
        super()
    }

    public move() : void {
        this.draw()
    }

    public hasCollision(gameobject : GameObject) : boolean {
        return (gameobject.X < this.X + this.width &&
                gameobject.X + gameobject.width > this.X &&
                gameobject.Y < this.Y + this.height &&
                gameobject.Y + gameobject.height > this.Y)
    }

    private draw() : void {
        this.style.transform =`translate(${this.X}px,${this.Y}px)`
    }

    abstract onCollision(gameobject2: GameObject) : void
}