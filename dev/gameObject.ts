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
        
    public move() {
        this.draw()
    }

    protected draw() {
        this.style.transform =`translate(${this.X}px,${this.Y}px)`
    }
    
    // Hier zie je de abstracte functie onCollision
    // We dwingen af dat de child deze functie moet hebben EN
    // invulling moet geven aan de functie
    // Bij een normale class kan je hier een lege functie (onCollision) aanmaken
    // Maar de kans bestaat dat de child geen invulling geeft en dan 
    // gebeurt er niks. Ook helpt je IDE niet met het aanmaken van de method

    /**
     * Will be executed when collision has occured with a specific object
     * @param gameObject the colliding object
     */
    abstract onCollision(gameObject : GameObject) : void
}