/// <reference path="gameObject.ts"/>

class Wheel extends GameObject{
    
    constructor(parent: HTMLElement, offsetCarX : number) {
        super(parent)
        
        this.style.transform = `translate(${offsetCarX}px, 30px)`
    }
    move(): void {}
    onCollision(gameObject: GameObject): void {}
}

window.customElements.define("wheel-component", Wheel as any)