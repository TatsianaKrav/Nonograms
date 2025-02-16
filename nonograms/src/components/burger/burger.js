import { ElementCreator } from "../../utils/elementCreator.js";

export class Burger extends ElementCreator {
    constructor(menu) {
        super('div', 'burger');
        this.menu = menu;

        this.setCallback('click', this.handle.bind(this));
    }

    handle() {
        this.menu.element.classList.toggle('open');
    }
}