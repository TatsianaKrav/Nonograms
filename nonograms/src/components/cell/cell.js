import { ElementCreator } from "../../utils/elementCreator.js";
import { checkGameEnd, handleGameEnd } from "../../utils/checkGameEnd.js";
import { Audio } from "../audio/audio.js";

export class Cell extends ElementCreator {
    timerOn = false;
    interval;


    constructor(timer, scoreTable, field, container, sound) {
        super('td');
        this.timer = timer;
        this.scoreTable = scoreTable;
        this.field = field;
        this.container = container;
        this.sound = sound;

        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) this.setClasses('dark');

        this.setCallback('click', this.fill.bind(this));
        this.setCallback('contextmenu', (e) => this.cross(e));
    }

    fill() {
        const result = checkGameEnd();
        if (result) return;

        const soundOff = this.sound.getValue();

        if (this.checkCLasses("top-cell", "left-cell", "empty")) return;
        if (this.field.checkCLasses('done') || this.field.checkCLasses('saved')) return;

        const sound = new Audio();

        this.timerOn = this.timer.getElement().classList.contains('on');

        if (!this.timerOn) {
            this.interval = this.timer.init(0, 0);
            this.timerOn = true;
            this.timer.getElement().classList.add('on');
        }

        if (this.checkCLasses('not')) {
            this.getElement().classList.toggle('not');
        }

        if (!soundOff) {
            this.checkCLasses('filled') ? sound.remove() : sound.fill();
        }
        this.getElement().classList.toggle('filled');
        handleGameEnd(this.timer, this.scoreTable, this.container, this.sound);
    }

    cross(event) {
        event.preventDefault();
        const result = checkGameEnd();
        if (result) return;

        if (this.checkCLasses("top-cell", "left-cell", "empty", "filled")) return;
        if (this.field.checkCLasses('done') || this.field.checkCLasses('saved')) return;

        const soundOff = this.sound.getValue();
        this.timerOn = this.timer.getElement().classList.contains('on');

        if (!this.timerOn) {
            this.interval = this.timer.init(0, 0);
            this.timerOn = true;
            this.timer.getElement().classList.add('on');
        }

        const sound = new Audio();

        if (!soundOff) {
            this.checkCLasses('not') ? sound.remove() : sound.cross();
        }
        this.getElement().classList.toggle('not');
        handleGameEnd(this.timer, this.scoreTable, this.container, this.sound);
    }
}

