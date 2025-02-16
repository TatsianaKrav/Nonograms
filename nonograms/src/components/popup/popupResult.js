import { findNextGame } from "../../utils/findGame.js";
import { Popup } from "./popup.js";

export class PopupResult extends Popup {
    constructor(time, container, gameName) {
        super();

        this.time = time;
        this.container = container;
        this.gameName = gameName;

        this.modalInfo.setInnerText(`Great! You have solved the nonogram in ${this.time} seconds!`);
    }

    close() {
        super.close();
        const nextGame = findNextGame(this.gameName);
        this.container.container.recreate(nextGame.level, nextGame.name);
    }
}