abstract class GameObject extends HTMLElement{

    // Fields
    private x : number = 0
    private y : number = 0

    // Properties
	public get X(): number              { return this.x    }
	public set X(value: number)         { this.x = value   }

	public get Y(): number              { return this.y    }
	public set Y(value: number)         { this.y = value   }


    public get width() : number         { return this.clientWidth }
    public get height() : number        { return this.clientHeight }

    /**
     * @param parent of this HTMLElement [Optional]
     */
    constructor(parent: HTMLElement = document.getElementById("container")) {
        super()
        parent.appendChild(this)
    }
    
    
    public hasCollision(rect : GameObject) : boolean {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y)
        }
        
    abstract move() : void
    abstract onCollision(gameObject : GameObject) : void
}