import { ElementCreator } from "../../utils/elementCreator.js";

export class Clue extends ElementCreator {
    constructor(className) {
        super('div');
        this.setClasses(className);

        this.setCallback('click', () => this.getElement().classList.toggle('cross'));
    }
} 