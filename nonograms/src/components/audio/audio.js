import { ElementCreator } from "../../utils/elementCreator.js";

export class Audio {
    container = document.getElementsByClassName('container')[0];

    fill() {
        const fillSound = new ElementCreator('audio');
        fillSound.setAttributes({ 'src': '.../../assets/sounds/fill.mp3' });
        fillSound.getElement().play();
        fillSound.appendTo(this.container);
    }

    remove() {
        const removeSound = new ElementCreator('audio');
        removeSound.setAttributes({ 'src': '.../../assets/sounds/delete.mp3' });
        removeSound.getElement().play();
        removeSound.appendTo(this.container);
    }

    cross() {
        const crossSound = new ElementCreator('audio');
        crossSound.setAttributes({ 'src': '.../../assets/sounds/cross.mp3' });
        crossSound.getElement().play();
        crossSound.appendTo(this.container);
    }

    win() {
        const winSound = new ElementCreator('audio');
        winSound.setAttributes({ 'src': '.../../assets/sounds/win.mp3' });
        winSound.getElement().play();
        winSound.appendTo(this.container);
    }
}