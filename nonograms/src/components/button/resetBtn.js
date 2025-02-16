import { Button } from "./button.js";

export class ResetBtn extends Button {
    constructor(timer, container, currentGame) {
        super('Reset game', 'reset-btn');
        this.timer = timer;
        this.container = container;
        this.currentGame = currentGame;

        this.setCallback('click', this.reset.bind(this));
    }

    reset() {
        const levelVal = document.querySelector('select').value;
        const gameVal = document.querySelectorAll('select')[1].value;
        this.container.recreate(levelVal, gameVal, '', false)
    }
}