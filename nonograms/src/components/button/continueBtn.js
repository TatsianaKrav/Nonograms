import { PopupInfo } from "../popup/popupInfo.js";
import { Button } from "./button.js";


export class ContinueBtn extends Button {
    constructor(timer, field, levelSelect, container) {
        super('Continue last game', 'continue-btn');

        this.timer = timer;
        this.field = field;
        this.levelSelect = levelSelect;
        this.container = container;

        this.setCallback('click', this.continue.bind(this));
    }

    continue() {
        this.field.clear();
        this.field.setClasses('continue');

        const currentGame = JSON.parse(localStorage.getItem("savedGame"));

        if (!currentGame) {
            const popup = new PopupInfo();
            popup.open();
            return;
        }

        const currentGameName = currentGame.currentGameName;
        const currentLevelName = currentGame.currentLevel;
        const savedGame = currentGame.savedGame;
        const timerTime = currentGame.timerTime;
        const timer = currentGame.timer;

        this.levelSelect.restore(currentLevelName, currentGameName, this.container, true);
        Object.assign(this.timer, this.container.fieldWrapper.timer);
    

        const currentField = document.getElementsByClassName('field')[0];
        currentField.classList.add('continue');

        const cells = document.querySelectorAll(
            "td:not(.left-cell):not(.top-cell):not(.empty):not(.score-cell)"
        );

        savedGame.forEach((item, index) => {
            if (item === "1") {
                cells[index].classList.add("filled");
            } else if (item === "x") {
                cells[index].classList.add("not");
            }
        });
    }
}