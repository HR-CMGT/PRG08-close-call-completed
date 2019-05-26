/// <reference path="gameObject.ts"/>

class Wheel extends GameObject{
                        
    constructor(parent: HTMLElement, offsetCarX : number) {
        super(parent)
        
        this.style.transform = `translate(${offsetCarX}px, 30px)`
    }
}

window.customElements.define("wheel-component", Wheel)