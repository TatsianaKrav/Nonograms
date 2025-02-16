import { Button } from "./button.js";

export class SaveBtn extends Button {
    constructor(timer, levelObj) {
        super('Save game', 'save-btn');

        this.timer = timer;
        this.levelObj = levelObj;
        this.setCallback('click', this.save.bind(this));
    }

    save() {
        this.timer.stop();

        const cells = document.querySelectorAll(
            "td:not(.left-cell):not(.top-cell):not(.empty):not(.score-cell)"
        );
        const savedGame = [];

        cells.forEach((item, index) => {
            if (item.classList.contains("filled")) {
                savedGame[index] = "1";
            } else if (item.classList.contains("not")) {
                savedGame[index] = "x";
            } else {
                savedGame[index] = "0";
            }
        });

        const time = document.getElementsByClassName("timer")[0].innerText;
        const gameName = document.getElementsByClassName("game-name")[0].innerText;
        const field = document.getElementsByClassName("field")[0];
        field.classList.add('saved');


        const toSave = {
            currentGameName: gameName,
            currentLevel: this.levelObj.getValue(),
            savedGame: savedGame,
            timerTime: time,
            timer: this.timer
        };

        localStorage.setItem("savedGame", JSON.stringify(toSave));
    }
}