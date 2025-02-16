import { ElementCreator } from "../../utils/elementCreator.js";

export class Sound extends ElementCreator {
    constructor() {
        super('div', 'sound');

        this.setCallback('click', this.handle.bind(this));
    }

    handle() {
        this.element.classList.toggle('off');
    }

    getValue() {
        return this.checkCLasses('off');
    }

}