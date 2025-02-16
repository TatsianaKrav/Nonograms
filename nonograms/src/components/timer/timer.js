import { ElementCreator } from "../../utils/elementCreator.js";

export class Timer extends ElementCreator {
    id;
    sec;
    min;

    constructor(restored) {
        super('div', 'timer', "00:00");
        this.restored = restored;

        if (this.restored) {
            this.restore();
        }
    }

    restore() {
        const savedGame = JSON.parse(localStorage.getItem('savedGame'));

        this.min = Number(savedGame.timer.min);
        this.sec = Number(savedGame.timer.sec);
        this.id = savedGame.timer.id

        this.setTime(savedGame.timerTime);
        this.setClasses('on');

        this.id = setInterval(this.tick.bind(this), 1000);
    }

    init(min, sec) {
        this.min = Number(min);
        this.sec = Number(sec);

        this.id = setInterval(this.tick.bind(this), 1000);
    }

    stop() {
        clearInterval(this.id);
    }

    tick() {
        this.sec++;

        if (this.sec >= 60) {
            this.min++;
            this.sec = 0;
        }

        if (this.sec < 10) {
            if (this.min < 10) {
                this.setInnerText(`0${this.min}:0${this.sec}`);
            } else {
                this.innerText(`${this.min}:0${this.sec}`);
            }
        } else {
            if (this.min < 10) {
                this.setInnerText(`0${this.min}:${this.sec}`);
            } else {
                this.setInnerText(`${this.min}:${this.sec}`);
            }
        }
    }

    getTime() {
        return this.getInnerText();
    }

    setTime(time) {
        this.setInnerText(time);
        this.min = time.slice(0, 2);
        this.sec = time.slice(3);

        if (this.min[0] === "0") {
            this.min = this.min.slice(1);
        }

        if (this.sec[0] === "0") {
            this.sec = this.sec.slice(1);
        }
    }
}