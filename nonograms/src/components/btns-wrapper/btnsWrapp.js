import { ElementCreator } from "../../utils/elementCreator.js";
import { ContinueBtn } from "../button/continueBtn.js";
import { RandomGameBtn } from "../button/randomBtn.js";
import { ResetBtn } from "../button/resetBtn.js";
import { SaveBtn } from "../button/saveBtn.js";
import { SolutionBtn } from "../button/solutionBtn.js";


export class ButtonsWrapper extends ElementCreator {
    level;
    games;

    constructor(levelObj, container) {
        super('div', 'btns-wrapper');
        this.levelObj = levelObj;
        this.container = container;
    }

    create(timer, field, currentGame) {
        const saveBtn = new SaveBtn(timer, this.levelObj);
        const continueBtn = new ContinueBtn(timer, field, this.levelObj, this.container);
        const solutionBtn = new SolutionBtn(currentGame, timer, this.container);
        const randomBtn = new RandomGameBtn(this.container);
        const resetBtn = new ResetBtn(timer, this.container, currentGame);
        this.append(saveBtn, continueBtn, solutionBtn, randomBtn, resetBtn);

        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            Array.from(this.getChildren()).forEach(btn => btn.classList.add('dark'));
        }
    }
}