import { ElementCreator } from "../../utils/elementCreator.js";

export class Button extends ElementCreator {
    constructor(content, className) {
        super('button', 'btn');
        this.setInnerText(content);
        this.setClasses(className);

        this.setCallback('click', this.closeBurger.bind(this));
    }

    closeBurger() {
        const menu = document.getElementsByClassName('menu')[0];

        if (menu.classList.contains('open')) {
            menu.classList.remove('open')
        }
    }
}